import InfoDisplay from "../../../../components/common/InfoDisplay";
import { MAP_LOAN_TYPE_NAME } from "../../../../constants/general.constant";
import { calcAdminFee, formatCurrency, formatDate, getFutureDate, getMasterDataName } from "../../../../utils/utils";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import { Typography } from "antd";
import { ILoanOffer } from "../../../../interface/loanOffer.interface";
const { Title } = Typography;

const LoanOfferHistory = ({
loanOfferDetail
}: {
  loanOfferDetail: ILoanOffer;
}) => {
	const { applicationDetail, configOptions } = useApplicationDetailContext();

	return (
    <div>
      <Title level={5}>Loan Offer Details</Title>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-4">
			<InfoDisplay value={MAP_LOAN_TYPE_NAME.get(applicationDetail?.loanType)} label="Loan Type:" />
			<InfoDisplay value={applicationDetail?.loanPurpose} label="Loan Purpose:" />
			<InfoDisplay value={formatDate(applicationDetail?.dateOfApplication, "DD/MM/YYYY")} label="Application Date:" />
			<InfoDisplay value={`${applicationDetail?.borrower.currency} ${formatCurrency(loanOfferDetail?.loanAmountOffer || 0)}`} label="Loan Amount Offer:" />
			<div className="col-span-2">
				<InfoDisplay value={`${applicationDetail?.tenorMonths} Months`} label="Loan Tenor Offer:" />
			</div>
			<InfoDisplay value={loanOfferDetail?.installments} label="Installments:" />
			<InfoDisplay 
				value={
					getMasterDataName(configOptions.listInstallmentFrequency, loanOfferDetail?.payFrequency)
				} 
				label="Installment Frequency:" 
			/>
      <InfoDisplay value={formatDate(loanOfferDetail?.firstPayDate, 'DD/MM/YYYY')} label="1st Installment Date:" />
			<InfoDisplay value={loanOfferDetail?.book1} label="Book 1:" />
			<div className="col-span-2">
				<InfoDisplay 
					value={
						getMasterDataName(configOptions.listPaymentType, loanOfferDetail?.paymentType)
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
			<InfoDisplay value={`${loanOfferDetail?.interestMonth || 0}%`} label="Monthly Interest Rate:" />
			<InfoDisplay 
					value={
						getMasterDataName(configOptions.listLoanInterestFrequency, loanOfferDetail?.interestFrequency)
					} 
					label="Interest Frequency:"
				/>
			<InfoDisplay
				value={
					getMasterDataName(configOptions.listInterestCalculationMethod, loanOfferDetail?.interestCalculateMethod)
				}
				label="Interest Calculation Method:"
			/>
			<div className="col-span-full">
				<p className="font-bold">Fees</p>
			</div>
			<InfoDisplay value={loanOfferDetail?.adminFeeRate || 0} label="Admin Fee (%)" />
			<InfoDisplay value={calcAdminFee(loanOfferDetail?.loanAmountOffer, loanOfferDetail?.adminFeeRate, applicationDetail?.borrower?.currency)} label="Admin Fee :" />
			<div></div>
			<InfoDisplay value={loanOfferDetail?.lateInterest || 0} label="Late Interest (%)" />
			<InfoDisplay value={`${applicationDetail?.borrower.currency} ${formatCurrency(loanOfferDetail?.lateFee || 0)}`} label="Late Fee :" />
		</div>
    </div>
		
	)

};

export default LoanOfferHistory;