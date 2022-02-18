import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Img from 'src/components/shared-ui/Img'
import { usePopup } from 'src/components/context/PopupContext'
import CardSwitcher from '../CardSwitcher'
import Typography from '../../Typography'

type Props = {
  data: {
    slides: string[]
    title: string
    contacts: RecommendationUser[]
  }
  className?: string
}

const CardShareMulti: React.FC<Props> = ({ className, data }) => {
  const { slides, title, contacts } = data
  const [slide, setSlide] = useState(slides[0])
  const { dispatch: popupDispatch } = usePopup()

  const openModalHandler = () => {
    popupDispatch({ type: 'UPDATE_POPUP_DATA', payload: null })

    const url =
      process.env.NODE_ENV === 'development'
        ? `/images/${slide}`
        : `https://app.strata.cc/images/${slide}`

    popupDispatch({
      type: 'UPDATE_COMPOSE_MULTI_DATA',
      payload:
        contacts.map((item) => ({
          ...item,
          customTemplate: `<img src=${url} />`,
        })) || [],
    })
    popupDispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
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
        <Typography styleVariant="h4" fontWeight="bold">
          Share{' '}
          <Typography
            className={s.titleAccent}
            tagVariant="span"
            styleVariant="h3"
            fontWeight="regular"
            fontVariant="damion"
          >
            {title}
          </Typography>
        </Typography>
        <CardSwitcher nextHandler={nextStep} prevHandler={prevStep} />
      </div>
      <div className={s.content}>
        <Img className={s.img} img={slide} alt="image" />
      </div>
      <div className={s.actions}>
        <Button
          className={s.button}
          variant="outlined"
          handler={openModalHandler}
        >
          Share {title}
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

  .titleAccent {
    color: var(--primary1);
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
    display: block;

    max-width: 100%;
    margin-top: 20px;
  }

  .button {
    display: block;
    margin-left: auto;
    margin-right: auto;

    width: 100%;
  }
`

export default CardShareMulti
