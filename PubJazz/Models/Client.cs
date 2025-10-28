using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PubJazz.Models
{
    public class Client
    {
        [Key]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Informe seu nome")]
        [StringLength(80, ErrorMessage = "O nome deve conter até 80 caracteres")]
        [MinLength(5, ErrorMessage = " O nome deve conter pelo menos 5 caracteres")]
        [DisplayName("Nome completo ")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Informe seu email")]
        [EmailAddress(ErrorMessage= " email inválido")]
        [DisplayName ("email")]
        public string Email { get; set; } = string.Empty;

        public List<Premium> Premiums { get; set; } = new();

    }
}
