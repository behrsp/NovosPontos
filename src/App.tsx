import React, { useState, useEffect, useMemo } from "react";
import { Ponto, Linha, Toque } from "./types";
import { storageService } from "./services/storageService";
import { PontoForm } from "./components/PontoForm";
import { PontoList } from "./components/PontoList";
import { SearchBar } from "./components/SearchBar";
import { Plus, Music, Search as SearchIcon, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingPonto, setEditingPonto] = useState<Ponto | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLinha, setFilterLinha] = useState("");
  const [activeTab, setActiveTab] = useState<"pontos" | "pesquisa">("pontos");

  // Load initial data
  useEffect(() => {
    setPontos(storageService.getPontos());
  }, []);

  // Filtered points for the search section
  const filteredPontos = useMemo(() => {
    return pontos.filter((ponto) => {
      const matchesQuery =
        ponto.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ponto.letra.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ponto.medium.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLinha = filterLinha === "" || ponto.linha === filterLinha;

      return matchesQuery && matchesLinha;
    });
  }, [pontos, searchQuery, filterLinha]);

  const handleSave = (data: Omit<Ponto, "id" | "createdAt">) => {
    if (editingPonto) {
      storageService.updatePonto(editingPonto.id, data);
      setEditingPonto(null);
    } else {
      storageService.addPonto(data);
      setIsAdding(false);
    }
    setPontos(storageService.getPontos());
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este ponto?")) {
      storageService.deletePonto(id);
      setPontos(storageService.getPontos());
    }
  };

  const handleEdit = (ponto: Ponto) => {
    setEditingPonto(ponto);
    setIsAdding(false);
    setActiveTab("pontos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Music size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-zinc-900">
              Cadastro de Pontos
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("pontos")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "pontos"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              <List size={16} />
              Pontos
            </button>
            <button
              onClick={() => setActiveTab("pesquisa")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "pesquisa"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              <SearchIcon size={16} />
              Pesquisa
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "pontos" ? (
            <motion.div
              key="pontos-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900">
                    Gerenciar Pontos
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    Adicione, edite ou remova pontos da sua coleção.
                  </p>
                </div>
                {!isAdding && !editingPonto && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                  >
                    <Plus size={20} />
                    Novo Ponto
                  </button>
                )}
              </div>

              {(isAdding || editingPonto) && (
                <PontoForm
                  onSave={handleSave}
                  onCancel={() => {
                    setIsAdding(false);
                    setEditingPonto(null);
                  }}
                  initialData={editingPonto}
                />
              )}

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Todos os Pontos ({pontos.length})
                </h3>
                <PontoList
                  pontos={pontos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pesquisa-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Pesquisa</h2>
                <p className="text-zinc-500 text-sm">
                  Busque por letra, nome, médium ou linha.
                </p>
              </div>

              <SearchBar
                onSearch={setSearchQuery}
                onFilterLinha={setFilterLinha}
                currentQuery={searchQuery}
                currentLinha={filterLinha}
              />

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Resultados ({filteredPontos.length})
                </h3>
                <PontoList
                  pontos={filteredPontos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-zinc-200 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 Cadastro de Pontos</p>
          <div className="flex gap-6">
            <span>Organização</span>
            <span>Tradição</span>
            <span>Respeito</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
