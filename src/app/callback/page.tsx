"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Captura o código da URL
    const authCode = searchParams.get("code");
    setCode(authCode);

    if (authCode) {
      console.log("Código de autorização recebido:", authCode);
      // Aqui você pode fazer uma chamada para enviar o código ao seu backend
      // Exemplo: handleAuthCode(authCode);
    } else {
      console.error("Código de autorização não encontrado na URL");
    }

    setLoading(false);
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ml-yellow p-4">
      <div className="w-full max-w-md rounded-lg bg-ml-gray p-8 shadow-lg">
        <div className="mb-8 flex justify-center">
          <img
            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.22.8/mercadolibre/logo__large_plus.png"
            alt="Mercado Livre"
            className="h-12"
          />
        </div>

        {loading ? (
          <div className="text-center">
            <p className="mb-4 text-ml-black">Processando autorização...</p>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ml-blue border-r-transparent"></div>
          </div>
        ) : code ? (
          <div className="text-center">
            <h1 className="mb-6 text-2xl font-bold text-ml-black">
              Autorização Concluída
            </h1>
            <p className="mb-4 text-ml-black">
              Autorização realizada com sucesso. Você pode fechar esta janela.
            </p>
            <p className="text-sm text-gray-500">Código: {code}</p>
          </div>
        ) : (
          <div className="text-center text-ml-red">
            <h1 className="mb-6 text-2xl font-bold">Erro na Autorização</h1>
            <p>Não foi possível obter o código de autorização.</p>
          </div>
        )}
      </div>
    </main>
  );
}
