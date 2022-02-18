import React, { useEffect, useState } from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { useFreeStorage } from 'src/components/context/FreeStorageContext'
import Img from 'src/components/shared-ui/Img'
import CloseButton from 'src/components/shared-ui/Close'
import ProgressBar from 'src/components/shared-ui/ProgressBar'
import Button from 'src/components/shared-ui/Button'
import classnames from 'classnames'
import ModalBase from '../ModalBase'
import Option from './Option'

const steps = [
  {
    value: 'communication-style',
    question: 'What’s closest to your email communication style?',
    options: [
      {
        value: 'formal',
        text: 'Formal',
        icon: 'welcome/formal.png',
      },
      {
        value: 'casual',
        text: 'Casual',
        icon: 'welcome/casual.png',
      },
    ],
  },
  {
    value: 'personal-or-professional',
    question: 'Are you here for personal or professional growth?',
    options: [
      {
        value: 'personal',
        text: 'Personal',
        icon: 'welcome/personal.png',
      },
      {
        value: 'professional',
        text: 'Professional',
        icon: 'welcome/professional.png',
      },
    ],
  },
  {
    value: 'recruitment-or-job-search',
    question: 'Are you looking to recruit or job search?',
    options: [
      {
        value: 'job-search',
        text: 'Job Search',
        icon: 'welcome/job-search.png',
      },
      {
        value: 'recruitment',
        text: 'Recruitment',
        icon: 'welcome/recruit.png',
      },
    ],
  },
  {
    value: 'stay-in-touch',
    question: 'How important is it to stay in touch with new contacts?',
    options: [
      {
        value: 'important',
        text: 'Important',
        icon: null,
      },
      {
        value: 'not-important',
        text: 'Not Very Important',
        icon: null,
      },
    ],
  },
  {
    value: 'reconnect-with-contacts',
    question: 'How important is it to reconnect with old friends?',
    options: [
      {
        value: 'important',
        text: 'Important',
        icon: null,
      },
      {
        value: 'not-important',
        text: 'Not Very Important',
        icon: null,
      },
    ],
  },
  {
    value: 'get-feedback-intro',
    question: 'How important is it to get feedback on intros you made?',
    options: [
      {
        value: 'important',
        text: 'Important',
        icon: null,
      },
      {
        value: 'not-important',
        text: 'Not Very Important',
        icon: null,
      },
    ],
  },
  {
    value: 'give-feedback-intro',
    question: 'How important is it to give feedback on intros you received?',
    options: [
      {
        value: 'important',
        text: 'Important',
        icon: null,
      },
      {
        value: 'not-important',
        text: 'Not Very Important',
        icon: null,
      },
    ],
  },
]

const WelcomeModal: React.FC = () => {
  const { dispatch: dispatchPopup, state: popupState } = usePopup()
  const { updateFreeStorage, state: freeStorageState } = useFreeStorage()

  const [hasModalOpened, setHasModalOpened] = useState(false)

  const { welcomeModalIsOpen } = popupState
  const { hasFreeStorageLoaded } = freeStorageState
  const { welcome_questionnaire_shown } = freeStorageState

  useEffect(() => {
    if (
      hasFreeStorageLoaded &&
      !hasModalOpened &&
      !welcome_questionnaire_shown
    ) {
      setHasModalOpened(true)
      dispatchPopup({ type: 'TOGGLE_WELCOME_POPUP' })
    }
  }, [
    dispatchPopup,
    hasFreeStorageLoaded,
    hasModalOpened,
    welcome_questionnaire_shown,
  ])

  const [stepsValues, setStepsValues] = useState(Array(steps.length).fill(-1))
  const saveStep = (step: number, value: number) => {
    const values = [...stepsValues]
    values[step] = value
    setStepsValues(values)
  }

  const [selectedOption, setSelectedOption] = useState(-1)
  const [currentStep, setCurrentStep] = useState(0)
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    setSelectedOption(-1)
  }
  const selectStep = (index: number) => {
    setSelectedOption(index)
    saveStep(currentStep, index)

    if (!isLastStep) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(-1)
    }
  }

  const getAnswers = () => {
    const answers = {} as any
    stepsValues.forEach((value, index) => {
      const step = steps[index]
      const option = step.options[value]
      answers[step.value] = option.value
    })
    return answers
  }

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const percentageComplete = Math.round(
    (currentStep / (steps.length - 1)) * 95 + 2
  )

  const saveAndCloseHandler = () => {
    const answers = getAnswers()
    updateFreeStorage({
      welcome_questionnaire_shown: true,
      welcome_questionnaire: answers,
    })
    dispatchPopup({ type: 'TOGGLE_WELCOME_POPUP' })
  }

  const closeHandler = () => {
    updateFreeStorage({
      welcome_questionnaire_shown: true,
    })
    dispatchPopup({ type: 'TOGGLE_WELCOME_POPUP' })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={welcomeModalIsOpen}
      onClose={closeHandler}
    >
      <CloseButton className={s.closeContainer} handler={closeHandler} />

      <div className={s.header}>
        <Img className={s.icon} alt="logo" img="logo-user-info.svg" />
        <div>
          <div className={s.title}>Welcome to Strata!</div>
          <div className={s.description}>
            Help Strata make more intelligent recommendations for you.
          </div>
        </div>
      </div>

      <div className={s.questionContainer}>
        <ProgressBar percentage={percentageComplete} />

        <h3 className={s.question}>{steps[currentStep]?.question}</h3>

        <div className={s.options}>
          {steps[currentStep]?.options?.map((option, index) => (
            <Option
              key={index}
              className={classnames(s.option, {
                [s.optionSelected]: selectedOption === index,
              })}
              img={option.icon}
              handler={() => selectStep(index)}
            >
              {option.text}
            </Option>
          ))}
        </div>
      </div>

      <div className={s.buttonsContainer}>
        {!isFirstStep && (
          <Button
            className={classnames(s.buttonSteps, s.buttonPrev)}
            variant="outlined"
            handler={prevStep}
          >
            Previous
          </Button>
        )}

        {isLastStep && (
          <Button
            className={s.buttonDone}
            variant="contained"
            handler={saveAndCloseHandler}
            disabled={selectedOption === -1}
          >
            Done
          </Button>
        )}
      </div>
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 600px;
  }

  .closeContainer {
    width: 30px;
    margin-left: calc(100% - 50px);
    margin-top: 15px;
    background: transparent;
    color: var(--neutral2);
  }

  .header {
    display: flex;
    flex-flow: row nowrap;

    width: 100%;
    margin-bottom: 48px;
    padding-left: 42px;

    @include mobile {
      padding-left: 12px;
    }
  }

  .title {
    font-size: 24px;
    font-weight: var(--semiBold);
    margin-top: 4px;
  }

  .description {
    max-width: 90%;
    width: 100%;

    margin-top: 0.6em;
    @include mobile {
      max-width: 100%;
    }
  }

  .circle {
    position: relative;

    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 62px;
    width: 100%;
    height: 62px;
    margin-right: 29px;

    border: 1.2px solid #e4e4e4;
    border-radius: 50%;
  }

  .icon {
    width: 80px;
    height: 80px;
    margin-right: 24px;
  }

  .questionContainer {
    padding-left: 42px;
    padding-right: 42px;

    text-align: center;

    @include mobile {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .question {
    margin-top: 24px;
  }

  .options {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    align-items: center;

    margin-top: 24px;
  }

  .option {
    flex: 1 1 0px;
    margin: 0px 12px;
  }

  .optionSelected {
    outline: 2px solid var(--blue);
  }

  .buttonsContainer {
    display: flex;
    width: 100%;
    padding: 24px 42px;

    @include mobile {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .buttonSteps {
    border: none;
  }

  .buttonPrev {
    margin-right: auto;
  }

  .buttonNext {
    margin-left: auto;
  }
`

export default WelcomeModal
