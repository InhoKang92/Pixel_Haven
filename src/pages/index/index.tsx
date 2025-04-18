// import { useEffect } from "react";
import { useMemo, useState } from "react";
import styles from "./styles/index.module.scss";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonNav from "@/components/common/navigation/CommonNav";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import Card from "./components/Card";
// import axios from "axios";
import { CardDTO } from "./types/card";
import CommonFooter from "@/components/common/footer/CommonFooter";
import { imageData } from "@/jotaiStore/derivedAtoms/imageDataAtom";
import CommonDetailWindow from "@/components/common/detailWindow/CommonDetailWindow";
import { loadable } from "jotai/utils";
import { useAtomValue } from "jotai";
import Loading from "./components/Loading";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate()

  const [imgData, setImgData] = useState<CardDTO>();
  const [open, setOpen] = useState<boolean>(false)

  const imageDataAtom = loadable(imageData)

  // const getData = async () => {
  //   //unsplash 오픈 API 호출
  //   const API_URL = "https://api.unsplash.com/search/photos";
  //   const API_KEY = "kQ5AgBHi2sIWEZmbuiFyw2nlwPWBtk7Nsj1fFhNyqWk";
  //   const PER_PAGE = 30;

  //   const searchValue = "Korea";
  //   const pageValue = 1;

  //   try {
  //     const res = await axios.get(
  //       `${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`
  //     );
  //     console.log(res);
  //     if (res.status === 200) {
  //       setImgData(res.data.results);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);


  const imageLodableData = useAtomValue(imageDataAtom)
  const cardList = useMemo(()=>{
    // console.log(imageLodableData);
    if(imageLodableData.state === 'hasData'){
      const result = imageLodableData.data.data.results.map((card: CardDTO) => {
        return <Card data={card} key={card.id} handleDetailWindow={setOpen} handleSetImageData={setImgData}/>;
      });
      return result
    } else if(imageLodableData.state === 'loading'){
      return <Loading />
    } else if(imageLodableData.state === 'hasError'){
      return <div>에러 발생!</div>
    }
  }, [imageLodableData])

  // const cardList = imageDataAtom.data.results.map((card: CardDTO) => {
  //   return <Card data={card} key={card.id} handleDetailWindow={setOpen} handleSetImageData={setImgData}/>;
  // });

  const moveToBookmarkPage = ()=> {
    navigate('/bookmark')
  }

  return (
    <div className={styles.container}>
      {/* 헤더 UI 부분 */}
      <CommonHeader />

      <div className={styles.container__mainImgBox}>
        <img src="/src/assets/images/main-image.jpg" alt="" className={styles.container__mainImgBox__image} />
      </div>

      <div className={styles.container__navBlock}>
        {/* 네비게이션 */}
        <CommonNav />
        {/* 검색창 */}
        <CommonSearchBar />
        <div className={styles.container__navBlock__buttons}>
          <span className={styles.span}>inho4471@gmail.com</span>
          <button className={styles.bookmarkBtn} onClick={moveToBookmarkPage}><span className='material-symbols-outlined' style={{ fontSize: 16 + 'px', marginTop: 3 + 'px', marginRight: 1 + 'px'}}>favorite</span>BOOKMARK</button>
        </div>
      </div>
      <div className={styles.container__contents}>
        {cardList}
      </div>
      {/* 푸터 UI 부분 */}
      <CommonFooter />
      {open && <CommonDetailWindow data={imgData} handleDetailWindow={setOpen}/>}
    </div>
  );
}

export default index;
