import withAuth from '@shared/hocs/withAuth'
import ProgressBar from '@shared/ProgressBar'
import { LAST_STEP } from '@constants'
import { useState } from 'react'
import Terms from '@components/account/Terms'
import useUser from '@hooks/useUser'
import { createAccount, getAccount, getTerms, setTerms } from '@remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@models/user'
import Form from '@components/account/Form'
import { Account } from '@models/account'
import FullPageLoader from '@shared/FullPageLoader'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

interface AccountNewPageProps {
  initialStep: number
}

function AccountNewPage({ initialStep }: AccountNewPageProps) {
  const [step, setStep] = useState<number>(initialStep)
  const user = useUser()
  const navigate = useRouter()

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 && (
        <Terms
          onNext={async (termIds) => {
            await setTerms({ userId: user?.id as string, termIds })

            setStep(step + 1)
          }}
        />
      )}
      {step === 1 && (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as Account

            await createAccount(newAccount)
            setStep(step + 1)
          }}
        />
      )}
      {step === 2 && (
        <>
          <FullPageLoader message="계좌 개설 신청이 완료되었어요" />
          <FixedBottomButton label="확인" onClick={() => navigate.push('/')} />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerms((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  const account = await getAccount((session?.user as User).id)

  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 2,
    },
  }
}
export default withAuth(AccountNewPage)
