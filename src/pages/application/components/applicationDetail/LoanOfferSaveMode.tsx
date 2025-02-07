import InfoDisplay from '../../../../components/common/InfoDisplay';
import { useApplicationDetailContext } from '../../../../context/ApplicationDetailContext';
import { calcAdminFee, formatCurrency, formatDate, getFutureDate, getMasterDataName } from '../../../../utils/utils';
import SelectInputField from '../../../../components/form/SelectInputField';
import { useFormContext } from 'react-hook-form';
import { MAP_LOAN_TYPE_NAME } from '../../../../constants/general.constant';
import DatePickerField from '../../../../components/form/DatePickerField';
import { useEffect } from 'react';
import { ILoanOffer } from '../../../../interface/loanOffer.interface';

const LoanOfferSaveMode = () => {
  const { applicationDetail, configOptions } = useApplicationDetailContext();
  const { handleSubmit, control, reset } = useFormContext<ILoanOffer>();

  useEffect(() => {
    const firstPayDate = applicationDetail?.loanOffer.firstPayDate ?? getFutureDate(30);
  
    reset((prevData: any) => ({
      ...prevData,
      firstPayDate,
      interestFrequency: applicationDetail?.loanOffer?.interestFrequency,
      payFrequency: applicationDetail?.loanOffer?.payFrequency,
      interestCalculateMethod: applicationDetail?.loanOffer?.interestCalculateMethod,
    }));
  }, [applicationDetail, reset]);

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-4">
        <InfoDisplay value={MAP_LOAN_TYPE_NAME.get(applicationDetail?.loanType)} label="Loan Type:" />
        <InfoDisplay value={applicationDetail?.loanPurpose} label="Loan Purpose:" />
        <InfoDisplay value={formatDate(applicationDetail?.dateOfApplication, "DD/MM/YYYY")} label="Application Date:" />
        <InfoDisplay value={`${applicationDetail?.borrower.currency} ${formatCurrency(applicationDetail?.loanOffer?.loanAmountOffer || 0)}`} label="Loan Amount Offer:" />
        <div className="col-span-2">
          <InfoDisplay value={`${applicationDetail?.tenorMonths} Months`} label="Loan Tenor Offer:" />
        </div>
        <InfoDisplay value={applicationDetail?.loanOffer?.installments} label="Installments:" />
        <SelectInputField
          options={configOptions.listInstallmentFrequency}
          name="payFrequency"
          label="Installment Frequency:"
          layout='horizontal'
          control={control} />
        <DatePickerField<ILoanOffer>
          control={control}
          name="firstPayDate"
          label="1st Installment Date:"
          layout='horizontal'
        />
        <InfoDisplay value={applicationDetail?.loanOffer?.book1} label="Book 1:" />
        <div className="col-span-2">
        <InfoDisplay 
					value={
						getMasterDataName(configOptions.listPaymentType, applicationDetail?.loanOffer?.paymentType)
					} 
					label="Payment Type:"
				/>
        </div>
        <InfoDisplay value={""} label="CBS score:" />
        <InfoDisplay value={""} label="CBS PD:" />
        <InfoDisplay value={applicationDetail?.remarks} label="Remarks:" />
        <div className="col-span-full">
          <p className="font-bold">Interest</p>
        </div>
        <InfoDisplay value={`${applicationDetail?.loanOffer?.interestMonth || 0}%`} label="Monthly Interest Rate:" />
        <SelectInputField
          options={configOptions.listLoanInterestFrequency}
          name="interestFrequency"
          label="Interest Frequency:"
          layout='horizontal'
          control={control} />
        <SelectInputField
          options={configOptions.listInterestCalculationMethod}
          name="interestCalculateMethod"
          label="Interest Calculation Method:"
          layout='horizontal'
          control={control} />
        <div className="col-span-full">
          <p className="font-bold">Fees</p>
        </div>
        <InfoDisplay value={applicationDetail?.loanOffer?.adminFeeRate || 0} label="Admin Fee (%)" />
        <InfoDisplay value={calcAdminFee(applicationDetail?.loanOffer?.loanAmountOffer, applicationDetail?.loanOffer?.adminFeeRate, applicationDetail?.borrower?.currency)} label="Admin Fee :" />
        <div></div>
        <InfoDisplay value={applicationDetail?.loanOffer?.lateInterest || 0} label="Late Interest (%)" />
        <InfoDisplay value={`${applicationDetail?.borrower.currency} ${formatCurrency(applicationDetail?.loanOffer?.lateFee || 0)}`} label="Late Fee :" />
      </div>
  )
}

export default LoanOfferSaveMode