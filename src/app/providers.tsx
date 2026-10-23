import { FiltersProvider } from '../features/recipes/contexts/FiltersContext'
import { FavoritesProvider } from '../features/recipes/contexts/FavoritesContext'
import { ThemeProvider } from '../features/recipes/contexts/ThemeContext'
import { RecipesProvider } from '../features/recipes/contexts/RecipesContext'
import {
  Outlet,
  RouterProvider as TanStackRouterProvider,
} from '@tanstack/react-router'
import { router } from './router'

export function AppProviders() {
  return <TanStackRouterProvider router={router} />
}

export function RouteProviders() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <FiltersProvider>
          <RecipesProvider>
            <Outlet />
          </RecipesProvider>
        </FiltersProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
