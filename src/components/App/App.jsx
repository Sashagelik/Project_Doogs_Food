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
import Modal from '../Modal/Modal';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import ResetPassword from '../Auth/ResetPassword/ResetPassword';
import Profile from '../Profile/Profile';
import FaqPage from '../../pages/FAQ/FaqPage';
import openNotification from '../Notification/Notification';


export default function App() {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState('')
  const [activeModal, setActiveModal] = useState(false)
  const [isAuthentificated, setIsAuthentificated] = useState(false)

  //Функция которая фильтрует продукты по ключу autor и выдает только мои товары 
  // products - отобразятся все товары без фильтра
  const filtredCards = (products, id) => products/*.filter((item) => item.author._id === id)*/

  const navigate = useNavigate()

  // функция которая принимает один аргумент searchQuery которая является поисковой
  // строкой запроса, отправляем запрос при вводе в поисковую строку а далее фильтруем   
  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(filtredCards(searchResult, currentUser?._id))
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])


  // хук-функция выполняется в том случае если пользователь авторизован
  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(filtredCards(productsData.products, userData._id));
        //фильтруем и отображаем товары которые лайкнули и добавили в избранное
        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id));
        setFavorites((prevSate) => favoriteProducts)
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
  // Функция по нажатию и отжатию лайка
  const handleProductLike = useCallback((product) => {
    //Функция isLiked принимает на вход два аргумента (объект продукта и текущего пользователя) 
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
        setCards(filtredCards(newProducts, currentUser._id));
        return updateCard;
      })
  }, [currentUser, cards])

  //Функция удаления продукта
  const onProductDelete = async (id) => {
    try {
      await api.deleteProduct(id)
      setCards((prevState) => prevState.filter(item => item._id !== id))
      openNotification('success','Успешно', 'Продукт удален')
    } catch (error) {
      openNotification('error','Ошибка', 'Не удалость удалить продукт')
    }
  }

  const location = useLocation()


  useEffect(() => {
    const token = localStorage.getItem('token')
    const authPath = ['/resetPassword', '/register']
    // Если есть токен значит нужно засетить переменную isAuthentificated
    if (token) {
      return setIsAuthentificated(true)
    } else if (!authPath.includes(location.pathname)) {
      navigate('/login')
    }

  }, [navigate, location.pathname])



  return (
    <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      <UserContext.Provider value={{ user: currentUser, isLoading, isAuthentificated, setCurrentUser }}>
        <CardContext.Provider value={{ cards, favorites, handleLike: handleProductLike, onProductDelete }}>
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
              <Route path='/profile' element={<Profile />} />
              <Route path='/faq' element={<FaqPage />} />
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
          </main> :
            <h2 className='not__auth'>Пожалуйста авторизуйтесь!
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

