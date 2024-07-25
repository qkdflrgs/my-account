import generateMonthlyChartData from '@utils/generateMonthlyChartData'
import generatePieChartData from '@utils/generatePieChartData'
import withAuth from '@shared/hocs/withAuth'
import dynamic from 'next/dynamic'
import Spacing from '@shared/Spacing'

const CategoryPieChart = dynamic(
  () => import('@components/account/CategoryPieChart'),
)
const MonthlyChart = dynamic(() => import('@components/account/MonthlyChart'))
const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Spacing
        size={8}
        backgroundColor="grey100"
        style={{ margin: '20px 0px' }}
      />
      <CategoryPieChart chartData={generatePieChartData()} />
      <Spacing
        size={8}
        backgroundColor="grey100"
        style={{ margin: '20px 0px' }}
      />
      <Transactions />
    </div>
  )
}

export default withAuth(AccountPage)
