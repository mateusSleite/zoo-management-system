import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Animais from './pages/Animais';
import CadastrarAnimal from './pages/CadastrarAnimal';
import Cuidados from './pages/Cuidados';
import CadastrarCuidado from './pages/CadastrarCuidado';
import EditarAnimal from './pages/EditarAnimal';
import EditarCuidado from './pages/EditarCuidado';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Animais />} />
        <Route path="/cadastrar" element={<CadastrarAnimal />} />
        <Route path="/editar/:id" element={<EditarAnimal />} />
        <Route path="/cuidados" element={<Cuidados />} />
        <Route path="/cuidado/cadastrar" element={<CadastrarCuidado />} />
        <Route path="/cuidado/editar/:id" element={<EditarCuidado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;