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
		<div className="grid grid-cols-4 border border-solid">
			<div className="col-span-1">{leftContent}</div>
			<div className="row-span-2 border-l-2 col-span-3">
				<div className="border-b p-2">{infoContent}</div>
				<div className="p-2">{tableContent}</div>
			</div>
		</div>
	);
};

export default ApplicationModalLayout;
