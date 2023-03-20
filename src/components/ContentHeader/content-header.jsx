import { useNavigate } from 'react-router-dom';
import Reiting from '../Reiting/Raiting';
import s from './styles.module.css';


export const ContentHeader = ({ title, children }) => {

  const navigate = useNavigate();

  return (
    <div>
      <a href="#" className={s.buttonBack} onClick={() => navigate(-1)}>{'<'} Назад</a>
      <h1 className={s.title}>{title}</h1>
      {children}
    </div>
  )
} 