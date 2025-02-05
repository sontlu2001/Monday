import InfoDisplay from "../../../../components/common/InfoDisplay";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import { formatDate, getMasterDataName } from "../../../../utils/utils";
import ApplicationCard from "./ApplicationCard";

const ApplicationInfo = () => {
	const { applicationDetail, configOptions } = useApplicationDetailContext();
	return (
		<div className="mb-4">
			<ApplicationCard title={<p className="font-medium">Application Details</p>}>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-2 gap-4">
					<InfoDisplay
						value={`$${applicationDetail?.loanAmount?.toLocaleString()}`}
						label="Loan Amount:"
					/>
					<InfoDisplay
						value={getMasterDataName(
							configOptions.listLoanType,
							applicationDetail.loanType
						)}
						label="Loan Type:"
					/>
					<InfoDisplay value={applicationDetail?.loanPurpose} label="Loan Purpose:" />
					<InfoDisplay value={applicationDetail?.tenorMonths} label="Loan Tenor:" />
					<InfoDisplay
						value={formatDate(applicationDetail?.dateOfApplication)}
						label="Application Date:"
					/>
				</div>
			</ApplicationCard>
		</div>
	);
};

export default ApplicationInfo;
