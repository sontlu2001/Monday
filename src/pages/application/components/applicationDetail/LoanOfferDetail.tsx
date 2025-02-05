import InfoDisplay from "../../../../components/common/InfoDisplay";
import { MAP_LOAN_TYPE_NAME } from "../../../../constants/general.constant";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import { formatDate } from "../../../../utils/utils";

export default function LoanOfferDetail() {
  const { applicationDetail } = useApplicationDetailContext();
  
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
			<InfoDisplay value={"Test"} label="Installment Frequency:" />
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
			<InfoDisplay value={"Test"} label="Interest Frequency:" />
			<InfoDisplay value={"Test"} label="Interest Calculation Method:" />
			<div className="col-span-full">
				<p className="font-bold">Fees</p>
			</div>
			<InfoDisplay value={"Test"} label="Admin Fee (%)" />
			<InfoDisplay value={"Test"} label="Admin Fee :" />
			<InfoDisplay value={"Test"} label="Interest Calculation Method:" />
			<InfoDisplay value={"Test"} label="Late Interest (%)" />
			<InfoDisplay value={"Test"} label="Late Fee :" />
		</div>
  )
};
