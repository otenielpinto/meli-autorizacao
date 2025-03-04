import { NextRequest } from "next/server";
import MercadoLivreService from "@/lib/mercadoLivreService";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken"); // Simples para exemplo; use autenticação robusta

  if (!accessToken) {
    return new Response(
      JSON.stringify({ error: "Access token não fornecido" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const userData = await MercadoLivreService.callApi(
      "/users/me",
      accessToken
    );
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar dados do usuário" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
