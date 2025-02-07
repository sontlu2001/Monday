import { Button, Card, Collapse, CollapseProps, Table } from 'antd';
import ApplicationCard from './ApplicationCard';

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

const data = [
  {
    key: '1',
    date: '2025-01-01',
    principalAmount: 1000,
    interestAmount: 50,
    totalAmount: 1000,
  },
  {
    key: '2',
    date: '2025-01-02',
    principalAmount: 2000,
    interestAmount: 50,
    totalAmount: 1000,
  },
  {
    key: '3',
    date: '2025-01-02',
    principalAmount: 3000,
    interestAmount: 50,
    totalAmount: 2000,
  },
];

const totalRow = {
  key: 'total',
  date: 'Total',
  principalAmount: data.reduce((sum, item) => sum + item.principalAmount, 0),
  interestAmount: data.reduce((sum, item) => sum + item.interestAmount, 0),
  totalAmount: data.reduce((sum, item) => sum + item.totalAmount, 0),
};

const updatedData = [...data, totalRow];

const RepaymentSchedule = () => {
  return (
    <ApplicationCard
				title={
					<span className="font-medium">
						Repayment Schedule
					</span>
				}
				extraContent={<Button type="primary" key="close">Generate repayment</Button>}
			>
				<Table pagination={false} size='small' dataSource={updatedData} columns={columns} scroll={{x:240}} />
			</ApplicationCard>
  );
};

export default RepaymentSchedule;
