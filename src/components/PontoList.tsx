import React from "react";
import { Ponto } from "../types";
import { Edit2, Trash2, Music, User, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PontoListProps {
  pontos: Ponto[];
  onEdit: (ponto: Ponto) => void;
  onDelete: (id: string) => void;
}

export const PontoList: React.FC<PontoListProps> = ({
  pontos,
  onEdit,
  onDelete,
}) => {
  if (pontos.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
        <Music className="mx-auto text-zinc-300 mb-3" size={48} />
        <p className="text-zinc-500 font-medium">Nenhum ponto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <AnimatePresence mode="popLayout">
        {pontos.map((ponto) => (
          <motion.div
            key={ponto.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-black/5 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-zinc-900">
                    {ponto.nome}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      ponto.linha === "Esquerda"
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {ponto.linha}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-zinc-400" />
                    <span className="font-medium text-zinc-700">
                      {ponto.medium}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-zinc-400" />
                    <span className="font-medium text-zinc-700">
                      {ponto.toque}
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed text-sm italic">
                    "{ponto.letra}"
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 shrink-0">
                <button
                  onClick={() => onEdit(ponto)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(ponto.id)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
