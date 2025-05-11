import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

interface Cuidado {
  id: number;
  nome: string;
}

function EditarAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
    especie: "",
    habitat: "",
    paisOrigem: ""
  });

  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [cuidadosSelecionados, setCuidadosSelecionados] = useState<number[]>([]);

  useEffect(() => {
    api.get(`/animal/${id}`)
      .then(res => {
        const animal = res.data;
        setForm({
          nome: animal.nome,
          descricao: animal.descricao,
          dataNascimento: animal.dataNascimento.substring(0, 10),
          especie: animal.especie,
          habitat: animal.habitat,
          paisOrigem: animal.paisOrigem
        });

        const cuidadosVinculados = animal.animaisCuidados?.$values?.map((ac: any) => ac.cuidado.id) || [];
        setCuidadosSelecionados(cuidadosVinculados);
      })
      .catch(err => console.error("Erro ao carregar animal:", err));

    api.get("/cuidado")
      .then(res => {
        const lista = res.data?.$values ?? res.data;
        setCuidados(lista);
      })
      .catch(err => console.error("Erro ao carregar cuidados:", err));
  }, [id]);

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

    const payload = {
      id: Number(id),
      ...form,
      cuidadosSelecionados
    };

    try {
      await api.put(`/animal/${id}`, payload);
      alert("Animal atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      alert("Erro ao atualizar.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex justify-center items-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Editar Animal</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange} required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea name="descricao" value={form.descricao} onChange={handleChange} required rows={3}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Espécie</label>
                <input name="especie" value={form.especie} onChange={handleChange} required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Habitat</label>
                <input name="habitat" value={form.habitat} onChange={handleChange} required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">País de Origem</label>
                <input name="paisOrigem" value={form.paisOrigem} onChange={handleChange} required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Cuidados</h4>
              <div className="grid grid-cols-2 gap-2">
                {cuidados.map(c => (
                  <label key={c.id} className="flex items-center space-x-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      value={c.id}
                      checked={cuidadosSelecionados.includes(c.id)}
                      onChange={() => handleCheckbox(c.id)}
                      className="accent-blue-600"
                    />
                    <span>{c.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditarAnimal;