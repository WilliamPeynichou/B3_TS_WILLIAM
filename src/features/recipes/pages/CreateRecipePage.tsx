import { useState, type FormEvent } from 'react'
import { useNavigate } from '../../../app/router-context'
import { useRecipes } from '../contexts/RecipesContext'
import { Header } from '../../../layouts/Header'
import { Button, Input, Select, Textarea } from '../../../components/ui'

type FieldErrors = Partial<
  Record<'name' | 'ingredients' | 'instructions' | 'minutes', string>
>

export function CreateRecipePage() {
  const navigate = useNavigate()
  const { addRecipe } = useRecipes()
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [minutes, setMinutes] = useState('20')
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy) return
    setStatus('')
    const parsedMinutes = Number(minutes)
    const nextErrors: FieldErrors = {}
    if (name.trim().length < 3)
      nextErrors.name = 'Le nom doit contenir au moins 3 caractères.'
    if (!ingredients.split(',').some((item) => item.trim()))
      nextErrors.ingredients = 'Ajoutez au moins un ingrédient.'
    if (!instructions.split('\n').some((item) => item.trim()))
      nextErrors.instructions = 'Ajoutez au moins une étape.'
    if (
      !Number.isFinite(parsedMinutes) ||
      !Number.isInteger(parsedMinutes) ||
      parsedMinutes < 1
    )
      nextErrors.minutes =
        'La durée doit être un nombre entier supérieur ou égal à 1.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Corrigez les champs signalés avant de publier.')
      return
    }
    setBusy(true)
    setStatus('Envoi de votre recette…')
    try {
      const r = await addRecipe({
        name: name.trim(),
        ingredients: ingredients
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        instructions: instructions
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        prepTimeMinutes: parsedMinutes,
        cookTimeMinutes: 0,
        servings: 4,
        difficulty,
        cuisine: cuisine.trim() || 'Maison',
        image: '',
        tags: ['Fait maison'],
        mealType: ['Dinner'],
      })
      setStatus(`Recette « ${r.name} » publiée (référence #${r.id}).`)
      navigate(`/recipe/${r.id}`)
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : 'Échec de publication. Réessayez.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Header title="Mijoter une recette" />
      <section className="p-4 border-b border-outline">
        <form onSubmit={submit} noValidate className="space-y-4">
          <p className="text-sm text-muted">
            <span className="text-primary" aria-hidden="true">
              *
            </span>{' '}
            Champs obligatoires
          </p>
          <Input
            id="recipe-name"
            name="name"
            label="Nom de la recette"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Textarea
            id="recipe-ingredients"
            name="ingredients"
            label="Ingrédients (séparés par des virgules)"
            required
            className="min-h-[100px] resize-y"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            error={errors.ingredients}
          />
          <Textarea
            id="recipe-instructions"
            name="instructions"
            label="Étapes (une par ligne)"
            required
            className="min-h-[120px] resize-y"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            error={errors.instructions}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="recipe-cuisine"
              name="cuisine"
              label="Cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
            <Select
              id="recipe-difficulty"
              name="difficulty"
              label="Difficulté"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
            </Select>
          </div>
          <Input
            id="recipe-minutes"
            name="minutes"
            label="Préparation (minutes)"
            required
            type="number"
            min="1"
            step="1"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            error={errors.minutes}
          />
          <Button
            type="submit"
            disabled={busy}
            aria-busy={busy}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 rounded-full shadow-sm disabled:opacity-70"
          >
            {busy ? 'Publication…' : 'Publier ma recette'}
          </Button>
          {status && (
            <p
              className="text-center text-sm text-muted"
              role={
                status.startsWith('Échec') ||
                status.includes('pas pu être publiée')
                  ? 'alert'
                  : 'status'
              }
            >
              {status}
            </p>
          )}
        </form>
      </section>
    </>
  )
}
