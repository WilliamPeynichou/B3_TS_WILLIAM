import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

type FieldProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

function Field({ id, label, required, error, children }: FieldProps) {
  const errorId = `${id}-error`

  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-semibold text-on-surface-display">
        {label}
        {required && (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (obligatoire)</span>}
      </span>
      {children}
      {error && (
        <span
          id={errorId}
          className="mt-1 block text-sm text-red-700"
          role="alert"
        >
          {error}
        </span>
      )}
    </label>
  )
}

const fieldClass =
  'mt-1 w-full rounded-lg border border-outline bg-surface-card px-3 py-2 text-on-surface-display focus:outline-none focus:ring-2 focus:ring-primary/30'

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<FieldProps, 'children'>
export function Input({
  id,
  label,
  required,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <input
        {...props}
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${className}`}
      />
    </Field>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<FieldProps, 'children'>
export function Textarea({
  id,
  label,
  required,
  error,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <textarea
        {...props}
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${className}`}
      />
    </Field>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  Omit<FieldProps, 'children'> & { children: ReactNode }
export function Select({
  id,
  label,
  required,
  error,
  className = '',
  children,
  ...props
}: SelectProps) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <select
        {...props}
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${className}`}
      >
        {children}
      </select>
    </Field>
  )
}
