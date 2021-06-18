using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.DTOs
{
    public class CineDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 100)]
        public string Nombre { get; set; }
        [Range(-90, 90)]
        public double Latitud { get; set; }

        [Range(-180, 180)]
        public double Longitud { get; set; }

    }
}
