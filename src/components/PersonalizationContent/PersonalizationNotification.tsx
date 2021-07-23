import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Checkbox from 'src/components/shared-ui/Checkbox'

type Props = {
  className?: string
}

const Notification: React.FC<Props> = ({ className }) => {
  const checkHandler = (isChecked: boolean) => {
    console.log(isChecked)
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.section}>
        <div className={s.label}>Send my notifications to:</div>
        <div className={s.row}>
          <Checkbox className={s.checkboxRow} handler={checkHandler}>
            <span className={s.text}>Email</span>
          </Checkbox>
          <Checkbox className={s.checkboxRow} handler={checkHandler}>
            <span className={s.text}>Browser</span>
          </Checkbox>
          <Checkbox className={s.checkboxRow} handler={checkHandler}>
            <span className={s.text}>Mobile</span>
          </Checkbox>
        </div>
      </div>
      <div className={s.section}>
        <div className={s.label}>Alerts & Notifications</div>
        <div className={s.col}>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>Recommendations</span>
          </Checkbox>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>Account Activity</span>
          </Checkbox>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>Strata Communication</span>
          </Checkbox>
        </div>
      </div>
      <div className={classNames(s.section, s.lastSection)}>
        <div className={s.label}>Account Activity</div>
        <div className={s.col}>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>
              When my weekly recommendations are ready
            </span>
          </Checkbox>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>When a contact changes profile info</span>
          </Checkbox>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>When my urgent tasks exceeds 2 weeks</span>
          </Checkbox>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>
              When my todo tasks come close to deadline
            </span>
          </Checkbox>
          <Checkbox className={s.checkboxCol} handler={checkHandler}>
            <span className={s.text}>
              When spotlight has an urgent task for me
            </span>
          </Checkbox>
        </div>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .section {
    margin-bottom: 26px;
  }
  .lastSection {
    margin-bottom: 0;
  }
  .label {
    margin-bottom: 13px;
    font-size: 14px;
    line-height: 18px;
    color: #7e7e7e;
  }
  .row {
    display: flex;
  }
  .col {
    display: flex;
    flex-direction: column;
  }
  .checkboxRow {
    display: flex;
    margin-right: 29px;
  }
  .checkboxCol {
    display: flex;
    margin-bottom: 11px;
  }
  .text {
    margin-left: 19px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
`

export default Notification
