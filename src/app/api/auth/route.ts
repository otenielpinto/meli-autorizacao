import { NextRequest } from "next/server";
import MercadoLivreService from "@/lib/mercadoLivreService.js";

export async function GET() {
  try {
    const authUrl = await MercadoLivreService.getAuthUrl();

    return new Response(null, {
      status: 302,
      headers: { Location: authUrl },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao gerar URL de autenticação" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
