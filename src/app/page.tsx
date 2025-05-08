'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTeams } from '@/services/api';
import { PlayersList } from '@/components/PlayersList';

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  
  const { data: teams, isLoading, error } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });

  if (isLoading) return <div className="text-center py-8">Carregando times...</div>;
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8">
        <strong className="block font-bold">Erro ao carregar dados!</strong>
        <p className="mt-2">{(error as any).response?.data?.errors?.plan || (error as any).message}</p>
        <p className="mt-4 text-sm">Sugestões:
          <ul className="list-disc pl-5 mt-2">
            <li>Use uma temporada entre 2021-2023</li>
            <li>Verifique sua API key</li>
            <li>Confira seu plano no painel da API-Football</li>
          </ul>
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Brasileirão 2025</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Times</h2>
        <div className="flex flex-wrap gap-4">
          {teams?.map((team: any) => (
            <button
              key={team.team.id}
              onClick={() => setSelectedTeam(team.team.id)}
              className={`px-4 py-2 rounded-lg ${selectedTeam === team.team.id ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <div className="flex items-center gap-2">
                <img 
                  src={team.team.logo} 
                  alt={team.team.name}
                  className="w-6 h-6"
                />
                {team.team.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedTeam && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Jogadores</h2>
          <PlayersList teamId={selectedTeam} />
        </div>
      )}
    </main>
  );
}