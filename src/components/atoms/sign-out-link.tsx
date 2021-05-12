import { signOut } from 'next-auth/client'
import { Link, LinkProps } from '@/atoms/link'

export const SignOutLink: React.FC<Omit<LinkProps, 'href'>> = (props) => (
  <Link
    href="/api/auth/signout"
    onClick={(e) => {
      e.preventDefault()
      signOut()
    }}
    {...props}
  >
    {props.children ?? 'Sign out'}
  </Link>
)
