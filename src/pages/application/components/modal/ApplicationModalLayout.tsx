import React from "react";

interface ApplicationModalLayoutProps {
	leftContent: React.ReactNode;
	infoContent: React.ReactNode;
	tableContent: React.ReactNode;
}

const ApplicationModalLayout: React.FC<ApplicationModalLayoutProps> = ({
	leftContent,
	infoContent,
	tableContent,
}) => {
	return (
		<div className="grid grid-cols-2 border border-solid">
			<div>{leftContent}</div>
			<div className="row-span-2 border-l-2">
				<div className="border-b p-2">{infoContent}</div>
				<div className="p-2">{tableContent}</div>
			</div>
		</div>
	);
};

export default ApplicationModalLayout;
