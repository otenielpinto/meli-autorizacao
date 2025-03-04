"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePermitir = () => {
    router.push("/api/auth");
  };

  const handleCancelar = () => {
    // Você pode definir o comportamento desejado aqui
    // Por exemplo, redirecionar para uma página inicial ou exibir uma mensagem
    console.log("Operação cancelada");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ml-yellow p-4">
      <div className="w-full max-w-md rounded-lg bg-ml-gray p-8 shadow-lg">
        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo-mercado-livre.png"
            alt="Mercado Livre"
            className="h-12"
          />
        </div>
        <h1 className="mb-6 text-2xl font-bold text-ml-black text-center">
          Autorização de Conexão
        </h1>
        <p className="mb-8 text-ml-black text-center">
          Para gerenciar sua conta no Mercado Livre , precisamos da sua
          autorização para acessar sua conta do Mercado Livre.
          <br /> Você será redirecionado para a página oficial do Mercado Livre
          para concluir o processo de forma segura.
        </p>
        <div className="flex justify-around">
          <button
            className="bg-ml-blue text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            onClick={handlePermitir}
          >
            Permitir
          </button>
          <button
            className="bg-ml-red text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}
