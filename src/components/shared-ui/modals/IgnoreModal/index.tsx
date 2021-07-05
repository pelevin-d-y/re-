import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Avatar from 'src/components/shared-ui/Avatar'
import ModalBase from '../ModalBase'

type Props = {
  className?: string
}

const Ignore: React.FC<Props> = ({ className }) => (
  <ModalBase
    className={classNames(className, s.container)}
    isOpen={false}
    onClose={() => null}
  >
    <div className={s.title}>Ignore reason?</div>
    <Avatar />
  </ModalBase>
)

const s = css`
  .container {
  }
`

export default Ignore
