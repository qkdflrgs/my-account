import MonthlyChart from '@/components/account/MonthlyChart'
import generateMonthlyChartData from '@/utils/generateMonthlyChartData'
import withAuth from '@shared/hocs/withAuth'
import dynamic from 'next/dynamic'

const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transactions />
    </div>
  )
}

export default withAuth(AccountPage)
