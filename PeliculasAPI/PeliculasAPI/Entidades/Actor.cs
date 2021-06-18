using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Actor
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(200, ErrorMessage = "El campo {0} no puede superar los {1} caracteres")]
        public string Nombre { get; set; }

        public DateTime FechaNacimiento { get; set; }
        public string Foto { get; set; }
        public List<PeliculasActores> PeliculasActores { get; set; }
    }
}
