export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="category-filter" aria-label="Filtrar por categoria">
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? "category-chip active" : "category-chip"}
          type="button"
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
