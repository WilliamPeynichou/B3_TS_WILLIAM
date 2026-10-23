import { useTransition } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import {
  Link as TanStackLink,
  useNavigate as useTanStackNavigate,
  useRouterState,
} from '@tanstack/react-router'

export function useNavigate() {
  const navigate = useTanStackNavigate()
  const [, startTransition] = useTransition()
  return (path: string) => {
    startTransition(() => {
      void navigate({ to: path as never })
    })
  }
}

export function usePathname() {
  return useRouterState({ select: (state) => state.location.pathname })
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
export function Link({ href, onClick, ...props }: LinkProps) {
  return <TanStackLink to={href as never} onClick={onClick} {...props} />
}
