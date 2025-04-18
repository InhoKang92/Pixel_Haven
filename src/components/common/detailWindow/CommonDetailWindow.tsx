import { CardDTO } from '@/pages/index/types/card'
import styles from './CommonDetailWindow.module.scss'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    data: CardDTO
    handleDetailWindow : (eventValue: boolean) => void
}

function CommonDetailWindow({data, handleDetailWindow} : Props) {
    const [bookmark, setBookmark] = useState(false)

    const closeDetailWindow = () => {
        handleDetailWindow(false)
    }

    const addBookmark = (data : CardDTO) => {
        setBookmark(true)

        const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"))
        if(!getLocalStorage || getLocalStorage === null){
            localStorage.setItem("bookmark", JSON.stringify([data]))
            toast.success("해당 이미지를 북마크에 저장하였습니다.😄")
        } else {
            if(getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1){
                toast.error("해당 이미지는 이미 북마크에 추가되어 있습니다.❌")
            }else {
                const res = [...getLocalStorage]
                res.push(data)
                localStorage.setItem("bookmark", JSON.stringify(res))
                toast.success("해당 이미지를 북마크에 저장하였습니다.😄")
            }
        }
    }

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"))

        if(getLocalStorage && getLocalStorage.findIndex((item : CardDTO) => item.id === data.id) > -1){
            setBookmark(true)
        } else if(!getLocalStorage){
            return
        }

        const escCloseDetailWindow = (event: KeyboardEvent) => {
            if(event.key === "Escape"){
                console.log("함수 호출")
                closeDetailWindow()
            }
        }
        //이벤트 등록
        document.addEventListener("keydown", escCloseDetailWindow)
        //이벤트 해제
        return () => {
            document.removeEventListener("keydown", escCloseDetailWindow)
        }
    }, [])

  return (
    <div className={styles.container}>
        <div className={styles.container__detail}>
            <div className={styles.container__detail__header}>
                <div className={styles.detailTopLeft}>
                    <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.detailTopLeft__authorImage} />
                    <span className={styles.detailTopLeft__authorName}>{data.user.name}</span>
                </div>
                <div className={styles.detailTopRight}>
                    {bookmark === true ? 
                        (<button className={styles.detailTopRight__bookmarkBtnActive} onClick={()=>addBookmark(data)}>
                            {/* 구글 아이콘 사용 */}
                            <span className='material-symbols-outlined' style={{ fontSize: 16 + 'px', marginTop: 3 + 'px', marginRight: 1 + 'px', fontVariationSettings: '"FILL" 1', color: 'white'}}>favorite</span>Bookmark
                        </button>) : 
                        (<button className={styles.detailTopRight__bookmarkBtn} onClick={()=>addBookmark(data)}>
                            {/* 구글 아이콘 사용 */}
                            <span className='material-symbols-outlined' style={{ fontSize: 16 + 'px', marginTop: 3 + 'px', marginRight: 1 + 'px', fontVariationSettings: '"FILL" 1'}}>favorite</span>Bookmark
                        </button>)
                    }
                    
                    <button className={styles.detailTopRight__downloadBtn}>Download</button>
                    <button className={styles.detailTopRight__closeBtn} onClick={closeDetailWindow}>
                        {/* 구글 아이콘 사용 */}
                        <span className='material-symbols-outlined' style={{ fontSize: 28 + 'px'}}>close</span>
                    </button>
                </div>
            </div>
            <div className={styles.container__detail__body}>
                <img src={data.urls.small} alt="상세이미지" className={styles.image} />
            </div>
            <div className={styles.container__detail__footer}>
                <div className={styles.infoBox}>
                    <span className={styles.infoBox__label}>Image Size</span>
                    <span className={styles.infoBox__value}>{data.width} X {data.height}</span>
                </div>
                <div className={styles.infoBox}>
                    <span className={styles.infoBox__label}>Uploaded At</span>
                    <span className={styles.infoBox__value}>{data.created_at.split("T")[0]}</span>
                </div>
                <div className={styles.infoBox}>
                    <span className={styles.infoBox__label}>Updated At</span>
                    <span className={styles.infoBox__value}>{data.updated_at.split("T")[0]}</span>
                </div>
                <div className={styles.infoBox}>
                    <span className={styles.infoBox__label}>Downloaded</span>
                    <span className={styles.infoBox__value}>{data.likes}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommonDetailWindow