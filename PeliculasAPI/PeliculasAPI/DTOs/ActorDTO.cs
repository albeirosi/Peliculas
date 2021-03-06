using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.DTOs
{
    public class ActorDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(200, ErrorMessage = "El campo {0} no puede superar los {1} caracteres")]
        public string Nombre { get; set; }

        public DateTime FechaNacimiento { get; set; }
        public string Foto { get; set; }
    }
}
