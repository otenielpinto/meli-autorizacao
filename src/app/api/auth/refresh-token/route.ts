import { NextRequest } from "next/server";
import MercadoLivreService from "@/lib/mercadoLivreService";

export async function POST(request: NextRequest) {
  const { refreshToken } = await request.json();

  if (!refreshToken) {
    return new Response(
      JSON.stringify({ error: "Refresh token não fornecido" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const tokenData = await MercadoLivreService.refreshToken(refreshToken);
    return new Response(
      JSON.stringify({ message: "Token renovado com sucesso", tokenData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao renovar token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
