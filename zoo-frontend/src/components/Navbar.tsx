import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
      isActive(path)
        ? "text-white bg-blue-700"
        : "text-gray-100 hover:text-white hover:bg-blue-600"
    }`;

  return (
    <nav className="bg-blue-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🐾</span>
          <span className="text-xl font-bold text-white tracking-tight">ZooManager</span>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <Link to="/" className={linkClass("/")} style={{marginRight: '10px'}}>
              Animais
            </Link>
            <Link to="/cuidados" className={linkClass("/cuidados")} style={{marginRight: '10px'}}>
              Cuidados
            </Link>
          </div>

          <div className="flex items-center gap-2 ml-6">
            <Link to="/cadastrar">
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md shadow transition duration-200">
                + Novo Animal
              </button>
            </Link>
            <Link to="/cuidado/cadastrar">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow transition duration-200">
                + Novo Cuidado
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;