using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;
using PeliculasAPI.Validaciones;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{

    [Route("api/actores")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy="EsAdmin")]

    public class ActoresController : ControllerBase
    {
        private readonly AplicationsDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAlmacenadorArchivos _almacenadorArchivos;
        private readonly string contenedor = "actores";

        public ActoresController(AplicationsDbContext dbContext, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
        {
            _context = dbContext;
            _mapper = mapper;
            _almacenadorArchivos = almacenadorArchivos;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = _context.Actores.AsQueryable();
            await HttpContext.InsertarParametrosPagCabecera(queryable);
            var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            var actorDTO = _mapper.Map<List<ActorDTO>>(actores);
            return actorDTO;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>>GetId(int id)            
        {
            var actor = await _context.Actores.FirstOrDefaultAsync(x => x.Id == id);
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

            _context.Add(actor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult>Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = await _context.Actores.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            actor = _mapper.Map(actorCreacionDTO, actor);

            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await _almacenadorArchivos.EditarArchivo(contenedor, actorCreacionDTO.Foto, actor.Foto);
            }

            await _context.SaveChangesAsync();

            return NoContent();

        }



        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await _context.Actores.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }

            _context.Remove(actor);
            await _context.SaveChangesAsync();
            await _almacenadorArchivos.BorrarArchivo(actor.Foto, contenedor);
            return NoContent();

        }

        [HttpGet("buscarPorNombre/{nombre}")]
        public async Task<ActionResult<List<PeliculaActorDTO>>> GetBuscarPorNombre(string nombre="")
        {
            if (string.IsNullOrWhiteSpace(nombre)){ return new List<PeliculaActorDTO>(); }

            return await _context.Actores
                .Where(x => x.Nombre.ToLower().Contains(nombre.ToLower()))
                .OrderBy(x => x.Nombre)
                .Select(x => new PeliculaActorDTO { Id = x.Id, Nombre = x.Nombre, Foto = x.Foto })
                .Take(5)
                .ToListAsync();


        }
    }
}
