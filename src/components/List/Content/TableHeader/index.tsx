import React from 'react'
import classNames from 'classnames'
import Button from 'src/components/shared-ui/Button'
import Search from 'src/components/shared-ui/Search'
import { css } from 'astroturf'
import PopoverAddContact from 'src/components/shared-ui/popover/PopoverAddContact'

type Props = {
  className?: string
  list: List
}

const TableHeader: React.FC<Props> = ({ className, list }) => (
  <div className={classNames(className, s.container)}>
    <Search
      classes={{ container: s.search }}
      inputPlaceholder="Search contacts…"
    />
    <div className={s.actions}>
      <Button className={s.dots} variant="outlined">
        •••
      </Button>
      <PopoverAddContact className={s.contacts} list={list} />
      <Button className={s.send} variant="outlined">
        Send list
      </Button>
    </div>
  </div>
)

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 21px 23px 23px 30px;

    @include mobile {
      padding: 16px 12px;

      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }

  .actions {
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;

    @include mobile {
      width: 100%;
      margin-top: 20px;
    }
  }

  .search {
    max-width: 291px;
    width: 100%;
  }

  .dots {
    margin-left: auto;
    max-width: 61px;
    width: 100%;

    @include mobile {
      margin-left: 0;
    }
  }

  .contacts {
    max-width: 136px;
    width: 100%;
    margin-left: 14px;

    @include mobile {
      margin-left: 3px;
    }
  }

  .send {
    max-width: 136px;
    width: 100%;
    margin-left: 14px;

    @include mobile {
      margin-left: 3px;
    }
  }
`

export default TableHeader
