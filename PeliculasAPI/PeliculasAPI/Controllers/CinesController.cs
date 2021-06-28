using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/cines")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]

    public class CinesController : ControllerBase
    {
        private readonly AplicationsDbContext _context;
        private readonly IMapper _mapper;

        public CinesController(AplicationsDbContext dbContext, IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CineDTO>>> GetAll([FromQuery]PaginacionDTO paginacionDTO)
        {
            var queryable = _context.Cines.AsQueryable();
            await HttpContext.InsertarParametrosPagCabecera(queryable);
            var cines =await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return _mapper.Map<List<CineDTO>>(cines);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CineDTO>> GetCineId(int id)
        {
            var cine = await _context.Cines.FirstOrDefaultAsync(x => x.Id == id);

            if (cine == null)
            {

                return NotFound();
            }
            var res = _mapper.Map<CineDTO>(cine);
            return res;
        }

        [HttpPost]
        public async Task<ActionResult>Post([FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = _mapper.Map<Cine>(cineCreacionDTO);
            _context.Add(cine);
            await _context.SaveChangesAsync();

            return NoContent();
        }

      

        [HttpPut("{id}")]
        public async Task<ActionResult<CineDTO>> PutCine(int id, [FromBody] CineCreacionDTO cineCreacionDto)
        {
            var cine = await _context.Cines.FirstOrDefaultAsync(x => x.Id == id);
            if (cine == null) { return NotFound(); }

            cine = _mapper.Map(cineCreacionDto, cine);
            // _context.Entry(genero).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult>Delete(int id)
        {
            var cine =await _context.Cines.AnyAsync(x=> x.Id==id);
            if (!cine)
            {
                return NotFound();
            }

                 _context.Cines.Remove(new Cine() { Id = id });
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
