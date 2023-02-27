import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";

const tabs = [
  {
    id: "cheap",
    title: "Сначала дешёвые",
  },
  {
    id: "low",
    title: "Сначала дорогие",
  },
  {
    id: "sale",
    title: "По скидке",
  },
];

export const CatalogPage = () => {
    const {cards} = useContext(CardContext);
    const {setSelectedTabId} = useContext(SortContext);
    return (
        <>
            <Sort tabs={tabs} currentSort={setSelectedTabId} onChangeSort = {tabid=>{return setSelectedTabId(tabid)}} />
            <div className='content__cards'>
                <CardList cards={cards}/>
            </div>
        </>
    )
}