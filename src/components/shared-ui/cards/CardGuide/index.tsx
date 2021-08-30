import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import Img from 'src/components/shared-ui/Img'
import Bar from '../../Bar'

type Props = {
  className?: string
}

const CardGuide: React.FC<Props> = ({ className }) => (
  <CardContainer className={classNames(s.container, className)}>
    <div className={s.header}>
      <div className={s.left}>
        <div className={s.logo}>
          <Img className={s.image} img="guide.png" alt="guide" />
        </div>
        <div className={s.titleBlock}>
          <div className={s.title}>Onboarding Guide</div>
          <div className={s.subtitle}>
            Take these steps to take full advantage of Strata’s power
          </div>
        </div>
      </div>
      <div className={s.right}>
        <div className={s.barTitle}>Almost there, 25% done</div>
        <Bar bar={25} barColor="green" className={s.bar} />
      </div>
    </div>
    <div className={s.content}>
      <div className={s.cards}>
        <div className={s.card}>
          <div className={s.cardLogo}>
            <Img alt="icon" className={s.icon} img="accounts.png" />
          </div>
          <div className={s.cardTitle}>Accounts</div>
          <div className={s.cardDescription}>
            Build a bigger network effect.
          </div>
          <button type="button" className={s.button}>
            Add
          </button>
        </div>
        <div className={s.card}>
          <div className={s.cardLogo}>
            <Img alt="icon" className={s.icon} img="contacts.png" />
          </div>
          <div className={s.cardTitle}>Build List</div>
          <div className={s.cardDescription}>Organize your contacts.</div>
          <button type="button" className={s.button}>
            Create
          </button>
        </div>
        <div className={s.card}>
          <div className={s.cardLogo}>
            <Img alt="icon" className={s.icon} img="track.png" />
          </div>
          <div className={s.cardTitle}>Track</div>
          <div className={s.cardDescription}>
            Prioritize tasks and outreach.
          </div>
          <button type="button" className={s.button}>
            Manage
          </button>
        </div>
        <div className={s.card}>
          <div className={s.cardLogo}>
            <Img alt="icon" className={s.icon} img="templates.png" />
          </div>
          <div className={s.cardTitle}>Templates</div>
          <div className={s.cardDescription}>Customize your templates.</div>
          <button type="button" className={s.button}>
            Customize
          </button>
        </div>
        <div className={classNames(s.card, s.cardPremium)}>
          <div className={classNames(s.cardLogo, s.cardLogoPremium)}>
            <Img alt="icon" className={s.icon} img="diamond.png" />
          </div>
          <div className={classNames(s.cardTitle, s.cardTitlePremium)}>
            Premium
          </div>
          <div className={s.cardDescription}>Get more out of Strata.</div>
          <button type="button" className={s.button}>
            Upgrade
          </button>
        </div>
      </div>
    </div>
  </CardContainer>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    overflow: hidden;
    position: relative;
    padding: 25px 24px 33px 29px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 11px;
    @include mobile {
      flex-direction: column;
    }
  }

  .left {
    display: flex;
    @include mobile {
      margin-bottom: 15px;
    }
  }

  .logo {
    width: 43px;
    height: 43px;
    margin-right: 20px;
  }

  .title {
    font-size: 22px;
    font-weight: 800;
    line-height: 22px;
    margin-bottom: 4px;
  }

  .subtitle {
    font-size: 12px;
    font-weight: 600;
    line-height: 22px;
  }

  .barTitle {
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    margin-bottom: 10px;
  }

  .cards {
    display: flex;
    justify-content: space-between;
    @include mobile {
      flex-direction: column;
    }
  }

  .card {
    display: grid;
    justify-items: center;
    padding: 15px 14px 25px 14px;
    border-radius: 6px;
    width: 113px;
    @include mobile {
      width: 100%;
    }
  }

  .cardPremium {
    box-shadow: 0px 1px 1px 0px rgba(34, 34, 34, 0.0989),
      0px 4px 8px 0px rgba(0, 0, 0, 0.1199);
  }

  .cardLogo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(240, 245, 255, 1);
    margin-bottom: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 22px;
    height: 22px;
  }

  .cardLogoPremium {
    background: rgba(246, 234, 255, 1);
  }

  .cardTitlePremium {
    color: rgba(144, 47, 221, 1);
  }

  .cardTitle {
    font-size: 12px;
    font-weight: 800;
    line-height: 14px;
    margin-bottom: 10px;
  }

  .cardDescription {
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    margin-bottom: 18px;
  }

  .button {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    color: rgba(25, 102, 255, 1);
    background: white;
    border: none;
    cursor: pointer;
  }
`

export default CardGuide
