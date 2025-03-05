import { NextRequest } from "next/server";
import MercadoLivreService from "@/lib/mercadoLivreService";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  if (!code) {
    return new Response(
      JSON.stringify({ error: "Código de autorização não fornecido" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const tokenData = await MercadoLivreService.exchangeCodeForToken(code);

    // Aqui você pode salvar tokenData em um banco de dados ou sessão
    return new Response(
      JSON.stringify({ message: "Autenticação bem-sucedida", tokenData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao trocar código por token" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
