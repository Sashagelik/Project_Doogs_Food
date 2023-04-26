import { useCallback, useContext, useState } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";
import { tabs } from "../../utils/product";
import Pagination from "../../components/Pagination/Pagination";
import { Button } from "antd";




export const CatalogPage = () => {

  const { cards } = useContext(CardContext);
  const { setSelectedTabId } = useContext(SortContext);
  const [currentPage, setCurrentPage] = useState(1)
  const [ showCardsPage] = useState(12)

  const lastCardsIndex = currentPage * showCardsPage;

  const firstCardsIndex = lastCardsIndex - showCardsPage;

  const currentCardPages = cards.slice(firstCardsIndex, lastCardsIndex);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber)
  }, [])

  const nextPage = () => {
    return setCurrentPage(prevState => prevState + 1 )
  }
  const prevPage = () => {
    return setCurrentPage(prevState => prevState - 1 )
  }

  return (
    <>
      <Sort tabs={tabs} currentSort={setSelectedTabId} onChangeSort={tabid => { return setSelectedTabId(tabid) }} />
      <div className='content__cards'>
        <CardList cards={currentCardPages} />
      </div>
      <Pagination paginate={paginate} totalCards={cards.length} showCardsPage={showCardsPage} />
      <div style={{ display: 'flex', gap: '1rem', justifyContent:'center' }}>
        <Button onClick={prevPage}>Предыдущая страница</Button>
        <Button onClick={nextPage}>Следущая страница</Button>
      </div>

    </>
  )
}