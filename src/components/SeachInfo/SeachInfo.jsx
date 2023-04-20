import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./styles.css";
import { text } from "../../utils/product";

export default function SeachInfo({ searchText }) {

  const { cards } = useContext(CardContext);
  const searchCount = cards.length;



  return (
    searchText && <section className="search-title">
      По запросу <span>{`'${searchText}'`}</span>{searchCount === 1 ? ' найден' : ' найдено'} {searchCount} {text(searchCount)}
    </section>
  );
};


