import { Button, Card } from 'antd';
import React from 'react';
import InfoDisplay from '../../../components/common/InfoDisplay';
import { formatCurrency } from '../../../utils/utils';
import { Link } from 'react-router-dom';

const LoanInfomation = () => {
  return (
    <>
      <Card
        title="Loan Details"
        className={`mb-2 transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <InfoDisplay label="ID Number:" value={'Education'}></InfoDisplay>
          <InfoDisplay label="Loan Type:" value={'Unsecured'}></InfoDisplay>
          <InfoDisplay
            label="Loan Amount:"
            value={formatCurrency(3000)}></InfoDisplay>
          <InfoDisplay label="Loan ID:" value={'LON001'}></InfoDisplay>
          <InfoDisplay label="Date of Loan:" value={'10/02/2025'}></InfoDisplay>
          <InfoDisplay
            label="Application ID:"
            value={<Link to={'dsadsa'}>APP001</Link>}></InfoDisplay>
          <InfoDisplay
            label="Amount Disbursed:"
            value={'SGD 3,000'}></InfoDisplay>
          <InfoDisplay
            label="1st Installment Date:"
            value={'17/03/2025'}></InfoDisplay>
          <InfoDisplay label="Installments:" value={'12'}></InfoDisplay>
          <InfoDisplay label="Pay Frequency:" value={'Monthly'}></InfoDisplay>
          <InfoDisplay label="Payment Type:" value={'GIRO'}></InfoDisplay>
          <InfoDisplay label="Book 1:" value={'Bank book'}></InfoDisplay>
        </div>
      </Card>

      <Card
        title="Interest + Fee Details"
        className={`mb-2 transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <InfoDisplay label="Interest Rate:" value={`${0}%`} />
          <InfoDisplay label="Interest Frequency:" value={"Monthly"} />
          <InfoDisplay label="Interest Calculate Method:" value={'Reducing Interest'}></InfoDisplay>
          <InfoDisplay label="Late Fee Interest:" value={`${0}%`}></InfoDisplay>
          <InfoDisplay label="Late Fee:" value={'SGD 20'}></InfoDisplay>
          <InfoDisplay label="Admin Fee:" value={'SGD 40'}></InfoDisplay>
        </div>
      </Card>

      <Card
        title="GIRO & Payment Information"
        className={`mb-2 transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <InfoDisplay label="GIRO Bank:" value={`HDB Bank`} />
          <InfoDisplay label="GIRO Branch:" value={"HDB central"} />
          <InfoDisplay label="GIRO Account Number:" value={'1234567890'}></InfoDisplay>
          <InfoDisplay label="Bank Account Number:" value={`12345908755`}></InfoDisplay>
          <InfoDisplay label="GIRO Approval Date:" value={`10/01/2025`}></InfoDisplay>
          <InfoDisplay label="DDA Number:" value={'NA'}></InfoDisplay>
          <InfoDisplay label="PIR:" value={'NA'}></InfoDisplay>
          <InfoDisplay label="eGIRO Status:" value={'Active'}></InfoDisplay>
        </div>
      </Card>
    </>
  );
};

export default LoanInfomation;
