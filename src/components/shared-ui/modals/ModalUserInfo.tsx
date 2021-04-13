import React from 'react'
import classNames from 'classnames'
import { usePopup } from 'src/components/context/PopupContext'
import Avatar from 'src/components/shared-ui/Avatar'
import ColorfulCircle from 'src/components/shared-ui/ColorfulCircle'
import { css } from 'astroturf'

interface Props {
  className?: string
}

const ModalUserInfo: React.FC<Props> = ({ className }) => {
  const { state } = usePopup()
  const { data } = state
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.profile}>
        <Avatar image={data.image} />
        <div className={s.profileInfo}>
          <div className={s.name}>{data.name || '<unknown>'}</div>
          <div className={s.profileType}>
            <ColorfulCircle color="black" />
            Follow up on Meetings
          </div>
        </div>
      </div>
      <div className={s.info}>
        Landon intro-ed <b>Ari Kieth</b> last week, follow up with Landon on
        meeting went with her.
      </div>
    </div>
  )
}

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .profile {
    display: flex;
    flex-flow: row nowrap;
  }

  .profileInfo {
    margin-left: 19px;
  }

  .name {
    margin-bottom: 6px;

    font-weight: var(--bold);
    font-size: 18px;
    line-height: 21px;
  }

  .info {
    max-width: 30%;
    width: 100%;
    padding: 11px 17px 13px;
    font-size: 12px;

    background: #f8f8f8;
  }
`

export default ModalUserInfo
