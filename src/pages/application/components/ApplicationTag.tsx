import { Tag } from "antd";
import React from "react";
import {
	MAP_APPLICATION_STATUS_COLOR,
	MAP_APPLICATION_STATUS_NAME,
} from "../../../constants/general.constant";
import { tApplicationStatus } from "../../../types/common.type";

interface IApplicationTagProps {
	status: tApplicationStatus;
	className?: string;
}

const ApplicationTag: React.FC<IApplicationTagProps> = ({
	status,
	className,
}) => {
	return (
		<Tag color={MAP_APPLICATION_STATUS_COLOR.get(status)} className={className}>
			{MAP_APPLICATION_STATUS_NAME.get(status)}
		</Tag>
	);
};

export default ApplicationTag;
