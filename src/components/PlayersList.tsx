'use client';

import { useQuery } from '@tanstack/react-query';
import { getPlayers } from '@/services/api';
import Image from 'next/image';

interface PlayerProps {
  teamId: number;
}

export function PlayersList({ teamId }: PlayerProps) {
  const { data: players, isLoading, error } = useQuery({
    queryKey: ['players', teamId],
    queryFn: () => getPlayers(teamId),
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar jogadores</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players?.map((player: any) => (
        <div key={player.player.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <Image 
              src={player.player.photo || '/default-player.png'} 
              alt={player.player.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold text-lg">{player.player.name}</h3>
              <p>Idade: {player.player.age}</p>
              <p>Nacionalidade: {player.player.nationality}</p>
              <p>Posição: {player.statistics[0].games.position}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}