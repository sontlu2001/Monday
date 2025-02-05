interface IContent<tValue = any> {
	label: string;
	value: tValue;
}

const InfoDisplay = (props: IContent) => {
	const { value, label } = props;

	return (
		<>
			<div className="flex gap-2">
				<div>{label}</div>
				<div className="font-medium">{value}</div>
			</div>
		</>
	);
};

export default InfoDisplay;
