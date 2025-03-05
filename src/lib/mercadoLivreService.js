import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class MercadoLivreService {
  // Método para gerar a URL de autenticação
  async getAuthUrl() {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
    });
    return `${process.env.MERCADO_LIVRE_AUTH_URL}?${params.toString()}`;
  }

  // Método para trocar o código por tokens
  async exchangeCodeForToken(code) {
    const response = await axios.post(
      process.env.MERCADO_LIVRE_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    await this.createAccount(response.data);
    return response.data;
  }

  // Método para renovar o token
  async refreshToken(access_token) {
    const response = await axios.post(
      process.env.MERCADO_LIVRE_TOKEN_URL,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    await this.updateToken(
      access_token,
      response?.data?.access_token,
      response?.data?.refresh_token
    );
    return response.data;
  }

  // Método para chamar a API do Mercado Livre
  async callApi(endpoint, accessToken) {
    const response = await axios.get(
      `https://api.mercadolibre.com${endpoint}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  }

  // Método para criar conta de usuário  retorno vem do mercado livre
  async createAccount(data) {
    const body = {
      id: uuidv4(),
      id_tenant: data.user_id ? data.user_id : uuidv4(),
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: 20600,
    };

    const response = await axios.post(
      `https://auth.komache.workers.dev/account`,
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  }

  async getAccountById(id) {
    let response = await axios.get(
      `https://auth.komache.workers.dev/account?id=${id}`,
      { headers: { "Content-Type": "application/json" } }
    );

    // Verifica se o token está expirado
    let data = await this.renewToken(response?.data);
    if (data?.access_token) {
      response = await axios.get(
        `https://auth.komache.workers.dev/account?id=${id}`,
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return response.data;
  }

  async getToken(access_token) {
    let response = await axios.get(
      `https://auth.komache.workers.dev/token?accessToken=${access_token}`,
      { headers: { "Content-Type": "application/json" } }
    );

    // Verifica se o token está expirado
    let data = await this.renewToken(response?.data);
    if (data?.access_token) {
      response = await axios.get(
        `https://auth.komache.workers.dev/token?accessToken=${data.access_token}`,
        { headers: { "Content-Type": "application/json" } }
      );
    }
    return response.data;
  }

  async updateToken(old_access_token, access_token, refresh_token) {
    const response = await axios.post(
      `https://auth.komache.workers.dev/token`,
      {
        old_access_token,
        access_token,
        refresh_token,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }

  async renewToken(data) {
    if (!data || !data.created_at) return null;
    const currentTime = Date.now() / 1000;
    const tokenAge = currentTime - data.created_at;

    if (tokenAge >= data.expires_in - 60) {
      try {
        return await this.refreshToken(data.access_token);
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }
}

export default new MercadoLivreService();
