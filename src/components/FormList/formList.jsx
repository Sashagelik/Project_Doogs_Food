import s from '../FormList/styles.module.css'


function FormList ({submitForm, title, children}) {

  return (
    <form onSubmit={submitForm} className={s.form}>
      <h1 className={s.title}>{title}</h1>
      {children}
    </form>
  )
}

export default FormList;
