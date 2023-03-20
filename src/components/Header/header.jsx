import s from './styles.module.css';
import cn from 'classnames';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { ReactComponent as Login } from '../Header/img/Login.svg';
import { UserContext } from '../../context/userContext';



function Header({ children, user, onUpdateUser, setActiveModal }) {


  const { isAuthentificated } = useContext(UserContext)
  const { favorites } = useContext(CardContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{ pathname: "/favorites", state: 'sfsdfsdf' }}>
              <FavoriteIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
          </div>
          {!isAuthentificated ? <Link className={cn(s.favoritesLink, "btn")} to={{ pathname: "/login", state: 'sfsdfsdf' }} onClick={() => setActiveModal(true)}>< Login /></Link> : <span style={{ cursor: "pointer" }} onClick={handleLogout} >Выйти</span>}
        </div>
      </div>
    </header>
  )
}

export default Header;
