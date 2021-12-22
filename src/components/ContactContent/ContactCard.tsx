import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { formatDataForApi } from 'src/helpers/utils/format-data-to-api'
import { get, post } from 'src/api/requests'
import Avatar from '../shared-ui/Avatar'
import PopoverDots from '../shared-ui/popover/PopoverDots'
import PopoverActions from '../shared-ui/popover/PopoverActions'
import { TagUser } from '../shared-ui/Tags'
import UserHeader from '../shared-ui/UserHeader'
import { usePopup } from '../context/PopupContext'
import UserInfo from '../shared-ui/UserInfo'

type Props = {
  className?: string
  data: UserData
}

const ContactCard: React.FC<Props> = ({ className, data }) => {
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  const [mutableData, setMutableData] = useState<FormattedContact | undefined>(
    undefined
  )

  useEffect(() => {
    get.getContactsMutable([data.contact_id]).then((res) => {
      const formattedData = formatContactData(Object.values(res)[0])
      setMutableData(formattedData)
    })
  }, [data.contact_id])

  const updateMutableData = async (val: string, type: 'name' | 'Notes') => {
    try {
      if (mutableData) {
        let value: string | string[] = val
        if (type === 'name') {
          value = val.split(' ')
        }

        const { newValue, previousValue } = formatDataForApi(
          { [type]: value },
          {
            [type]:
              type === 'name'
                ? mutableData[type]?.split(' ')
                : mutableData[type],
          }
        )

        const body = {
          [data.contact_id]: [...newValue, ...previousValue],
        }

        await post.postContactsMutable(body as any)
        const contactMutableRes = await get.getContactsMutable([
          data.contact_id,
        ])

        const formattedData = formatContactData(
          Object.values(contactMutableRes)[0]
        )
        setMutableData(formattedData)
      }
    } catch (err) {
      console.warn('updateMutableData ==>', err)
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <Avatar className={s.avatar} image={data?.avatar} />
        <div className={s.headerInfo}>
          <div className={s.name}>{data?.name}</div>
          <TagUser className={s.tag} text="Super Connector" />
          {data.templateData && (
            <UserHeader
              className={s.message}
              text={parseMessage(data?.templateData?.Subject, data.name)}
            />
          )}
        </div>
        <div className={s.actions}>
          <PopoverDots className={s.dots} variant="outlined" />
          <PopoverActions
            className={s.buttonPopup}
            variant="contained"
            buttonClickHandler={buttonHandler}
            isArrow
          >
            Appreciate you!
          </PopoverActions>
        </div>
      </div>
      <UserInfo data={mutableData} updateData={updateMutableData} />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    min-width: 350px;
    padding: 37px 24px 47px 18px;
    border-right: 1px solid #dddddd;

    @include mobile {
      min-width: auto;
      max-width: 350px;
      border-right: none;
      align-self: center;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .headerInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    margin-bottom: 22px;
    width: 119px !important;
    height: 119px !important;
  }

  .actions {
    margin-bottom: 47px;
  }

  .name {
    font-size: 24px;
    text-align: center;
    margin-bottom: 12px;
  }

  .tag {
    margin-bottom: 37px;
  }

  .message {
    margin-bottom: 19px;
    max-width: 264px;
  }

  .dots {
    margin-right: 6px;
  }

  .buttonPopup {
    width: 199px;
  }
`

export default ContactCard
