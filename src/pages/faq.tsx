import { FAQ } from '@models/faq'
import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'
import { collection, getDocs } from 'firebase/firestore'
import ListRow from '@shared/ListRow'

interface FAQPageProps {
  faqs: FAQ[]
}

export default function FAQPage({ faqs }: FAQPageProps) {
  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ))

  const faqs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: {
      faqs,
    },
  }
}
