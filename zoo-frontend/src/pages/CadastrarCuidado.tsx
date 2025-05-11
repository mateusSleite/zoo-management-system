import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CadastrarCuidado() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    frequencia: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    descricao: "",
    frequencia: "",
  });

  const validate = () => {
    const newErrors = { nome: "", descricao: "", frequencia: "" };
    let isValid = true;

    if (form.nome.trim().length < 3) {
      newErrors.nome = "O nome deve ter pelo menos 3 caracteres.";
      isValid = false;
    }

    if (form.descricao.trim().length < 10) {
      newErrors.descricao = "A descrição deve ter pelo menos 10 caracteres.";
      isValid = false;
    }

    if (form.frequencia.trim() === "") {
      newErrors.frequencia = "A frequência é obrigatória.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await api.post("/cuidado", form);
      alert("Cuidado cadastrado com sucesso!");
      navigate("/cuidados");
    } catch (error) {
      console.error("Erro ao cadastrar cuidado:", error);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navbar />

      <main className="flex justify-center items-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Cadastrar Novo Cuidado</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.nome ? "border-red-500 ring-red-300" : "focus:ring-purple-500"
                }`}
              />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows={3}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.descricao ? "border-red-500 ring-red-300" : "focus:ring-purple-500"
                }`}
              />
              {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
            </div>

            <div>
              <label htmlFor="frequencia" className="block text-sm font-medium text-gray-700">Frequência</label>
              <input
                name="frequencia"
                type="text"
                value={form.frequencia}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.frequencia ? "border-red-500 ring-red-300" : "focus:ring-purple-500"
                }`}
              />
              {errors.frequencia && <p className="text-red-500 text-sm mt-1">{errors.frequencia}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Salvar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CadastrarCuidado;