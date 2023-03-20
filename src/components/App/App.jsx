import { useState, useEffect, useCallback } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './styles.css';
import SeachInfo from '../SeachInfo/SeachInfo';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import { SortContext } from '../../context/sortContext';
import FormList from '../FormList/formList';
import RegistrationForm from '../FormList/RegistrationForm';
import Modal from '../Modal/Modal';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import ResetPassword from '../Auth/ResetPassword/ResetPassword';


export default function App() {
  
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState('')
  const [formData, setFormData] = useState([])
  const [activeModal, setActiveModal] = useState(false)
  const [isAuthentificated, setIsAuthentificated] = useState(false)



  const navigate = useNavigate()

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id));
        setFavorites(prevSate => favoriteProducts)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [isAuthentificated])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])

  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const authPath = ['/resetPassword', '/register']
    if (token) {
      return setIsAuthentificated(true)
    } else if (!authPath.includes(location.pathname)) {
      navigate('/login')
    }

  }, [navigate])

  return (
    <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      <UserContext.Provider value={{ user: currentUser, isLoading, isAuthentificated }}>
        <CardContext.Provider value={{ cards, favorites, handleLike: handleProductLike }}>
          <Header setActiveModal={setActiveModal}>
            <Logo className="logo logo_place_header" href="/" />
            <Routes>
              <Route path='/' element={<Search onSubmit={handleFormSubmit} onInput={handleInputChange} />} />
            </Routes>
          </Header>
          {isAuthentificated ? <main className='content container'>
            <SeachInfo searchText={searchQuery} />
            <Routes>
              <Route index element={<CatalogPage />} />
              <Route path='/product/:productId' element={<ProductPage isLoading={isLoading} />} />
              <Route path='/favorites' element={<FavoritePage />} />
              <Route path='/login'
                element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <Login setActiveModal={setActiveModal} />
                  </Modal>}>
              </Route>
              <Route path='/register'
                element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <Register setActiveModal={setActiveModal} />
                  </Modal>}>
              </Route>
              <Route path='/resetPassword'
                element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <ResetPassword setActiveModal={setActiveModal} />
                  </Modal>}>
              </Route>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Routes>
            </Routes>
          </main> : <h2 className='not__auth'>Пожалуйста авторизуйтесь!
            <Routes>
              <Route path='/login'
                element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <Login setActiveModal={setActiveModal} />
                  </Modal>}>
              </Route>
              <Route path='/register'
                element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <Register setActiveModal={setActiveModal} />
                  </Modal>}>
              </Route>
              <Route path='/resetPassword'
                element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <ResetPassword setActiveModal={setActiveModal} />
                  </Modal>}>
              </Route>
            </Routes>
          </h2>}
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </SortContext.Provider>
  )
}

