import withAuth from '@shared/hocs/withAuth'
import ProgressBar from '@shared/ProgressBar'
import { LAST_STEP } from '@constants'
import { useState } from 'react'
import Terms from '@components/account/Terms'
import useUser from '@hooks/useUser'
import { getTerms, setTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@models/user'

interface AccountNewPageProps {
  initialStep: number
}

function AccountNewPage({ initialStep }: AccountNewPageProps) {
  const [step, setStep] = useState<number>(initialStep)
  const user = useUser()

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
    </div>
  )
}

async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession()

  const agreedTerms = await getTerms((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 0,
    },
  }
}
export default withAuth(AccountNewPage)
