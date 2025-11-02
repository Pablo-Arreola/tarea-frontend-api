interface Props {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder }: Props) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        className="border p-2 rounded w-full md:w-72"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
