using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Cine
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 100)]
        public string Nombre { get; set; }
        public Point Ubicacion { get; set; }
    }
}
