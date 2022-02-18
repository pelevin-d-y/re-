/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  indeterminate?: boolean
}

const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
  const targetRef = useRef()

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

const Checkbox: React.FC<Props> = forwardRef(
  ({ className, indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = useRef(null)
    const combinedRef = useCombinedRefs(ref, defaultRef)

    useEffect(() => {
      combinedRef.current.indeterminate = indeterminate ?? false
    }, [combinedRef, indeterminate])

    return (
      <label className={classNames(className, s.container)}>
        <input
          className={s.input}
          type="checkbox"
          ref={combinedRef}
          {...rest}
        />
        <SvgIcon className={s.icon} icon="check.svg" />
      </label>
    )
  }
)

const s = css`
  .container {
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;
    justify-content: center;
    align-items: center;
    max-width: 18px;
    height: 18px;

    cursor: pointer;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
  }

  .input {
    display: none;
  }

  .input:checked ~ .icon {
    opacity: 1;
  }

  .input ~ .icon {
    opacity: 0;
  }

  .icon {
    width: 90%;
    transition: all 0.2s linear;
    color: var(--primary1);
  }
`

export default Checkbox
