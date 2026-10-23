import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
type Value = { dark: boolean; setDark: (value: boolean) => void }
const Context = createContext<Value | null>(null)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(
    () => localStorage.getItem('tablee-theme') === 'dark',
  )
  useEffect(() => {
    localStorage.setItem('tablee-theme', dark ? 'dark' : 'light')
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])
  const value = useMemo(() => ({ dark, setDark }), [dark])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useTheme() {
  const value = useContext(Context)
  if (!value) throw new Error('ThemeProvider manquant')
  return value
}
