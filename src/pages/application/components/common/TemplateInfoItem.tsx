import React from 'react'
interface InfoItemProps {
	label: string;
	content: React.ReactNode;
}

const TemplateInfoItem: React.FC<InfoItemProps> = ({ label, content }) => (
	<div className="flex gap-2">
		<div className="font-medium">{label}:</div>
		<div>{content}</div>
	</div>
);

export default TemplateInfoItem
