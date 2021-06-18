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
        private readonly AplicationsDbContext _context;
        private readonly IMapper _mapper;

        public GenerosController(AplicationsDbContext dbContext, IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        // [ServiceFilter(typeof(MyActionFilters))]
        public async Task<ActionResult<List<GeneroDTO>>> GetGenerosAll([FromQuery] PaginacionDTO paginacionDTO)
        {
            var query=  _context.Generos.AsQueryable();

            await HttpContext.InsertarParametrosPagCabecera(query);
            var genero =await query.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            var generoDTO = _mapper.Map<List<GeneroDTO>>(genero);
            return generoDTO;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<GeneroDTO>>> Todos()
        {
            var generos = await _context.Generos.OrderBy(x=>x.Nombre).ToListAsync();

            return _mapper.Map<List<GeneroDTO>>(generos);
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<GeneroDTO>> GetGeneroId(int id)
        {                 
            var genero = await _context.Generos.FirstOrDefaultAsync(x => x.Id==id);

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

            _context.Add(genero);
            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GeneroDTO>> PutGenero(int id, [FromBody] GeneroCreacionDTO generoCreacionDto)
        {

            var genero = await _context.Generos.FirstOrDefaultAsync(x => x.Id == id);
            if(genero == null) { return NotFound(); }

                genero = _mapper.Map(generoCreacionDto, genero);
           // _context.Entry(genero).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Genero>>DeleteGenero(int id)
        {

            var existe = await _context.Generos.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();
            }

            _context.Generos.Remove(new Genero() { Id = id });
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
