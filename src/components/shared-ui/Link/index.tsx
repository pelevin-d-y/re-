import React from 'react'
import NextLink from 'next/link'

type Props = {
  className?: string
  href: string
}

const Link: React.FC<Props> = ({ href, className, children }) => (
  <NextLink href={href}>
    <a className={className}>{children}</a>
  </NextLink>
)

export default Link
