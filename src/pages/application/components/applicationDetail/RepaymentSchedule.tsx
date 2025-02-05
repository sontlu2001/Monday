import { Collapse, CollapseProps, Table } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: string) => new Date(text).toLocaleDateString(),
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
    totalAmount: 1050,
  },
];

const RepaymentSchedule = () => {
  const collapseItem: CollapseProps["items"] = [
    {
      key: '1',
      label: <p className='font-medium'>Repayment Schedule</p>,
      children: <Table size='small' dataSource={data} columns={columns} scroll={{x:240}}></Table>,
    },
  ];

  return (
    <Collapse
      items={collapseItem}
      defaultActiveKey={['1']}
      expandIconPosition='end'
    ></Collapse>
  );
};

export default RepaymentSchedule;
