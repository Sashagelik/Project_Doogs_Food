import s from '../Pagination/Pagination.module.css';

const Pagination = ({ totalCards, showCardsPage, paginate }) => {


  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCards / showCardsPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <ul className={s.pagination}>
        {
          pageNumbers.map((number) => {
            return <li key={number} className={s.pageItem}>
              <a onClick={() => paginate(number)} className={s.pageBtn} >{number}</a>
            </li>
          })
        }
      </ul>
    </>
  )

}

export default Pagination;