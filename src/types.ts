export enum Linha {
  ESQUERDA = "Esquerda",
  DIREITA = "Direita",
}

export enum Toque {
  IJEXA = "Ijexá",
  SAMBA = "Samba",
  CONGO = "Congo",
  BARRA_VENTO = "Barra vento",
  NAGO = "Nago",
}

export interface Ponto {
  id: string;
  nome: string;
  letra: string;
  linha: Linha;
  toque: Toque;
  medium: string;
  createdAt: number;
}

export interface SearchFilters {
  query: string;
  linha: string;
}
