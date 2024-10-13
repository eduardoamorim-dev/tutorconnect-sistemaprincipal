export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg w-96 mb-3">
        <div flex-col items-center mb-6 text-center>
          <h1>Tutor Connect</h1>
        </div>
        <header className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Entre em sua conta
          </h1>
          <p className="text-gray-700">Novo por aqui? Crie uma conta</p>
        </header>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-sky-400"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-sky-400"
            required
          />

          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
