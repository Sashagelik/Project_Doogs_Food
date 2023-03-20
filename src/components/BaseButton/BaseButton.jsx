import s from '../BaseButton/styles.module.css'
import cn from 'classnames'

const BaseButton = ({children, color, ...props}) => {

  return(
    <button {...props} className={ cn(s.btn, s[color]) }>{children}</button>
  )
}

export default BaseButton;