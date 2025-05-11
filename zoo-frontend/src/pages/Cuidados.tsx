import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CardCuidado from "../components/CardCuidado";

interface Cuidado {
  id: number;
  nome: string;
  descricao: string;
  frequencia: string;
}

function Cuidados() {
  const [cuidados, setCuidados] = useState<Cuidado[]>([]);

  useEffect(() => {
    carregarCuidados();
  }, []);

  const carregarCuidados = () => {
    api.get("/cuidado")
      .then(res => {
        const data = res.data?.$values || res.data;
        setCuidados(data);
      })
      .catch(err => console.error("Erro ao carregar cuidados:", err));
  };

  const handleDelete = (id: number) => {
    setCuidados(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Cuidados Cadastrados</h2>

        {cuidados.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum cuidado registrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuidados.map(cuidado => (
              <CardCuidado key={cuidado.id} cuidado={cuidado} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Cuidados;