import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
type Value = { favorites: number[]; toggleFavorite: (id: number) => void }
const Context = createContext<Value | null>(null)
function load(): number[] {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem('tablee-favorites') ?? '[]',
    )
    if (!Array.isArray(stored)) return []
    return [
      ...new Set(
        stored.filter((id) => Number.isSafeInteger(id) && (id as number) > 0),
      ),
    ] as number[]
  } catch {
    return []
  }
}
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(load)
  useEffect(() => {
    try {
      localStorage.setItem('tablee-favorites', JSON.stringify(favorites))
    } catch {
      // Le stockage peut être indisponible (navigation privée ou quota dépassé).
    }
  }, [favorites])
  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite: (id: number) =>
        setFavorites((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        ),
    }),
    [favorites],
  )
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useFavorites() {
  const value = useContext(Context)
  if (!value) throw new Error('FavoritesProvider manquant')
  return value
}
