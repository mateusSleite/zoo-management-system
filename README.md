
# 🐾 ZooManager

Aplicação completa para gerenciamento de animais e seus cuidados em um zoológico, desenvolvida com **React**, **.NET Core** e **SQL Server**. O projeto contempla funcionalidades completas de CRUD, relações muitos-para-muitos e interface moderna e responsiva com **TailwindCSS**.

---

## 🚀 Como rodar o projeto

### 🔧 Backend (.NET Core)

1. Navegue até a pasta do backend:
   ```bash
   cd ZooApi
   ```

2. Configure a `connectionString` do banco SQL Server em `appsettings.json`.

3. Rode as migrations (se necessário):
   ```bash
   dotnet ef database update
   ```

4. Inicie a API:
   ```bash
   dotnet run
   ```

A API estará disponível em: `http://localhost:5062/api`

### 💻 Frontend (React + Vite)

1. Navegue até a pasta do frontend:
   ```bash
   cd zoo-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

O frontend estará disponível em: `http://localhost:5173`

---

## 🧩 Funcionalidades Implementadas

- ✅ Frontend com **React + TypeScript + TailwindCSS**
- ✅ Backend com **.NET Core 7 + EF Core + SQL Server**
- ✅ Cadastro de Animais:
  - Nome
  - Descrição
  - Data de nascimento
  - Espécie
  - Habitat
  - País de origem
- ✅ Cadastro de Cuidados:
  - Nome
  - Descrição
  - Frequência (diária, semanal, mensal etc.)
- ✅ Relação muitos-para-muitos entre Animais e Cuidados
- ✅ CRUD completo (GET, POST, PUT, DELETE)
- ✅ Validações com `DataAnnotations` no backend e checagens no frontend
- ✅ Estilização com **TailwindCSS** e responsividade
- ✅ Componentização da interface (Navbar, Cards, etc.)

---

## 🌟 Funcionalidades Extras (Diferenciais)

- ✅ Banco de Dados SQL Server com relacionamento entre tabelas
- ❌ Em progresso: Sistema de autenticação (login e logout)
- ❌ Não implementado: Dashboard com gráficos (ex: animais por habitat)
- ❌ Não implementado: Filtros avançados na listagem de animais
- ❌ Não implementado: Alertas automáticos para cuidados pendentes
- ❌ Não implementado: Testes unitários na API ou frontend

---

## 📂 Organização

- `/ZooApi`: Backend .NET
- `/zoo-frontend`: Frontend React com Tailwind
- Componentes reutilizáveis no frontend: `Navbar`, `CardAnimal`, `CardCuidado`
