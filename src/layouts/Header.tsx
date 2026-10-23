import { Button } from '../components/ui/Button'
import { Link, usePathname } from '../app/router-context'
import { useTheme } from '../features/recipes/contexts/ThemeContext'

type HeaderProps = {
  title: string
  showTabs?: boolean
  backHref?: string
}

export function Header({ title, showTabs = true, backHref }: HeaderProps) {
  const { dark, setDark } = useTheme()
  const pathname = usePathname()
  const tabs = [
    { href: '/', label: 'Pour vos fourneaux' },
    { href: '/favorites', label: 'Mon carnet' },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-outline bg-surface-card text-on-surface-display">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              aria-label="Retour au fil"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-on-surface hover:bg-surface-raised"
            >
              <span aria-hidden="true">←</span>
            </Link>
          )}
          <h1 className="min-w-0 break-words font-serif text-lg font-bold tracking-tight sm:text-xl">
            {title}
          </h1>
        </div>
        <Button
          variant="ghost"
          className="shrink-0 px-3 py-2 text-sm"
          onClick={() => setDark(!dark)}
          aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}
          aria-pressed={dark}
        >
          {dark ? '☀ Clair' : '☾ Sombre'}
          </Button>
      </div>
      {showTabs && (
        <nav
          aria-label="Navigation du fil"
          className="flex border-t border-outline"
        >
          {tabs.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className={`flex-1 border-b-2 px-2 py-3 text-center text-sm font-semibold hover:bg-surface-subtle ${pathname === href ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
