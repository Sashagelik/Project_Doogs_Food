import { useState } from "react";
import cn from 'classnames';
import s from '../Accordion/styles.module.css'

const Accordion = ({ title, children }) => {


  const [selected, setSelected] = useState(false)

  const toggleState = () => {
    setSelected(state => !state)
  }

  return (
    <div className={cn(s.accordion, { [s.active]: selected })}>
      <button className={cn(s.accordionButton)} onClick={() => toggleState()}>
        <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>
          {children}
        </p>
      </div>
    </div>
  )
}

export default Accordion;