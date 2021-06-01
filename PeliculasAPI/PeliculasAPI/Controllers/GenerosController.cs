using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Filtros;
using PeliculasAPI.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/generos")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GenerosController : ControllerBase
    {
        private readonly AplicationsDbContext _dbContext;
        private readonly IMapper _mapper;

        public GenerosController(AplicationsDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        // [ServiceFilter(typeof(MyActionFilters))]
        public async Task<ActionResult<List<GeneroDTO>>> GetGenerosAll([FromQuery] PaginacionDTO paginacionDTO)
        {
            var query=  _dbContext.Generos.AsQueryable();

            await HttpContext.InsertarParametrosPagCabecera(query);
            var genero =await query.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            var generoDTO = _mapper.Map<List<GeneroDTO>>(genero);
            return generoDTO;
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<GeneroDTO>> GetGeneroId(int id)
        {                 
            var genero = await _dbContext.Generos.FirstOrDefaultAsync(x => x.Id==id);

            if(genero == null) 
            {
              
                return NotFound();
            }

            return _mapper.Map<GeneroDTO>(genero);
        }

        [HttpPost]
        public async Task<ActionResult<GeneroCreacionDTO>> PostGenero([FromBody] GeneroCreacionDTO generoDto)
        {
            var genero = _mapper.Map<Genero>(generoDto);

            _dbContext.Add(genero);
            await _dbContext.SaveChangesAsync();

            return NoContent();

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GeneroDTO>> PutGenero(int id, [FromBody] GeneroCreacionDTO generoCreacionDto)
        {

            var genero = await _dbContext.Generos.FirstOrDefaultAsync(x => x.Id == id);
            if(genero == null) { return NotFound(); }

                genero = _mapper.Map(generoCreacionDto, genero);
           // _dbContext.Entry(genero).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Genero>>DeleteGenero(int id)
        {

            var existe = await _dbContext.Generos.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();
            }

            _dbContext.Generos.Remove(new Genero() { Id = id });
            await _dbContext.SaveChangesAsync();

            return NoContent();

        }
    }
}
