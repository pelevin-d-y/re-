import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import Img from 'src/components/shared-ui/Img'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardSwitcher from '../CardSwitcher'

type Props = {
  data: {
    slides: string[]
    title: string
    contacts: UserData[]
  }
  className?: string
}

const CardShareMulti: React.FC<Props> = ({ className, data }) => {
  const { slides, title, contacts } = data
  const [slide, setSlide] = useState(slides[0])
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()

  const openModalHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const url = require(`public/images/${slide}`)
    usersDispatch({
      type: 'UPDATE_USERS_DATA',
      payload:
        contacts.map((item) => ({
          ...item,
          customTemplate: `<img src=${url}/>`,
        })) || [],
    })
    popupDispatch({ type: 'TOGGLE_CONTACTS_POPUP' })
  }

  const getSlideIndex = (item: string) => slides.indexOf(item)

  const nextStep = () => {
    const currentIndex = getSlideIndex(slide)
    const nextSlide =
      currentIndex === slides.length - 1 ? slides[0] : slides[currentIndex + 1]
    setSlide(nextSlide)
  }

  const prevStep = () => {
    const currentIndex = getSlideIndex(slide)
    const nextSlide =
      currentIndex === 0 ? slides[slides.length - 1] : slides[currentIndex - 1]
    setSlide(nextSlide)
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        <CardSwitcher nextHandler={nextStep} prevHandler={prevStep} />
      </div>
      <div className={s.content}>
        <Img className={s.img} img={slide} alt="image" />
      </div>
      <div className={s.actions}>
        <Pin className={s.pin} />
        <Button variant="contained" handler={openModalHandler}>
          Share
        </Button>
      </div>
    </CardContainer>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    padding: 10px 19px 24px 28px;
    justify-content: space-between;
  }

  .header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    margin-bottom: 7px;
  }

  .title {
    font-size: 18px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .content {
    position: relative;
    height: 170px;

    margin-right: -19px;
    margin-left: -28px;
  }

  .img {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 9px 18px;
    max-width: 100%;
    margin-top: 20px;
  }
`

export default CardShareMulti
