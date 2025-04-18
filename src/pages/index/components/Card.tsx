import { CardDTO } from "../types/card";
import styles from "./Card.module.scss";

interface Props {
  data: CardDTO;
  handleDetailWindow: (eventValue : boolean) => void
  handleSetImageData: (eventValue : CardDTO) => void
}

function Card({data, handleDetailWindow, handleSetImageData}: Props) {
  const openDetailWindow = () => {
    handleDetailWindow(true)
    handleSetImageData(data)
  };

  return (
    <div className={styles.card} onClick={openDetailWindow}>
      <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} />
    </div>
  );
}

export default Card;
