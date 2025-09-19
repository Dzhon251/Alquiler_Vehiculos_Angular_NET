using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Alquileres
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo es requerido")]
        [Display(Name = "Fecha de Alquiler")]
        public DateTime FechaAlquiler { get; set; }
        [Display(Name = "Codigo de Alquiler")]
        public string Codigo_Alquiler { get; set; }
        
        [Display(Name = "ClienteId")]
        [ForeignKey("ClientesModel")]
        public int ClienteModelId { get; set; }
        public Clientes ClientesModel { get; set; }
        [Display(Name = "VehiculoId")]
        [ForeignKey("VehiculoModel")]
        public int VehiculoModelId { get; set; }
        public Vehiculos VehiculoModel { get; set; }
    }
}
