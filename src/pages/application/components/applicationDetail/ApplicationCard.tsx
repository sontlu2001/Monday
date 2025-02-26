import { Card, Divider } from "antd";
import { ReactNode } from "react";

interface IApplicationCardProps {
	title: ReactNode;
	extraContent?: ReactNode;
	children?: ReactNode;
}

const ApplicationCard = (props: IApplicationCardProps) => {
	const { title, extraContent, children } = props;
	return (
		<Card>
			<div className="flex justify-between items-center">
				<div>{title}</div>
				<div>{extraContent}</div>
			</div>
			<Divider className="my-2"></Divider>
			{children && <div>{children}</div>}
		</Card>
	);
};

export default ApplicationCard;
