using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PubJazz.Models
{
    public class Premium
    {
        [Key]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Informe o título do premium")]
        [StringLength(80, ErrorMessage = "O titulo conter até 80 caracteres")]
        [MinLength(5, ErrorMessage = " O título conter pelo menos 5 caracteres")]
        [DisplayName("Título")]
        public string Title { get; set; } = string.Empty;

       [DataType(DataType.DateTime)]
        // [GreaterThanToday]
        [DisplayName(" inicio")]
        public DateTime StartDate { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayName(" termino")]
        public DateTime EndDate { get; set; }

        [DisplayName("Client")]
        [Required(ErrorMessage = "Cliente inválido ")]
        public int ClientId { get; set; }

        public Client ? Client {  get; set; }

    }
}
