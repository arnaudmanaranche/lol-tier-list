export enum RANKING_VALUES {
  g = "g",
  s = "s",
  a = "a",
  b = "b",
  c = "c",
  d = "d",
}

export interface PLAYER {
  id: number;
  name: string;
  role: string;
  value?: RANKING_VALUES;
}

export interface TEAM {
  id: number;
  acronym?: string;
  logo: string;
  base64: string;
  name: string;
  players: PLAYER[];
}

export interface RANKING {
  id: string;
  data: TEAM[];
  tournamentId: string;
  tournament: TOURNAMENT;
}

export interface TOURNAMENT {
  id: string;
  logo: string;
  name: string;
  status: boolean;
  base64: string;
  year: number;
  pandascoreId: number;
  teams: TEAM[];
}
