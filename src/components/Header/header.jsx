import s from './styles.module.css';
import cn from 'classnames';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { ReactComponent as LoginIcon } from '../Header/img/Login.svg';
import { UserContext } from '../../context/userContext';
import { ReactComponent as Profile } from '../Profile/image/Profile.svg'


function Header({ children, user, onUpdateUser, setActiveModal }) {


  const { isAuthentificated } = useContext(UserContext)
  const { favorites } = useContext(CardContext)

  const navigate = useNavigate()

 
  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{ pathname: "/favorites", state: 'favorites_icon' }}>
              <FavoriteIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
          </div>
          {!isAuthentificated ? <Link className={cn(s.favoritesLink, "btn")} to={"/login"} onClick={() => setActiveModal(true)}><LoginIcon /></Link>
            : <Link className={cn(s.favoritesLink, "btn")} to={"/profile"} onClick={() => setActiveModal(true)}><Profile /></Link> }
        </div>
      </div>
    </header>
  )
}

export default Header;
