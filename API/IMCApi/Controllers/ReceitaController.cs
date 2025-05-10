using Microsoft.AspNetCore.Mvc;

namespace IMCApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceitaController : ControllerBase
    {
        private static List<Receita> receitas = new List<Receita>
        {
            new Receita { ReceitaId = 1, NomeReceita = "Salada de Frango", Tipo = "Fit", Ingredientes = "Frango e alface"},
            new Receita { ReceitaId = 2, NomeReceita = "Bolo de Chocolate", Tipo = "Normal", Ingredientes = "Farinha, ovo, leite, óleo, açúcar, fermento e chocolate"},
            new Receita { ReceitaId = 3, NomeReceita = "Smooth Verde", Tipo = "Fit", Ingredientes = "Couve e limão"},
            new Receita { ReceitaId = 4, NomeReceita = "Pizza de Calabresa", Tipo = "Normal", Ingredientes = "Massa, molho de tomate, mussarela, tomate, azeitona e calabresa"}
        };

        private readonly ILogger<ReceitaController> _logger;

        public ReceitaController(ILogger<ReceitaController> logger)
        {
            _logger = logger;
        }

        [HttpGet("por-imc/{imc}", Name = "GetReceita")]
        public IActionResult Get(double imc)
        {
            Random rand = new Random();

            if (imc < 25)
            {
                var receitasNormal = receitas.Where(r => r.Tipo == "Normal").ToList();
                Receita receitaAleatoria = receitasNormal[rand.Next(receitasNormal.Count)];

                return new JsonResult(receitaAleatoria);
            }
            else
            {
                var receitasFit = receitas.Where(r => r.Tipo == "Fit").ToList();
                Receita receitaAleatoria = receitasFit[rand.Next(receitasFit.Count)];

                return new JsonResult(receitaAleatoria);
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult GetPorId(int id)
        {
            var receita = receitas.FirstOrDefault(r => r.ReceitaId == id);

            if (receita == null)
            {
                return NotFound("Receita não encontrada");
            }

            return Ok(receita);
        }

        [HttpGet] // Busca dados
        public IActionResult ListarTodas()
        {
            return Ok(receitas);
        }

        [HttpPost] // Adiciona dados
        public IActionResult Post([FromBody] Receita novaReceita)
        {
            if (novaReceita == null || string.IsNullOrEmpty(novaReceita.NomeReceita))
            {
                return BadRequest("Dados inválidos");
            }

            int novoId = receitas.Max(r => r.ReceitaId) + 1;
            novaReceita.ReceitaId = novoId;
            receitas.Add(novaReceita);

            return Ok(novaReceita);

        }

        [HttpPut("{id:int}")] // Atualiza dados
        public IActionResult Put(int id, [FromBody] Receita receitaAtualizada)
        {
            if (receitaAtualizada == null)
            {
                return BadRequest("Dados inválidos");
            }

            var receitaExistente = receitas.FirstOrDefault(r => r.ReceitaId == id);

            if (receitaExistente == null)
            {
                return NotFound("Receita não encontrada.");
            }

            receitaExistente.NomeReceita = receitaAtualizada.NomeReceita;
            receitaExistente.Tipo = receitaAtualizada.Tipo;
            receitaExistente.Ingredientes = receitaAtualizada.Ingredientes;

            return Ok(receitaExistente);
        }

        [HttpDelete("{id:int}")] // Deleta dados
        public IActionResult Delete(int id)
        {
            var receita = receitas.FirstOrDefault(r => r.ReceitaId == id);

            if(receita == null)
            {
                return NotFound("Receita não encontrada");
            }

            receitas.Remove(receita);

            return NoContent();

        }
    }
}
