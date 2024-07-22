import FixedBottomButton from '@/components/shared/FixedBottomButton'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import { useAlertContext } from '@/contexts/AlertContext'
import useCreditCheck from '@/hooks/useCreditCheck'
import useUser from '@/hooks/useUser'
import { updateCredit } from '@/remote/credit'
import { useState } from 'react'
import { useMutation } from 'react-query'

export default function CreditCheckPage() {
  const [readyToPoll, setReadyToPoll] = useState<boolean>(true)
  const { open } = useAlertContext()
  const user = useUser()
  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({ userId: user?.id as string, creditScore }),
  )
  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      setReadyToPoll(false)
      mutate(creditScore)
    },
    onError: () => {
      setReadyToPoll(false)
      open({
        title: '신용점수 조회에 실패했어요',
        description: '잠시 후 다시 시도해주세요',
        onButtonClick: () => window.history.back(),
      })
    },
    enabled: readyToPoll,
  })

  return (
    <div>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'READY']} />
      {status === 'COMPLETE' && (
        <FixedBottomButton label="확인" onClick={() => window.history.back()} />
      )}
    </div>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회를 위해 정보를 준비하고 있어요',
  [CHECK_STATUS.PROGRESS]: '신용점수를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}
