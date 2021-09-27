import React from 'react'
import SelectComp, {
  StylesConfig,
  IndicatorProps,
  components,
  ValueType,
} from 'react-select'
import {css} from 'astroturf'
import DropdownIndicator from './DropdownIndicator'

type Option = {
  value: string
  label: string
}

type Props = {
  options: Option[]
  styles?: any
  label?: string
  handler?: (e: any) => void
  value?: ValueType<Option, false>
  classes?: {
    arrow?: string
  }
  disabled?: boolean
  componentsProp?: object
}

const selectStyles = (styles: any): StylesConfig<Option, false> => ({
  container: (provided) => ({
    ...provided,
    ...styles?.container,
  }),
  control: (provided) => ({
    ...provided,
    minHeight: 50,
    boxShadow: 'none',
    border: '1px solid #d8d8d8',
    ':hover': {
      border: '1px solid #d8d8d8',
    },
    ...styles?.control,
  }),
  placeholder: (provided) => ({
    ...provided,
    ...styles?.placeholder,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    padding: 17,
    ...styles?.indicatorsContainer,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
    ...styles?.indicatorSeparator,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '17px 18px 19px 18px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...styles?.valueContainer,
  }),
  singleValue: (provided) => ({
    ...provided,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 14,
    width: 'calc(100% - 60px)',
    ...styles?.singleValue,
  }),
  option: (provided) => ({
    ...provided,
    ...styles?.option,
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
    ...styles?.menu,
  }),
  menuList: (provided) => ({
    ...provided,
    ...styles?.menuList,
  }),
})

const Selector: React.FC<Props> = ({
  options,
  styles,
  label,
  classes,
  disabled,
  componentsProp,
  handler,
}) => (
  <div className={s.container}>
    {label && (
      <label htmlFor={label} className={s.label}>
        {label}
      </label>
    )}
    <SelectComp
      options={options}
      instanceId='1'
      styles={selectStyles(styles)}
      onChange={handler}
      components={
        componentsProp || {
          DropdownIndicator: (props: IndicatorProps<any, any>) => (
            <components.DropdownIndicator {...props}>
              <DropdownIndicator className={classes?.arrow} />
            </components.DropdownIndicator>
          ),
        }
      }
      isSearchable={false}
      defaultValue={options[0]}
      isDisabled={disabled}
    />
  </div>
)

const s = css`
  .container {
    width: 100%;
  }

  .label {
    display: block;
    margin-bottom: 9px;
    color: #7e7e7e;
    line-height: 18px;
  }
`
export default Selector
