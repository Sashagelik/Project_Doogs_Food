import '../Modal/styles.css';
import cn from 'classnames'

const Modal = ({activeModal, children, setActiveModal}) => {
  return (
    <>
      <div className={cn('modal', { ['active']: activeModal })} onClick = {()=>setActiveModal(false)}>
        <div className={cn('modal_content', { ['active']: activeModal })} onClick= {(e)=>e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal;