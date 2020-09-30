import { get } from './index';
import { Player } from '../../../types';

const getPlayers = async (championship: string = '1', season: string = '2018'): Promise<Array<Player>> => {
  return get(`/stats/championship/${championship}/${season}`);
}

const getPlayerDetails: any = async (playerId: string, season: string = '2018') => {
  return get(`/stats/player/${playerId}?season=${season}`);
}

export {
  getPlayers,
  getPlayerDetails,
}
