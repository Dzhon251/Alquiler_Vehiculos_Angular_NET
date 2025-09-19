using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Vehiculos
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo es requerido")]
        public string Marca { get; set; }
        [Required(ErrorMessage = "El campo es requerido")]
        public string Modelo { get; set; }
        [Required(ErrorMessage = "El campo es requerido")]
        public string Anio { get; set; }
        [Required(ErrorMessage = "El campo es requerido")]
        public string Disponible { get; set; }
    }
}
