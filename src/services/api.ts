import axios from 'axios';

const API_KEY = '2a49ae01ece4ba4ea44f8d5d20a989fe'; // Obtenha em api-football.com
const API_URL = 'https://v3.football.api-sports.io';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
});



export async function getPlayers(teamId: number, season: number = 2023) {
  const response = await api.get('/players', {
    params: {
      team: teamId,
      season: season,
      league: 71 // Código do Brasileirão
    }
  });
  return response.data.response;
}

export async function getLeagues() {
  const response = await api.get('/leagues', {
    params: {
      country: 'Brazil'
    }
  });
  console.log('Ligas do Brasil:', response.data.response);
  return response.data.response;
}
export async function getTeams(leagueId: number = 71, season: number = 2023) {
  try {
    console.log('Fazendo requisição para /teams com params:', { league: leagueId, season });
    const response = await api.get('/teams', {
      params: {
        league: leagueId,
        season: season
      }
    });
    console.log('Resposta da API:', response.data);
    return response.data.response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}