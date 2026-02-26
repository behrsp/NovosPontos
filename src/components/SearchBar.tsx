import React from "react";
import { Search, Filter } from "lucide-react";
import { Linha } from "../types";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterLinha: (linha: string) => void;
  currentQuery: string;
  currentLinha: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterLinha,
  currentQuery,
  currentLinha,
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          size={18}
        />
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Pesquisar por nome, letra ou médium..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-2 min-w-[180px]">
        <Filter className="text-zinc-400 shrink-0" size={18} />
        <select
          value={currentLinha}
          onChange={(e) => onFilterLinha(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white text-sm"
        >
          <option value="">Todas as Linhas</option>
          {Object.values(Linha).map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
