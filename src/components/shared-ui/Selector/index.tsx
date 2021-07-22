import React from 'react'
import SelectComp, {
  components,
  StylesConfig,
  IndicatorProps,
} from 'react-select'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Option = {
  value: string
  label: string
};

type Props = {
  options: Option[]
  styles?: any
  label?: string
};

const selectStyles = (styles: any): StylesConfig<Option, false> => ({
  container: (provided) => ({
    ...provided,
    ...styles?.container,
  }),
  control: (provided, state) => ({
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
});

const Selector: React.FC<Props> = ({options, styles, label}) => {
  // eslint-disable-next-line
  const DropdownIndicator = (props: IndicatorProps<any, any>) => (
    <components.DropdownIndicator {...props}>
      <SvgIcon className={s.arrow} icon='arrow-selector.svg' />
    </components.DropdownIndicator>
  );

  return (
    <div className={s.container}>
      {label && (
        <label className={s.label}>
          {label}
        </label>
      )}
      <SelectComp
        options={options}
        instanceId='1'
        styles={selectStyles(styles)}
        components={{DropdownIndicator}}
        isSearchable={false}
        defaultValue={options[0]}
      />
    </div>
  );
};

const s = css`
  .container {
    width: 100%;
  }
  
  .arrow {
    width: 11px;
    height: 11px;
  }

  .label {
    display: block;
    margin-bottom: 9px;
    color: #7e7e7e;
    line-height: 18px;
  }
`
export default Selector;
