const getPosition = (id: number) => {
  switch(id) {
    case 10:
      return 'Gardien';
    case 20:
      return 'Défenseur';
    case 21:
      return 'Latéral';
    case 31:
      return 'Milieu défensif';
    case 32:
      return 'Milieu offensif';
    case 40:
      return 'Attaquant';
    default:
      return 'Maïs';
  }
}

export default getPosition;
