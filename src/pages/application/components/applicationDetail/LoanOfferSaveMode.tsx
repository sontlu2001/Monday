import InfoDisplay from '../../../../components/common/InfoDisplay';
import { useApplicationDetailContext } from '../../../../context/ApplicationDetailContext';
import { formatDate } from '../../../../utils/utils';
import SelectInputField from '../../../../components/form/SelectInputField';
import { ILoanOffer } from '../../../../interface/application.interface';
import { useForm } from 'react-hook-form';
import { MAP_LOAN_TYPE_NAME } from '../../../../constants/general.constant';
import { useState } from 'react';
import { IOption } from '../../../../interface/general.interface';
import DatePickerField from '../../../../components/form/DatePickerField';
import { TextInputField } from '../../../../components/form/TextInputField';

const LoanOfferSaveMode = () => {
  const { applicationDetail } = useApplicationDetailContext();
  const { handleSubmit, control } = useForm<ILoanOffer>();
  const [listInstallmentFrequency, setListInstallmentFrequency] = useState<IOption<string>[]>([
    { label: "Monthly", value: "Monthly" },
    { label: "Weekly", value: "Weekly" },
    { label: "Bi-weekly", value: "Bi-weekly" },
  ]);
  const [listInterestCalculationMethod, setListInterestCalculationMethod] = useState<IOption<string>[]>([
    { label: "Reducing interest", value: "Reducing interest" },
  ]);
 

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-4">
        <InfoDisplay value={MAP_LOAN_TYPE_NAME.get(applicationDetail?.loanType || "S")} label="Loan Type:" />
        <InfoDisplay value={applicationDetail?.loanPurpose} label="Loan Purpose:" />
        <InfoDisplay value={formatDate(applicationDetail?.dateOfApplication)} label="Application Date:" />
        <InfoDisplay value={applicationDetail?.loanAmount} label="Loan Amount Offer:" />
        <div className="col-span-2">
          <InfoDisplay value={applicationDetail?.tenorMonths} label="Loan Tenor Offer:" />
        </div>
        <InfoDisplay value={"Test"} label="Installments:" />
        <SelectInputField
          options={listInstallmentFrequency}
          name="installmentFrequency"
          label="Installment Frequency:"
          layout='horizontal'
          control={control} />
        <DatePickerField<ILoanOffer>
          control={control}
          name="installmentDate"
          label="1st Installment Date:"
          layout='horizontal'
        />
        <InfoDisplay value={"Test"} label="1st Installment Date:" />
        <InfoDisplay value={"Test"} label="Book 1:" />
        <div className="col-span-2">
          <InfoDisplay value={"Test"} label="Payment Type:" />
        </div>
        <InfoDisplay value={"Test"} label="CBS score:" />
        <InfoDisplay value={"Test"} label="CBS PD:" />
        <InfoDisplay value={applicationDetail?.remarks} label="Remarks:" />
        <div className="col-span-full">
          <p className="font-bold">Interest</p>
        </div>
        <InfoDisplay value={"Test"} label="Monthly Interest Rate:" />
        <SelectInputField
          options={listInstallmentFrequency}
          name="interestFrequency"
          label="Interest Frequency:"
          layout='horizontal'
          control={control} />
        <SelectInputField
          options={listInterestCalculationMethod}
          name="interestCalculationMethod"
          label="Interest Calculation Method:"
          layout='horizontal'
          control={control} />
        <div className="col-span-full">
          <p className="font-bold">Fees</p>
        </div>
        <InfoDisplay value={"Test"} label="Admin Fee (%)" />
        <div className="col-span-2">
          <InfoDisplay value={"Test"} label="Admin Fee :" />
        </div>
        <TextInputField<ILoanOffer>
          control={control}
          name="lateFee"
          layout='horizontal'
          label="Late Interest (%)"
        />
        <div className="col-span-2">
          <InfoDisplay value={"Test"} label="Late Fee :" />
        </div>
      </div>
  )
}

export default LoanOfferSaveMode