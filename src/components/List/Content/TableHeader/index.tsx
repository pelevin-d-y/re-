import React from 'react'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Search from 'src/components/shared-ui/Search'
import { css } from 'astroturf'

type Props = {
  className?: string
}

const TableHeader: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Search className={s.search} inputPlaceholder="Search contacts…" />
    <Button className={s.dots} variant="outlined">
      •••
    </Button>
    <Button className={s.contacts} variant="outlined">
      + Add contact
    </Button>
    <Button className={s.send} variant="outlined">
      Send list
    </Button>
  </div>
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 21px 23px 23px 30px;
  }

  .search {
    max-width: 291px;
    width: 100%;
  }

  .dots {
    margin-left: auto;
    max-width: 61px;
    width: 100%;
  }

  .contacts {
    max-width: 136px;
    width: 100%;
    margin-left: 14px;
  }

  .send {
    max-width: 136px;
    width: 100%;
    margin-left: 14px;
  }
`

export default TableHeader
