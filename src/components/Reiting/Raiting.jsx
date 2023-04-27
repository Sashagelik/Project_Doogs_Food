import { useCallback, useEffect, useState } from "react";
import { ReactComponent as Star } from '../../components/Reiting/img/star.svg';
import cn from "classnames";
import s from '../Reiting/styles.module.css';


const Raiting = ({ raiting, setRaiting, isEditable = false }) => {


  //Создаем массив из пяти реакт-фрагментов, чтобы потом полoжить в них svg
  const emptyFragment = new Array(5).fill(<> </>)

  const [raitingArr, setRaitingArr] = useState(emptyFragment)


  const changeDisplay = useCallback((raiting) => {
    if (isEditable) {
      construcRaiting(raiting)
    }
  }, [raiting])

  // Отображает (закрашивает по нажатию на событие OnClick) рейтинг
  const changeRating = (rate) => {

    if (!isEditable) return
    setRaiting(rate)
  }

  const construcRaiting = useCallback((assignedRating) => {

    const newArrayRaiting = raitingArr.map((item, i) =>
      <Star className={cn(s.star, { [s.filled]: i < assignedRating, [s.editable]: isEditable })}
        onMouseEnter={() => changeDisplay(i + 1)}
        onMouseLeave={() => changeDisplay(raiting)}
        onClick={() => changeRating(i + 1)}
      />)
    setRaitingArr(newArrayRaiting)
  }, [isEditable, raiting])

  useEffect(() => {
    construcRaiting(raiting)
  }, [construcRaiting, raiting])

  return (
    <div style={{textAlign:'end'}}>
      {raitingArr.map((e, i) => <span key={i}>{e}</span>)}
    </div>
  )
}
export default Raiting;