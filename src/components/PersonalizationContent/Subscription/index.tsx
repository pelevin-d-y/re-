import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Grid from 'src/components/shared-ui/CardGrid'
import Card from './Card'

type Props = {
  className?: string
}

const PersonalizationSubscription: React.FC<Props> = ({ className }) => (
  <Grid division={2} gap="18px" className={classNames(className, s.container)}>
    <Card
      classes={{ container: s.cardBasic, button: s.basicButton }}
      description="Free subscription"
      title="Basic"
      img="subscription-basic.png"
      features={[
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
      ]}
      buttonText="Current Plan"
    />
    <Card
      classes={{ container: s.cardPremium, button: s.premiumButton }}
      description="$79.99/Month"
      title="Premium"
      img="subscription-premium.png"
      features={[
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
      ]}
      buttonText="Unlock Premium"
    />
  </Grid>
)

const s = css`
  .container {
  }

  .cardBasic {
    background: linear-gradient(90deg, #000000 0%, #383838 100%);
  }

  .cardPremium {
    background: linear-gradient(110.12deg, #0041c2 -4.15%, #6b389e 105.58%);
  }

  .basicButton {
    background: var(--bold);
  }

  .premiumButton {
    background: var(--blue);
  }
`

export default PersonalizationSubscription
