import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import Avatar from 'src/components/shared-ui/Avatar'
import { useTemplates } from 'src/components/context/TemplatesContext'
import GoogleAuth from 'src/components/shared-ui/GoogleAuth'

type Props = {
  className?: string
}

const PersonalizationContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()
  const {
    state: { data: templatesData },
  } = useTemplates()

  return (
    <div className={classNames(className, s.container)}>
      <GoogleAuth className={s.googleAuth} />
      {clientState ? (
        <div className={s.account}>
          <div className={s.title}>Account</div>
          <ul className={s.list}>
            <li className={s.item}>
              Avatar:{' '}
              <Avatar
                className={s.avatar}
                image={require(`public/images/${clientState.avatar}`)}
              />
            </li>
            <li className={s.item}>Name: {clientState.name}</li>
            <li className={s.item}>Address: {clientState.address}</li>
            <li className={s.item}>tags: {clientState.tags}</li>
          </ul>
        </div>
      ) : null}
      {templatesData ? (
        <div className={s.templates}>
          <div className={s.title}>Templates</div>
          <ul className={s.list}>
            {templatesData.map((template) => (
              <li className={s.item} key={template.Template}>
                {template.Template}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

const s = css`
  .container {
    padding: 10px 14px 14px;
  }

  .googleAuth {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
  }

  .avatar {
    margin-left: 10px;
  }

  .title {
    font-size: 28px;
    font-weight: var(--bold);
  }

  .list {
    padding: 8px 10px;
    list-style: none;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;

    border-bottom: 1px solid #cecece;
  }
`

export default PersonalizationContent
