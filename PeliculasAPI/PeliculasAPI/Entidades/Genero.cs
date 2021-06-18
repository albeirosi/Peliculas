using PeliculasAPI.Validaciones;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Genero
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "El campo {0} debe contener un máximo de {1} caracteres")]
        [PrimeraLetraMayuscula]
        public string Nombre { get; set; }

        public List<PeliculasGeneros> PeliculasGeneros { get; set; }
    }
}
