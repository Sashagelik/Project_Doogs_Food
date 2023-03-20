import s from './styles.module.css';
import cn from 'classnames';
import { ReactComponent as Save } from './img/save.svg';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import { calcDiscountPrice, isLiked, createMarkup } from '../../utils/product';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { ContentHeader } from '../ContentHeader/content-header';
import Raiting from '../Reiting/Raiting';
import api from '../../utils/api';
import FormList from '../FormList/formList';
import { useForm } from 'react-hook-form';

export const Product = ({ onSendReview, onProductLike, pictures, likes = [], reviews, tags, name, price, discount, description, wight, _id }) => {
  console.log(wight);

  const { user: currentUser } = useContext(UserContext);
  const [raiting, setRaiting] = useState(2)
  const [currentRating, setCurrentRating] = useState(0)
  const [reviewsProduct, setReviewsProduct] = useState(reviews ?? [])
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const discount_price = calcDiscountPrice(price, discount);
  const isLike = isLiked(likes, currentUser?._id);
  const desctiptionHTML = createMarkup(description);


  useEffect(() => {
    if (!reviews) return;
    const ratAcc = reviews.reduce((acc, el) => acc = acc + el.rating, 0)
    const accumRaiting = (Math.floor(ratAcc / reviews.length))
    setRaiting(accumRaiting)
    setCurrentRating(accumRaiting)
  }, [reviews?.length])

  useEffect(() => {
    api.getUserGroup().then(data => setUsers(data))
  }, [])

  const getUser = (id) => {
    if (!users.length) {
      return "User"
    }
    const user = users.find(e => e._id === id)

    return user?.name ?? "not_User"
  }

  const sendReview = async (data) => {
    const newProduct = await api.createReviewProduct(_id, { text: data.review })
    setReviewsProduct([...newProduct.reviews])
    onSendReview(newProduct)
    setShowForm(false)
    console.log(data)
  }

  const textRegister = register("review", { required: false })

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <>
      <ContentHeader title={name}>
        <div className={s.reitInfo}>
          <span>Артикул: <b>2388907</b></span>
          <Raiting raiting={raiting} setRaiting={setRaiting} currentRating={currentRating} />
          <span>{reviews?.length} {reviews.length > 4 ? 'отзывов' : 'отзыва'}</span>
        </div>
      </ContentHeader>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>{price}&nbsp;₽</span>
          {discount !== 0 && <span className={cn(s.price, 'card__price_type_discount')}>{discount_price}&nbsp;₽</span>}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href="/#" className={cn('btn', 'btn_type_primary', s.cart)}>В корзину</a>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLike })} onClick={onProductLike}>
            <Save />
            <span>{isLike ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Гарантия качества</h3>
              <p className={s.text}>
                Если Вам не понравилось качество нашей продукции, мы вернем деньги,
                либо сделаем все возможное, чтобы удовлетворить ваши нужды.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} dangerouslySetInnerHTML={desctiptionHTML}></p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
        <div>
          <button className='btn' onClick={() => setShowForm(true)}>Написать отзыв</button>
          {showForm && <div>
            <FormList submitForm={handleSubmit(sendReview)}>
              <textarea cols="120" rows="5"
                className={s.textarea}
                {...textRegister}
              />
              <button className={cn(s.btnSubmit, 'btn')} type='submit'>Отправить отзыв</button>
            </FormList>
           
          </div>} 
          <h3>Отзывы покупателей:</h3>
          {reviewsProduct.map((item) => {
            return (
              <div className={s.reviews} key={item._id}>
                <div className={s.author}>
                  <div>
                    <span>{getUser(item.author)}</span>
                    <span className={s.data}> {new Date(item.created_at).toLocaleDateString('ru', options).slice(0, -2)}</span>
                  </div>
                  <Raiting raiting={item.rating} isEditable={false} />
                </div>
                <div className={s.text}>
                  <span>
                    {item.text}
                  </span>
                  <hr />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}