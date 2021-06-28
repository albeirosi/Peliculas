﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/rating")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AplicationsDbContext _context;

        public RatingsController(UserManager<IdentityUser> userManager, AplicationsDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var usuario = await _userManager.FindByEmailAsync(email);
            var usuarioId = usuario.Id;

            var ratingActual = await _context.Ratings
                .FirstOrDefaultAsync(x => x.PeliculaId == ratingDTO.PeliculaId && x.UsuarioId == usuarioId);

            if(ratingActual == null)
            {
                var rating = new Rating();
                rating.PeliculaId = ratingDTO.PeliculaId;
                rating.Puntuacion = ratingDTO.Puntuacion;
                rating.UsuarioId = usuarioId;
                _context.Add(rating);             
            }
            else
            {
                ratingActual.Puntuacion = ratingDTO.Puntuacion;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
