export const isLiked = (likes, userId) => likes.some(id => id === userId);

export const calcDiscountPrice = (price, discount) => {
    return Math.round(price - price * discount / 100);
 }
 
export const createMarkup = (textToHtml) => {
    return {__html: textToHtml}
} 

export const text = (searchCount) => {
  const n = searchCount % 10
  if (n === 1) {
    return "товар.";
  } else if (n > 1 && n < 5) {
    return "товара.";
  } else if (n > 4 || n === 0) {
    return "товаров.";
  }
};

export const tabs = [
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