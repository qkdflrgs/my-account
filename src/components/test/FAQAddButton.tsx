import { store } from '@remote/firebase'
import { FAQS } from '@mock/FAQ'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@constants/collection'

export default function FAQAddButton() {
  const handleButtonClick = () => {
    const batch = writeBatch(store)

    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTIONS.FAQ))

      batch.set(docRef, faq)
    })

    batch.commit().then(() => {
      window.alert('FAQ 데이터 추가!')
    })
  }

  return <Button onClick={handleButtonClick}>FAQ 데이터 추가</Button>
}
