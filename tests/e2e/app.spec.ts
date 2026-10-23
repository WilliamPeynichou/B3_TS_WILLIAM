import { expect, test } from '@playwright/test'

const recipes = [
  {
    id: 1,
    name: 'Soupe de lentilles',
    ingredients: ['lentilles', 'carotte'],
    instructions: ['Cuire doucement.'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'French',
    image: 'https://example.test/soupe.jpg',
    tags: ['comfort'],
    mealType: ['Dinner'],
    rating: 4.8,
    reviewCount: 12,
    caloriesPerServing: 300,
  },
  {
    id: 2,
    name: 'Pasta pesto',
    ingredients: ['pasta', 'basil'],
    instructions: ['Boil pasta.'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 8,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Italian',
    image: 'https://example.test/pasta.jpg',
    tags: ['quick'],
    mealType: ['Lunch'],
    rating: 4.5,
    reviewCount: 8,
    caloriesPerServing: 420,
  },
]

test.beforeEach(async ({ page }) => {
  await page.route('https://dummyjson.com/recipes?limit=0', (route) =>
    route.fulfill({
      json: { recipes, total: recipes.length, skip: 0, limit: 0 },
    }),
  )
  await page.route('https://dummyjson.com/recipes/1', (route) =>
    route.fulfill({ json: recipes[0] }),
  )
})

test('filtre les recettes, ouvre le détail et persiste les favoris', async ({
  page,
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Soupe de lentilles' }),
  ).toBeVisible()
  await page.getByRole('textbox', { name: 'Rechercher' }).fill('pesto')
  await expect(page.getByRole('heading', { name: 'Pasta pesto' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Soupe de lentilles' }),
  ).toHaveCount(0)

  await page.getByRole('button', { name: '♡ Sauvegarder' }).click()
  await expect(
    page.getByRole('button', { name: '♥ Sauvegardée' }),
  ).toBeVisible()
  await page.reload()
  await page.getByRole('link', { name: 'Mon carnet' }).click()
  await expect(page.getByText('Pasta pesto')).toBeVisible()
  await page.getByRole('button', { name: /Retirer .* des favoris/ }).click()
  await expect(page.getByText('Votre carnet est encore vide')).toBeVisible()
})

test('navigation vers une recette et changement de thème', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Voir la recette' }).first().click()
  await expect(
    page.getByRole('heading', { name: 'Soupe de lentilles' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Ingrédients' })).toBeVisible()
  await page.getByRole('button', { name: 'Activer le thème sombre' }).click()
  await expect(
    page.getByRole('button', { name: 'Activer le thème clair' }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('formulaire required accessible, création et erreur serveur avec reprise', async ({
  page,
}) => {
  await page.goto('/create')
  const name = page.getByRole('textbox', { name: 'Nom de la recette' })
  const ingredients = page.getByRole('textbox', {
    name: 'Ingrédients (séparés par des virgules)',
  })
  const instructions = page.getByRole('textbox', {
    name: 'Étapes (une par ligne)',
  })
  const submit = page.getByRole('button', { name: 'Publier ma recette' })

  await submit.click()
  await expect(page.getByRole('alert').first()).toBeVisible()
  await expect(name).toHaveAttribute('aria-invalid', 'true')

  await name.fill('Tarte aux pommes')
  await ingredients.fill('pommes, farine')
  await instructions.fill('Mélanger.\nCuire.')
  await page
    .getByRole('spinbutton', { name: 'Préparation (minutes)' })
    .fill('35')

  let failNext = true
  await page.route('https://dummyjson.com/recipes/add', async (route) => {
    if (failNext) {
      failNext = false
      await route.fulfill({
        status: 500,
        json: { message: 'Erreur temporaire' },
      })
      return
    }
    const payload = route.request().postDataJSON()
    await route.fulfill({ json: { ...payload, id: 101 } })
  })
  await submit.click()
  await expect(page.getByRole('alert')).toContainText(/pas pu être publiée/)
  await expect(name).toHaveValue('Tarte aux pommes')
  await submit.click()
  await expect(page).toHaveURL(/\/recipe\/101$/)
})

test('mise en page mobile sans débordement horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Soupe de lentilles' }),
  ).toBeVisible()
  expect(
    await page
      .locator('body')
      .evaluate((body) => body.scrollWidth <= window.innerWidth),
  ).toBe(true)
})
