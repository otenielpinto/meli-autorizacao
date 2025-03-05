"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePermitir = () => {
    router.push("/api/auth");
  };

  const handleCancelar = () => {
    window.location.href = "https://www.mercadolivre.com.br/";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-grow flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg border border-gray-200">
          <h1 className="mb-6 text-2xl font-bold text-ml-black text-center">
            Autorização de Conexão
          </h1>
          <p className="mb-8 text-ml-black text-center">
            Para gerenciar sua conta no Mercado Livre, precisamos da sua
            autorização para acessar sua conta.
            <br /> Você será redirecionado para a página oficial do Mercado
            Livre para concluir o processo de forma segura.
          </p>
          <div className="flex justify-around">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={handlePermitir}
            >
              Permitir
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
