using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;
using PeliculasAPI.Validaciones;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]

    public class PeliculasController : ControllerBase
    {
        private readonly AplicationsDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAlmacenadorArchivos _almacenadorArchivos;
        private readonly string contenedor = "peliculas";
        private readonly UserManager<IdentityUser> _userManager;

        public PeliculasController(AplicationsDbContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _almacenadorArchivos = almacenadorArchivos;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var hoy = DateTime.Today;

            var proximosEstrenos = await _context.Peliculas
                .Where(x => x.FechaLanzamiento > hoy)
                .OrderBy(x => x.FechaLanzamiento)
                .Take(top)
                .ToListAsync();

            var encines = await _context.Peliculas
                        .Where(x => x.EnCines)
                        .OrderBy(x => x.FechaLanzamiento)
                        .Take(top)
                        .ToListAsync();

            var resultado = new LandingPageDTO();

            resultado.ProximosEstrenos = _mapper.Map<List<PeliculaDTO>>(proximosEstrenos);
            resultado.EnCines = _mapper.Map<List<PeliculaDTO>>(encines);

            return resultado;



        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]      
        public async Task<ActionResult<PeliculaDTO>> GetId(int id)
        {
            var pelicula = await _context.Peliculas.Include(x => x.PeliculasGeneros).ThenInclude(x => x.Genero)
                                           .Include(x => x.PeliculasActores).ThenInclude(x => x.Actor)
                                           .Include(x => x.PeliculasCines).ThenInclude(x => x.Cine)
                                           .FirstOrDefaultAsync(x => x.Id == id);

            if (pelicula == null) { return NotFound(); }

            /*  ==========================================================================================*/
            var promedioVoto = 0.0;
            var usuarioVoto = 0;

            if (await _context.Ratings.AnyAsync(x => x.PeliculaId == id))
            {
                promedioVoto = await _context.Ratings.Where(x => x.PeliculaId == id)
                    .AverageAsync(x => x.Puntuacion);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                     var usuario = await _userManager.FindByEmailAsync(email);
                    var usuarioId = usuario.Id;
                    var ratingDB = await _context.Ratings
                        .FirstOrDefaultAsync(x => x.UsuarioId == usuarioId && x.PeliculaId == id);

                    if (ratingDB != null)
                    {
                        usuarioVoto = ratingDB.Puntuacion;
                    }
                }

            }
            /*  ==========================================================================================*/



            var dto = _mapper.Map<PeliculaDTO>(pelicula);
            /*  ==========================================================================================*/
            dto.VotoUsuario = usuarioVoto;
            dto.PromedioVoto = promedioVoto;
            /*  ==========================================================================================*/


            dto.Actores = dto.Actores.OrderBy(x => x.Orden).ToList();

            return dto;
        }

        [HttpGet("filtrar")]
        [AllowAnonymous]
        public async Task<ActionResult<List<PeliculaDTO>>> Filtrar([FromQuery] PeliculasFiltrarDTO peliculasFiltrarDTO)

        {
            var peliculasQueryable = _context.Peliculas.AsQueryable();

            if (!string.IsNullOrEmpty(peliculasFiltrarDTO.Titulo))
            {

                peliculasQueryable = peliculasQueryable.Where(x => x.Titulo.ToLower().Contains(peliculasFiltrarDTO.Titulo.ToLower()));
            }

            if (peliculasFiltrarDTO.EnCines)
            {
                peliculasQueryable = peliculasQueryable.Where(x => x.EnCines);
            }

            if (peliculasFiltrarDTO.ProximosEstrenos)
            {
                var hoy = DateTime.Today;
                peliculasQueryable = peliculasQueryable.Where(x => x.FechaLanzamiento > hoy);
            }

            if (peliculasFiltrarDTO.GeneroId != 0)
            {
                peliculasQueryable = peliculasQueryable.Where(x => x.PeliculasGeneros.Select(y => y.GeneroId).Contains(peliculasFiltrarDTO.GeneroId));
            }



            await HttpContext.InsertarParametrosPagCabecera(peliculasQueryable);

            var peliculas = await peliculasQueryable.Paginar(peliculasFiltrarDTO.PaginacionDTO).ToListAsync();

            return _mapper.Map<List<PeliculaDTO>>(peliculas);

        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = _mapper.Map<Pelicula>(peliculaCreacionDTO);

            if (peliculaCreacionDTO.Poster != null)
            {
                pelicula.Poster = await _almacenadorArchivos.GuardarArchivo(contenedor, peliculaCreacionDTO.Poster);
            }

            EscribirOrdenActiores(pelicula);
            _context.Add(pelicula);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<PeliculasPostGetDTO>> PostGet()
        {
            var cines = await _context.Cines.ToListAsync();
            var generos = await _context.Generos.ToListAsync();
            var cinesDTO = _mapper.Map<List<CineDTO>>(cines);
            var generosDTO = _mapper.Map<List<GeneroDTO>>(generos);

            return new PeliculasPostGetDTO() { Cines = cinesDTO, Generos = generosDTO };
        }

        [HttpGet("PutGet/{id}")]
        public async Task<ActionResult<PeliculasPutGetDTO>> PutGet(int id)
        {
            var peliculaActionResult = await GetId(id);

            if (peliculaActionResult.Result is NotFoundResult) { return NotFound(); }

            var pelicula = peliculaActionResult.Value;

            var generosSeleccionadosIds = pelicula.Generos.Select(x => x.Id).ToList();
            var generosNoSelecionados = await _context.Generos
                                        .Where(x => !generosSeleccionadosIds.Contains(x.Id))
                                        .ToListAsync();
            var cinesSeleccionadosIds = pelicula.Cines.Select(x => x.Id).ToList();
            var cinesNoSeleccionados = await _context.Cines
                                        .Where(x => !cinesSeleccionadosIds.Contains(x.Id))
                                        .ToListAsync();
            var generoNoSeleccionadosDTO = _mapper.Map<List<GeneroDTO>>(generosNoSelecionados);
            var CinesNoSeleciondadosDTO = _mapper.Map<List<CineDTO>>(cinesNoSeleccionados);

            var respuesta = new PeliculasPutGetDTO();

            respuesta.Pelicula = pelicula;
            respuesta.GenerosSeleccionados = pelicula.Generos;
            respuesta.GenerosNoSeleccionados = generoNoSeleccionadosDTO;
            respuesta.CinesSeleccionados = pelicula.Cines;
            respuesta.CinesNoSeleccionados = CinesNoSeleciondadosDTO;
            respuesta.Actores = pelicula.Actores;

            return respuesta;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = await _context.Peliculas
                                .Include(x => x.PeliculasGeneros)
                                .Include(x => x.PeliculasActores)
                                .Include(x => x.PeliculasCines)
                                .FirstOrDefaultAsync(x => x.Id == id);

            if (pelicula == null) { return NotFound(); }

            pelicula = _mapper.Map(peliculaCreacionDTO, pelicula);

            if (peliculaCreacionDTO.Poster != null)
            {
                pelicula.Poster = await _almacenadorArchivos.EditarArchivo(contenedor, peliculaCreacionDTO.Poster, pelicula.Poster);
            }
            EscribirOrdenActiores(pelicula);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private void EscribirOrdenActiores(Pelicula pelicula)
        {
            if (pelicula != null)
            {
                for (int i = 0; i < pelicula.PeliculasActores.Count; i++)
                {
                    pelicula.PeliculasActores[i].Orden = i;
                }
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var pelicula = await _context.Peliculas.FirstOrDefaultAsync(x => x.Id == id);

            if (pelicula == null) { return NotFound(); }

            _context.Remove(pelicula);
            await _context.SaveChangesAsync();
            await _almacenadorArchivos.BorrarArchivo(pelicula.Poster, contenedor);
            return NoContent();


        }

    }
}
