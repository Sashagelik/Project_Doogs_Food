import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SortContext } from '../../context/sortContext';
import { UserContext } from '../../context/userContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './styles.css';

const CardList = ({ cards }) => {

  const navigate = useNavigate();
  const { isLoading } = useContext(UserContext)
  const { selectedTabId } = useContext(SortContext)

  return (
    <>
      {!cards.length && !isLoading && <NotFound buttonText='Назад' title="Простите ничего не найдено" buttonAction={() => navigate(-1)} />}
      <div className='cards'>
        {cards.sort((a, b) => {
          switch (selectedTabId) {
            case "cheap":
              return (a.price - a.discount) - (b.price - b.discount)
            case "low":
              return (b.price - b.discount) - (a.price - a.discount)
            case "sale":
              return b.discount - a.discount
          }
        })
          .map((item) => <Card key={item._id} {...item} />)}
      </div>
    </>
  )
};

export default CardList;
