import cn from "classnames";
import "./styles.css";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";

const Sort = ({ currentSort, tabs = [], onChangeSort }) => {

  const { debounceSearchQuery } = useContext(CardContext)

  const handleClick = (e, tab) => {
    e.preventDefault();
    onChangeSort(tab.id)
  }
  return (!debounceSearchQuery &&
    <div className="sort content__sort">
      {tabs.map(tab => (<div className={cn("sort__link", { "sort__link_selected": currentSort === tab.id })} key={tab.id} id={tab.id}>
        <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
      </div>
      ))}
    </div>
  )
};

export default Sort;
