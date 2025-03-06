import { NextRequest } from "next/server";
import MercadoLivreService from "@/lib/mercadoLivreService";

export async function POST(request: NextRequest) {
  const { refresh_token } = await request.json();

  if (!refresh_token) {
    return new Response(
      JSON.stringify({ error: "refreshToken não fornecido" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const tokenData = await MercadoLivreService.refreshToken(refresh_token);
    return new Response(
      JSON.stringify({ message: "Token renovado com sucesso", ...tokenData }),
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
