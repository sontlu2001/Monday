import { memo } from "react";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import BorrowerDetailEditMode from "./BorrowerDetailEditMode";
import BorrowerDetailSaveMode from "./BorrowerDetailSaveMode";
import TableLoan from "./TableLoan";
import TableRecentApplication from "./TableRecentApplication";
import { Card } from "antd";
import EmploymentAndIncomeDetails from "./EmploymentAndIncomeDetails";

const BorrowerDetailsTabContent = () => {

	const { isEditMode, listLoans } = useBorrowerDetailContext();
	return (
		<div>
			{isEditMode && (
				<>
					<BorrowerDetailEditMode />
					<Card title="Employment and Income Details">
						<EmploymentAndIncomeDetails />
					</Card>
				</>
			)}
			{!isEditMode && (
				<>
					<BorrowerDetailSaveMode />
				</>
			)}
			<TableLoan data={listLoans} />
			<TableRecentApplication />
		</div>
	);
};

export default memo(BorrowerDetailsTabContent);
