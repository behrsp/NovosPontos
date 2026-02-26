import { Ponto } from "../types";

const STORAGE_KEY = "cadastro_pontos_data";

export const storageService = {
  getPontos: (): Ponto[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  savePontos: (pontos: Ponto[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pontos));
  },

  addPonto: (ponto: Omit<Ponto, "id" | "createdAt">): Ponto => {
    const pontos = storageService.getPontos();
    const newPonto: Ponto = {
      ...ponto,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    storageService.savePontos([...pontos, newPonto]);
    return newPonto;
  },

  updatePonto: (id: string, updatedData: Partial<Ponto>): void => {
    const pontos = storageService.getPontos();
    const updatedPontos = pontos.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    storageService.savePontos(updatedPontos);
  },

  deletePonto: (id: string): void => {
    const pontos = storageService.getPontos();
    const filteredPontos = pontos.filter((p) => p.id !== id);
    storageService.savePontos(filteredPontos);
  },
};
