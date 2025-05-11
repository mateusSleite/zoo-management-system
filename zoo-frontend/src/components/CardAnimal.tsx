import { Link } from 'react-router-dom';
import api from '../services/api';

interface Cuidado {
  id: number;
  nome: string;
  descricao: string;
  frequencia: string;
}

interface Animal {
  id: number;
  nome: string;
  especie: string;
  habitat: string;
  paisOrigem: string;
  animaisCuidados: {
    cuidado: Cuidado;
  }[];
}

interface Props {
  animal: Animal;
  onDelete: (id: number) => void;
}

function CardAnimal({ animal, onDelete }: Props) {
  const handleDelete = async () => {
    if (confirm(`Deseja realmente excluir ${animal.nome}?`)) {
      try {
        await api.delete(`/animal/${animal.id}`);
        onDelete(animal.id);
      } catch (error) {
        console.error('Erro ao excluir animal:', error);
        alert('Erro ao excluir.');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition text-left">
      <div className="bg-blue-100 h-36 flex items-center justify-center">
        <span className="text-5xl">🐾</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{animal.nome}</h3>
        <p className="text-gray-600">{animal.especie} | {animal.habitat}</p>
        <p className="text-sm text-gray-400">Origem: {animal.paisOrigem}</p>

        {animal.animaisCuidados?.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-gray-700 mb-1">Cuidados:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {animal.animaisCuidados.map((ac, index) => (
                <li key={index}>{ac.cuidado.nome} ({ac.cuidado.frequencia})</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Link to={`/editar/${animal.id}`} className="flex-1">
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded">
              Editar
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAnimal;