import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { RouteProviders } from './providers'
import { AppLayout } from '../layouts/AppLayout'
import { RecipesPage } from '../features/recipes/pages/RecipesPage'
import { RecipeDetailPage } from '../features/recipes/pages/RecipeDetailPage'
import { CreateRecipePage } from '../features/recipes/pages/CreateRecipePage'

const rootRoute = createRootRoute({ component: RouteProviders })
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_layout',
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
})
const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: () => <RecipesPage favoritesOnly={false} />,
})
const favoritesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/favorites',
  component: () => <RecipesPage favoritesOnly />,
})
const createRoutePage = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/create',
  component: CreateRecipePage,
})
const recipeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/recipe/$recipeId',
  component: RecipeDetailPage,
})
const notFoundRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '$',
  component: () => (
    <section className="empty-state">
      <h1>Page introuvable</h1>
      <p>Cette adresse ne correspond à aucune page.</p>
    </section>
  ),
})

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    favoritesRoute,
    createRoutePage,
    recipeRoute,
    notFoundRoute,
  ]),
])
export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function AppRouter() {
  return <Outlet />
}
