import { COLLECTIONS } from '@/constants/collection'
import { CARD_LIST } from '@mock/card'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

export default function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    CARD_LIST.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })

    await batch.commit()

    alert('카드 리스트가 추가되었습니다')
  }

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}
