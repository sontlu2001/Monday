import InfoDisplay from "../../../../components/common/InfoDisplay";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import {
	formatDate,
	formatPhoneNumber,
	getMasterDataName,
} from "../../../../utils/utils";
import ApplicationCard from "./ApplicationCard";

const BorrowerInfo = () => {
	const { applicationDetail, configOptions } = useApplicationDetailContext();
	return (
		<div>
			<ApplicationCard title={<p className="font-medium">Borrower Information</p>}>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
					<InfoDisplay value={applicationDetail.id} label="ID Number:" />
					<InfoDisplay value={applicationDetail.applicationType} label="ID Type:" />
					<InfoDisplay
						value={formatDate(applicationDetail.dateOfApplication)}
						label="ID Expiry Date:"
					/>
					<InfoDisplay value={applicationDetail.borrower.fullName} label="Name:" />
					<InfoDisplay
						value={formatPhoneNumber(
							applicationDetail.borrower.phoneCode,
							applicationDetail.borrower.handPhone,
							configOptions.listPhoneNumber
						)}
						label="Phone Number:"
					/>
					<InfoDisplay
						value={getMasterDataName(
							configOptions.listNationalities,
							applicationDetail.borrower.nationality
						)}
						label="Nationality:"
					/>
				</div>
			</ApplicationCard>
		</div>
	);
};
export default BorrowerInfo;
