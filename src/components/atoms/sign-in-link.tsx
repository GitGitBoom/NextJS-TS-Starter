import { signIn } from 'next-auth/client'
import { Link, LinkProps } from '@/atoms/link'

export const SignInLink: React.FC<Omit<LinkProps, 'href'>> = (props) => (
  <Link
    href="/api/auth/signin"
    onClick={(e) => {
      e.preventDefault()
      signIn()
    }}
    {...props}
  >
    {props.children ?? 'Sign in'}
  </Link>
)
