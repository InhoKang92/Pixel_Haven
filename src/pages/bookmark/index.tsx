import CommonHeader from "@/components/common/header/CommonHeader";
import styles from "./styles/index.module.scss";
import CommonNav from "@/components/common/navigation/CommonNav";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { CardDTO } from "../index/types/card";
import { useNavigate } from "react-router-dom";

function index() {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const hoverShow = (data : CardDTO) => {
      const photoId = data.id
      document.getElementById(photoId).style.display = "flex"
    }

    const hoverHide = (data : CardDTO) => {
      const photoId = data.id
      document.getElementById(photoId).style.display = "none"
    }

    const removeBookmark = (data : CardDTO) => {
      const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"))
      if(getLocalStorage.findIndex((item : CardDTO) => item.id === data.id) > -1){
        const removeIndex = getLocalStorage.findIndex((item : CardDTO) => item.id === data.id)
        const res = [...getLocalStorage]
        res.splice(removeIndex, 1)
        localStorage.setItem("bookmark", JSON.stringify(res))
        getData()
      }
    }

    const getData = () => {
        const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"))
        if(getLocalStorage || getLocalStorage !== null){
            setData(getLocalStorage)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const moveToMainPage = () => {
        navigate("/")
    }

  return (
    <div className={styles.bookmarkPage}>
      {/* 헤더 UI 부분 */}
      <CommonHeader />

      <div className={styles.bookmarkPage__mainImgBox}>
        <img src="/src/assets/images/main-image.jpg" alt="" className={styles.bookmarkPage__mainImgBox__image} />
      </div>

      <div className={styles.bookmarkPage__navBlock}>
        {/* 네비게이션 */}
        <CommonNav />
        {/* 검색창 */}
        <CommonSearchBar />
        <div className={styles.bookmarkPage__navBlock__buttons}>
          <span className={styles.span}>inho4471@gmail.com</span>
          <button className={styles.bookmarkBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 + "px", marginTop: 3 + "px", marginRight: 1 + "px", fontVariationSettings: '"FILL" 1', color: 'white'}} > favorite </span> BOOKMARK
          </button>
        </div>
      </div>
      <div className={styles.bookmarkPage__contents}>
        {data.length === 0 ? (<div className={styles.bookmarkPage__contents__noData}>No bookmark data<span className={styles.moveToMain} onClick={moveToMainPage}>Explore photos</span></div>) : 
            data.map((item: CardDTO) => {
                return (
                  <div key={item.id} className={styles.bookmarkPage__contents__card} onMouseEnter={() => hoverShow(item)}  onMouseLeave={() => hoverHide(item)}>
                    <Card data={item}/>
                    <div className={styles.hoverBox} id={item.id}><button className={styles.hoverBox__button} onClick={() => removeBookmark(item)}>Remove from Bookmark</button></div>
                  </div>
                )
            })
        }
        </div>
      <footer className={styles.bookmarkPage__footer}></footer>
    </div>
  );
}

export default index;
