import { useFilters } from '../contexts/FiltersContext'

const cuisines = [
  'Italian',
  'Asian',
  'American',
  'Mexican',
  'Mediterranean',
  'Pakistani',
  'Japanese',
  'Moroccan',
  'Greek',
  'Indian',
  'Thai',
  'Turkish',
  'French',
  'Korean',
]
const fieldClass =
  'mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

export function RecipeFilters({ reset }: { reset: () => void }) {
  const { filters, setFilters } = useFilters()

  function update(value: Partial<typeof filters>) {
    setFilters({ ...filters, ...value })
    reset()
  }

  return (
    <div className="grid gap-4 border-b border-outline-variant bg-surface-container-low p-4 sm:grid-cols-3">
      <label className="text-sm font-semibold text-on-surface-variant">
        Rechercher
        <input
          className={fieldClass}
          value={filters.search}
          onChange={(event) => update({ search: event.target.value })}
          placeholder="Ingrédient, recette…"
        />
      </label>
      <label className="text-sm font-semibold text-on-surface-variant">
        Cuisine
        <select
          className={fieldClass}
          value={filters.cuisine}
          onChange={(event) => update({ cuisine: event.target.value })}
        >
          <option value="">Toutes les cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine}>{cuisine}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold text-on-surface-variant">
        Difficulté
        <select
          className={fieldClass}
          value={filters.difficulty}
          onChange={(event) => update({ difficulty: event.target.value })}
        >
          <option value="">Toutes</option>
          <option>Easy</option>
          <option>Medium</option>
        </select>
      </label>
    </div>
  )
}
