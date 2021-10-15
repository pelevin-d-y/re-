import React, { useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Button from 'src/components/shared-ui/Button'
import Pin from 'src/components/shared-ui/Pin'
import Img from 'src/components/shared-ui/Img'
import Switcher from './Switcher'

type Props = {
  className?: string
  slides: string[]
  title: string
}

const CardShareMulti: React.FC<Props> = ({ className, slides, title }) => {
  const [slide, setSlide] = useState(slides[0])

  const openModalHandler = () => {
    console.log('openModalHandler')
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
        <div className={s.controls}>
          <Switcher
            className={classNames(s.control, s.left)}
            handler={prevStep}
          />
          <Switcher
            className={classNames(s.control, s.right)}
            handler={nextStep}
          />
        </div>
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

  .controls {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .control {
    width: 17px;
    height: 17px;
  }

  .right {
    transform: rotate(180deg);
    margin-left: 14px;
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
