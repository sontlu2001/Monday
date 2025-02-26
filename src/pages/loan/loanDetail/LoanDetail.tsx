import { Breadcrumb, Divider, Tabs, TabsProps } from 'antd'
import BorrowerStatusTag from '../../borrower/components/BorrowerStatusTag'
import LoanInfomation from '../components/LoanInfomation'
import RepaymentSchedule from '../components/RepaymentSchedule'
import RepaymentHistory from '../components/RepaymentHistory'
import FollowUp from '../components/FollowUp'

const LoanDetail = () => {
    const tabsItems: TabsProps["items"] = [
      {
        key: "1",
        label: "Loan Infomation",
        children: <LoanInfomation/>,
      },
      {
        key: "2",
        label: "Repayment Schedule",
        children: <RepaymentSchedule/>,
      },
      {
        key: "3",
        label: "Repayment History",
        children: <RepaymentHistory/>,
      },
      {
        key: "4",
        label: "Follow Up",
        children: <FollowUp/>,
      },
    ];

  return (
    <section>
				<Breadcrumb
					items={[
						{ title: "Loan Management" },
						{ title: "Loan Dashboard" },
						{ title: "Loan View" },
					]}
					className="mb-4"
				/>
				{/* <FormProvider {...methods}> */}
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-end gap-4 justify-end">
							<span className="text-xl font-semibold">
								LOAN3131
							</span>
              <span className="text-xl font-semibold">
								LOAN3131
							</span>
							<BorrowerStatusTag status={"ACT"}></BorrowerStatusTag>
						</div>
					</div>
					{/* <BorrowerInfo /> */}
					<Tabs
						className="mt-4"
						defaultActiveKey="1"
						items={tabsItems}
					/>
				{/* </FormProvider> */}
			</section>
  )
}

export default LoanDetail