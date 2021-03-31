import React from 'react'
import SelectComp, {
  components,
  StylesConfig,
  IndicatorProps,
} from 'react-select'
import InputArrow from 'public/svg/inputArrow.svg'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
}

const selectStyles: StylesConfig<Option, false> = {
  container: (provided) => ({
    ...provided,
    maxWidth: '140px',
    width: '100%',
    borderRadius: '16px',
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '32px',
    backgroundColor: '#1966FF',
    borderRadius: '16px',
    borderColor: '#1966FF',
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#ffffff',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  valueContainer: (provided) => ({
    ...provided,
    justifyContent: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontWeight: 500,
    color: '#ffffff',
    fontSize: '12px',
  }),
  option: (provided) => ({
    ...provided,
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 20,
  }),
}

const Select: React.FC<Props> = ({ options }) => {
  // eslint-disable-next-line
  const DropdownIndicator = (props: IndicatorProps<any, any>) => (
    <components.DropdownIndicator {...props}>
      <InputArrow />
    </components.DropdownIndicator>
  )

  return (
    <SelectComp
      options={options}
      instanceId="1"
      styles={selectStyles}
      components={{ DropdownIndicator }}
      isSearchable={false}
      defaultValue={options[0]}
    />
  )
}

export default Select
