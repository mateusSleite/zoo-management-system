import { Link } from "react-router-dom";
import api from "../services/api";

interface Cuidado {
  id: number;
  nome: string;
  descricao: string;
  frequencia: string;
}

interface Props {
  cuidado: Cuidado;
  onDelete: (id: number) => void;
}

function CardCuidado({ cuidado, onDelete }: Props) {
  const handleDelete = async () => {
    if (!cuidado.id) {
      alert("ID inválido.");
      return;
    }

    if (confirm(`Deseja realmente excluir o cuidado "${cuidado.nome}"?`)) {
      try {
        await api.delete(`/cuidado/${cuidado.id}`);
        onDelete(cuidado.id);
      } catch (error) {
        console.error("Erro ao excluir cuidado:", error);
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-purple-500 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-purple-800">{cuidado.nome}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Frequência: <strong>{cuidado.frequencia}</strong>
      </p>
      <p className="text-sm text-gray-500 mt-2">{cuidado.descricao}</p>

      <div className="flex justify-end gap-2 mt-4">
        <Link to={`/cuidado/editar/${cuidado.id}`}>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded">
            Editar
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardCuidado;