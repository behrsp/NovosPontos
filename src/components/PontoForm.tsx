import React, { useState, useEffect } from "react";
import { Ponto, Linha, Toque } from "../types";
import { Save, X } from "lucide-react";

interface PontoFormProps {
  onSave: (ponto: Omit<Ponto, "id" | "createdAt">) => void;
  onCancel: () => void;
  initialData?: Ponto | null;
}

export const PontoForm: React.FC<PontoFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    letra: "",
    linha: Linha.DIREITA,
    toque: Toque.IJEXA,
    medium: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        letra: initialData.letra,
        linha: initialData.linha,
        toque: initialData.toque,
        medium: initialData.medium,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Nome do Ponto
          </label>
          <input
            type="text"
            required
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            placeholder="Ex: Ponto de Abertura"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Médium
          </label>
          <input
            type="text"
            required
            value={formData.medium}
            onChange={(e) =>
              setFormData({ ...formData, medium: e.target.value })
            }
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            placeholder="Nome do médium"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Letra da Música
        </label>
        <textarea
          required
          rows={6}
          value={formData.letra}
          onChange={(e) => setFormData({ ...formData, letra: e.target.value })}
          className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
          placeholder="Insira a letra completa aqui..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Linha
          </label>
          <select
            value={formData.linha}
            onChange={(e) =>
              setFormData({ ...formData, linha: e.target.value as Linha })
            }
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
          >
            {Object.values(Linha).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Toque
          </label>
          <select
            value={formData.toque}
            onChange={(e) =>
              setFormData({ ...formData, toque: e.target.value as Toque })
            }
            className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
          >
            {Object.values(Toque).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors"
        >
          <X size={18} />
          Cancelar
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
        >
          <Save size={18} />
          {initialData ? "Atualizar Ponto" : "Salvar Ponto"}
        </button>
      </div>
    </form>
  );
};
