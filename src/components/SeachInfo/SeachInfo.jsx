import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./styles.css";

export default function SeachInfo  ({searchText})  {

	const {cards} = useContext(CardContext);
	const searchCount = cards.length;

  const text = (searchCount) => {

    const n = searchCount % 10
    console.log(n);
    if (n === 1) {
      return "товар.";
    } else if (n > 1 && n < 5) {
      return "товара.";
    } else if (n > 4 || n === 0) {
      return "товаров.";
    }
  };

	return (
		searchText && <section className="search-title">
			По запросу <span>{`'${searchText}'`}</span>{searchCount === 1 ? ' найден':' найдено'} {searchCount} {text(searchCount)}
		</section>
	);
};


