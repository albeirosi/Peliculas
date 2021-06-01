using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;
using PeliculasAPI.Validaciones;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{

    [Route("api/actores")]
    [ApiController]
    public class ActoresController : ControllerBase
    {
        private readonly AplicationsDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAlmacenadorArchivos _almacenadorArchivos;
        private readonly string contenedor = "actores";

        public ActoresController(AplicationsDbContext dbContext, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _almacenadorArchivos = almacenadorArchivos;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = _dbContext.Actores.AsQueryable();
            await HttpContext.InsertarParametrosPagCabecera(queryable);
            var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            var actorDTO = _mapper.Map<List<ActorDTO>>(actores);
            return actorDTO;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>>GetId(int id)            
        {
            var actor = await _dbContext.Actores.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }

            return _mapper.Map<ActorDTO>(actor);
        }


        [HttpPost]
        public async Task<ActionResult> PostActor([FromForm] ActorCreacionDTO actorcreacionDTO)
        {
            var actor = _mapper.Map<Actor>(actorcreacionDTO);
            if (actorcreacionDTO.Foto != null)
            {
                actor.Foto = await _almacenadorArchivos.GuardarArchivo(contenedor, actorcreacionDTO.Foto);
            }

            _dbContext.Add(actor);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult>Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = await _dbContext.Actores.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            actor = _mapper.Map(actorCreacionDTO, actor);

            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await _almacenadorArchivos.EditarArchivo(contenedor, actorCreacionDTO.Foto, actor.Foto);
            }

            await _dbContext.SaveChangesAsync();

            return NoContent();

        }



        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await _dbContext.Actores.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }

            _dbContext.Remove(actor);
            await _dbContext.SaveChangesAsync();
            await _almacenadorArchivos.BorrarArchivo(actor.Foto, contenedor);
            return NoContent();

        }
    }
}
