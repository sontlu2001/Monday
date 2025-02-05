import React from "react";
import { Tag } from "antd";
import { tBorrowerStatus } from "../../../types/common.type";
import {
	MAP_BORROWER_STATUS_COLOR,
	MAP_BORROWER_STATUS_NAME,
} from "../../../constants/general.constant";

interface IBorrowerStatusTagProps {
	status: tBorrowerStatus;
}

const BorrowerStatusTag: React.FC<IBorrowerStatusTagProps> = ({ status }) => {
	return (
		<Tag color={MAP_BORROWER_STATUS_COLOR.get(status)} >
			<strong className="text-xl">{MAP_BORROWER_STATUS_NAME.get(status)}</strong>
		</Tag>
	);
};

export default BorrowerStatusTag;
