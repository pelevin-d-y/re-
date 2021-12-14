import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useRouter } from 'next/router'

type Props = {
  className?: string
}

const ProfileContent: React.FC<Props> = ({ className }) => {
  const router = useRouter()

  return (
    <div className={classNames(className, s.container)}>Profile content</div>
  )
}

const s = css`
  .container {
  }
`

export default ProfileContent
