using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinesController : ControllerBase
    {
        private readonly AplicationsDbContext _Context;
        private readonly IMapper _mapper;

        public CinesController(AplicationsDbContext dbContext, IMapper mapper)
        {
            _Context = dbContext;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult>Post([FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = _mapper.Map<Cine>(cineCreacionDTO);
            _Context.Add(cine);
            await _Context.SaveChangesAsync();

            return NoContent();
        }
    }
}
