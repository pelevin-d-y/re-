import { components } from 'react-select'
import { css } from 'astroturf'
import classNames from 'classnames'
import SvgIcon from '../SvgIcon'

type SelectOptionType = {
  data?: any
}

const SelectOption: React.FC<SelectOptionType> = ({ data }) => (
  <components.Option
    {...data}
    className={classNames(s.root, data?.isSelected && s.selectedRoot)}
  >
    <div className={s.optionContainer}>
      <SvgIcon
        className={classNames(s.check, data?.isSelected && s.checkVisible)}
        icon="check.svg"
      />
      <div className={s.option}>{data.children}</div>
    </div>
  </components.Option>
)

const s = css`
  .root {
    padding: 0 !important;
    &:hover {
      background: transparent !important;
    }
    &:active {
      background: transparent !important;
    }
  }

  .selectedRoot {
    background: white !important;
    color: black !important;
  }

  .optionContainer {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .option {
    border-bottom: 1px solid #f6f6f6;
    padding: 10px 0;
    font-size: 11px;
    line-height: 13px;
    text-transform: capitalize;
  }

  .check {
    width: 12px;
    height: 12px;
    color: var(--blue);
    margin-right: 7px;
    opacity: 0;
  }

  .checkVisible {
    opacity: 1;
  }
`

export default SelectOption
