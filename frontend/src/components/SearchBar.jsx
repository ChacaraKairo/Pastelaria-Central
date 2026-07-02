import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <Search size={19} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar pastel, salgado, bebida..."
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Limpar busca">
          <X size={18} />
        </button>
      )}
    </label>
  );
}
