using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PubJazz.Models
{
    public class Premium
    {
        [Key]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Informe o título do whiskey")]
        [StringLength(80, ErrorMessage = "O título deve conter até 80 caracteres")]
        [MinLength(5, ErrorMessage = "O título deve conter pelo menos 5 caracteres")]
        [DisplayName("Título")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Informe o tipo do whiskey (ex: Bourbon, Scotch)")]
        [DisplayName("Tipo")]
        public string Type { get; set; } = string.Empty;

        [Required(ErrorMessage = "Informe a origem do whiskey")]
        [DisplayName("Origem")]
        public string Origin { get; set; } = string.Empty;

        [Range(0, 100, ErrorMessage = "A idade deve ser entre 0 e 100 anos")]
        [DisplayName("Idade (Anos)")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Informe o preço")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        [DisplayName("Preço")]
        public decimal Price { get; set; }

        [DisplayName("Descrição")]
        public string Description { get; set; } = string.Empty;

        // deleted: StartDate, EndDate, ClientId e a navegação virtual Client
    }
}