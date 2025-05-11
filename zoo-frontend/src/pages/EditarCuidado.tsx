import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EditarCuidado() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    frequencia: "",
  });

  useEffect(() => {
    api.get(`/cuidado/${id}`)
      .then(res => {
        const c = res.data;
        setForm({
          nome: c.nome,
          descricao: c.descricao,
          frequencia: c.frequencia,
        });
      })
      .catch(err => {
        console.error("Erro ao carregar cuidado:", err);
        alert("Não foi possível carregar os dados do cuidado.");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: Number(id), // ✅ Inclui o ID no payload
        ...form
      };

      await api.put(`/cuidado/${id}`, payload);
      alert("Cuidado atualizado com sucesso!");
      navigate("/cuidados");
    } catch (error) {
      console.error("Erro ao atualizar cuidado:", error);
      alert("Erro ao atualizar.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navbar />
      <main className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Editar Cuidado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequência</label>
            <input
              name="frequencia"
              value={form.frequencia}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-md shadow transition"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditarCuidado;