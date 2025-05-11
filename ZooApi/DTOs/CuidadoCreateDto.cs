using System.ComponentModel.DataAnnotations;

namespace ZooApi.DTOs
{
    public class CuidadoCreateDto
    {
        [Required(ErrorMessage = "O nome do cuidado é obrigatório")]
        [MinLength(3, ErrorMessage = "O nome deve ter no mínimo 3 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição é obrigatória")]
        [MinLength(10, ErrorMessage = "A descrição deve ter no mínimo 10 caracteres")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "A frequência é obrigatória")]
        public string Frequencia { get; set; } = string.Empty;
    }
}
