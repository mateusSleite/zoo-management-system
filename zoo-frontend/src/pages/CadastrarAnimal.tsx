import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Cuidado {
  id: number;
  nome: string;
}

function CadastrarAnimal() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
    especie: "",
    habitat: "",
    paisOrigem: "",
  });

  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [cuidadosSelecionados, setCuidadosSelecionados] = useState<number[]>([]);

  useEffect(() => {
    api.get("/cuidado")
      .then(res => {
        const data = res.data?.$values || res.data;
        setCuidados(data);
      })
      .catch(err => console.error("Erro ao carregar cuidados:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (id: number) => {
    setCuidadosSelecionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações adicionais
    if (form.nome.trim().length < 2 || form.especie.trim().length < 2) {
      alert("Nome e espécie devem ter pelo menos 2 caracteres.");
      return;
    }

    if (!form.dataNascimento) {
      alert("A data de nascimento é obrigatória.");
      return;
    }

    const payload = {
      ...form,
      cuidadosSelecionados
    };

    try {
      await api.post("/animal", payload);
      alert("Animal cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      alert("Erro ao cadastrar animal.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Navbar />
      <main className="py-10 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Cadastrar Novo Animal</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <textarea
              name="descricao"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <input
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <input
              name="especie"
              placeholder="Espécie"
              value={form.especie}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <input
              name="habitat"
              placeholder="Habitat"
              value={form.habitat}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <input
              name="paisOrigem"
              placeholder="País de Origem"
              value={form.paisOrigem}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Cuidados</h4>
              <div className="grid grid-cols-2 gap-2">
                {cuidados.map(c => (
                  <label key={c.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={c.id}
                      checked={cuidadosSelecionados.includes(c.id)}
                      onChange={() => handleCheckbox(c.id)}
                      className="accent-green-600"
                    />
                    <span className="text-gray-700">{c.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
            >
              Salvar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CadastrarAnimal;