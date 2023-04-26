import s from '../FAQ/styles.module.css';
import dataFAQ from '../../utils/faqData';
import Accordion from '../../components/Accordion/Accordion';


const FaqPage = () => {

  return (
    <div className={s.faq__wrapper}>
      <h1 className={s.title}>
        Часто спрашивают
      </h1>
      <div>
      </div>
      {dataFAQ.map((data, i) =>
        <Accordion key={i} title={data.title} >
          {data.content}
        </Accordion>)}
    </div>
  )


}

export default FaqPage;