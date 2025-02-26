import { Button, CollapseProps, Table } from 'antd';
import ApplicationCard from './ApplicationCard';
import { IRepaymentSchedule } from '../../../../interface/application.interface';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: string) => {
      const date = new Date(text);
      return isNaN(date.getTime()) ? <strong>{text}</strong> : date.toLocaleDateString();
    }
  },
  {
    title: 'Principal Amount',
    dataIndex: 'principalAmount',
    key: 'principalAmount',
    render: (amount: number) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    title: 'Interest Amount',
    dataIndex: 'interestAmount',
    key: 'interestAmount',
    render: (amount: number) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (amount: number) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
];

const RepaymentSchedule = ({
  onlyViewData,
  listRepaymentSchedules=[],
}:{
  onlyViewData: boolean,
  listRepaymentSchedules?: IRepaymentSchedule[],
}) => {

  const totalRow = {
    key: 'total',
    date: 'Total',
    principalAmount: listRepaymentSchedules.reduce((sum, item) => sum + item.principalAmount, 0),
    interestAmount: listRepaymentSchedules.reduce((sum, item) => sum + item.interestAmount, 0),
    totalAmount: listRepaymentSchedules.reduce((sum, item) => sum + item.totalAmount, 0),
  };

  const updatedData = [...listRepaymentSchedules, totalRow];
  return (
    <ApplicationCard
				title={
					<span className="font-medium">
						Repayment Schedule
					</span>
				}
				extraContent={onlyViewData && <Button type="primary" key="close">Generate repayment</Button>}
			>
				<Table pagination={false} size='small' dataSource={updatedData} columns={columns} scroll={{x:240}} />
			</ApplicationCard>
  );
};

export default RepaymentSchedule;
