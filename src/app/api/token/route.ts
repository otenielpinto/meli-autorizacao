import { NextRequest } from "next/server";
import MercadoLivreService from "@/lib/mercadoLivreService.js";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await MercadoLivreService.getAccountById(id);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
