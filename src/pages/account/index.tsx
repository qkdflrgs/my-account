import withAuth from '@shared/hocs/withAuth'
import dynamic from 'next/dynamic'

const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  return (
    <div>
      <Transactions />
    </div>
  )
}

export default withAuth(AccountPage)
