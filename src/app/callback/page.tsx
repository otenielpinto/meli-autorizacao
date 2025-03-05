"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

function CallbackContent() {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      // Captura o código da URL
      const authCode = searchParams.get("code");
      setCode(authCode);

      if (authCode) {
        await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: authCode }),
        });
      } else {
      }

      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg border border-gray-200">
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
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-ml-blue border-r-transparent"></div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
