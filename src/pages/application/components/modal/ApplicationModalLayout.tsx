import React from "react";

interface ApplicationModalLayoutProps {
	leftContent: React.ReactNode;
	infoContent: React.ReactNode;
	tableContent?: React.ReactNode;
}

const ApplicationModalLayout: React.FC<ApplicationModalLayoutProps> = ({
	leftContent,
	infoContent,
	tableContent,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 border border-solid">
			<div>{leftContent}</div>
			<div className="row-span-2 col-span-2 border-l-2">
				<div className="p-2 flex">{infoContent}</div>
				<div className="p-2">{tableContent}</div>
			</div>
		</div>
	);
};

export default ApplicationModalLayout;
