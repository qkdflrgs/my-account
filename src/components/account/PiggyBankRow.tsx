import Image from 'next/image'
import ListRow from '../shared/ListRow'
import { useRouter } from 'next/router'

export default function PiggyBankRow() {
  const navigate = useRouter()

  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-256.png"
              width={40}
              height={40}
              alt="piggy bank"
            />
          }
          contents={
            <ListRow.Texts
              title="저금통"
              subTitle="매일 매일 조금씩 저금하여 목표 금액을 모아보세요"
            />
          }
          withArrow={true}
          onClick={() => navigate.push('/account/piggybank/new')}
        />
      </ul>
    </div>
  )
}
