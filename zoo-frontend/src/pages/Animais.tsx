import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import CardAnimal from '../components/CardAnimal';

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

function Animais() {
  const [animais, setAnimais] = useState<Animal[]>([]);

  useEffect(() => {
    carregarAnimais();
  }, []);

  const carregarAnimais = () => {
    api.get('/animal')
      .then(response => {
        setAnimais(response.data.$values);
      })
      .catch(error => console.error('Erro ao buscar animais:', error));
  };

  const handleDeleteAnimal = (id: number) => {
    setAnimais(prev => prev.filter(animal => animal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">Animais Cadastrados</h2>

        {animais.length === 0 ? (
          <p className="text-gray-500">Nenhum animal cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {animais.map(animal => (
              <CardAnimal key={animal.id} animal={animal} onDelete={handleDeleteAnimal} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Animais;