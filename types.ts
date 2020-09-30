export interface Player {
  id: string,
  club: string,
  firstname: string,
  lastname: string,
  position: number,
  quotation: number,
  stats: {
    avgRate: number,
    currentChampionship: number,
    percentageStarter: number,
    sumGoals: number,
  },
  teamId: number,
  ultraPosition: number,
}

export type MainStackParamList = {
  Home: undefined,
  Player: Player,
}
