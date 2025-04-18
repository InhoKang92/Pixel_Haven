import { useAtom, useAtomValue } from 'jotai'
import styles from './CommonFooter.module.scss'
import { imageData } from '@/jotaiStore/derivedAtoms/imageDataAtom'
import { pageAtom } from '@/jotaiStore/primitiveAtoms/pageAtom'
import { useEffect, useState } from 'react'
import { searchAtom } from '@/jotaiStore/primitiveAtoms/searchAtom'

function CommonFooter() {
  const images = useAtomValue(imageData)
  const [page, setPage] = useAtom(pageAtom)
  const [step, setStep] = useState(0)
  const search = useAtomValue(searchAtom)

  useEffect(() => {
    setStep(0)
  }, [search])

  const newArr : number[] = new Array()
  for(let i = 1; i <= images.data.total_pages; i++){
    newArr.push(i)
    //이 배열에는 1부터 334까지의 정수가 들어있다
  }

  const length = newArr.length //length = 334, length/10 = 33.4, length%10 = 4
  // 전체 페이지 수를 10으로 나눈 몫의 소숫점 아래를 버린 값 + 전체 페이지 수를 10으로 나눈 나머지가 있으면 1 없으면 0
  // 페이지네이션의 한 페이지에 페이지가 10개씩 출력되는데 그게 여기에서는 총 34개가 된다
  const divide = Math.floor(length / 10) + (length % 10 > 0 ? 1 : 0)
  const res = []

  for(let i = 0; i<divide; i++){
    res.push(newArr.splice(0, 10))
    //res[0] = [1,2,3,4,5,6,7,8,9,10]
    //res[1] = [11,12,13,14,15,16,17,18,19,20]
    //res[2] = [21,22,23,24,25,26,27,28,29,30] ...
  }

  const moveToPage = (selectedPage : number) => {
    setPage(selectedPage)
  }

  const moveToPrev = () => {
    setStep(step - 1)
    setPage(res[step - 1][0])
  }

  const moveToNext = () => {
    setStep(step + 1)
    setPage(res[step + 1][0])
  }

  return (
    <footer className={styles.footer}>
        <div className={styles.footer__pagination}>
            {step === 0 ? <button style={{display : 'none'}}></button> : 
              <button className={styles.footer__pagination__button} onClick={moveToPrev}>
                <span className='material-symbols-outlined' style={{ fontSize: 16 + 'px' }}>arrow_back_ios_new</span>
              </button>
            }

            {res[step] && 
                res[step].map((item : number, index : number) => {
                  // step이 0일 때, 각각의 item은 1 부터 10까지의 정수
                  // step이 1일 때, 각각의 item은 11 부터 20까지의 정수
                  if(item<11){
                    //step이 0일 때
                    return (
                      <button className={index === page - 1 ? `${styles.footer__pagination__number} ${styles.active}` : `${styles.footer__pagination__number}`} key={item} onClick={()=>moveToPage(item)}>{item}</button>
                    )
                  } else {
                    //step이 1 이상일 때
                    return (
                      <button className={index === page - 1 - step * 10? `${styles.footer__pagination__number} ${styles.active}` : `${styles.footer__pagination__number}`} key={item} onClick={()=>moveToPage(item)}>{item}</button>
                    )
                  }
              })}

            {step === divide - 2 ? <button style={{display : 'none'}}></button> : 
              <button className={styles.footer__pagination__button} onClick={moveToNext}>
                <span className='material-symbols-outlined' style={{ fontSize: 16 + 'px' }}>arrow_forward_ios</span>
              </button>
            }
            
        </div>
    </footer>
  )
}

export default CommonFooter