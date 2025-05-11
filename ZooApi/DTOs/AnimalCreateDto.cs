using System.ComponentModel.DataAnnotations;

namespace ZooApi.DTOs
{
    public class AnimalCreateDto
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        [MinLength(3, ErrorMessage = "O nome deve ter no mínimo 3 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição é obrigatória")]
        [MinLength(10, ErrorMessage = "A descrição deve ter no mínimo 10 caracteres")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data de nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "A espécie é obrigatória")]
        public string Especie { get; set; } = string.Empty;

        [Required(ErrorMessage = "O habitat é obrigatório")]
        public string Habitat { get; set; } = string.Empty;

        [Required(ErrorMessage = "O país de origem é obrigatório")]
        public string PaisOrigem { get; set; } = string.Empty;

        public List<int> CuidadosSelecionados { get; set; } = new();
    }
}