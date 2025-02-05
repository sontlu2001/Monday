import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { IBorrowerDetail } from "../../../interface/borrower.interface";
import { memo } from "react";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { formatPhoneNumber } from "../../../utils/utils";

const BorrowerItem = ({ label, value }: { label: string; value: any }) => (
	<p className="text-sm text-gray-700">
		{label} <span className="font-semibold">{value}</span>
	</p>
);

const BorrowerSummary = ({
	label,
	value,
	currency,
}: {
	label: string;
	value: any;
	currency?: string;
}) => (
	<div className="flex flex-col gap-2">
		<div className="flex items-center gap-1 text-gray-500">
			<span>{label}</span>
			<ExclamationCircleOutlined />
		</div>
		<p className="font-medium">
			{currency ? `${currency} ${value}` : `${value} days`}
		</p>
	</div>
);

const BorrowerInfo = () => {
	const { getValues } = useFormContext<IBorrowerDetail>();

	const { configOptions } = useBorrowerDetailContext();

	const formValue = getValues();

	const borrowerItems = [
		{
			label: "Phone Number:",
			value: formatPhoneNumber(
				formValue.phoneCode,
				formValue.handPhone,
				configOptions.listPhoneNumber
			),
		},
		{ label: "Email:", value: formValue.email },
		// { label: "Last check DNB:", value: formValue.lastModifiedBy },
	];

	const amountInfos = [
		{
			label: "Total Outstanding",
			value: 0,
			currency: "SGD",
		},
		{
			label: "Total Overdue",
			value: 0,
			currency: "SGD",
		},
		{
			label: "Days Past Due",
			value: 0,
		},
	];

	return (
		<div className="flex flex-col md:flex-row items-end w-full">
			<div className="w-full md:w-1/2">
				<div className="flex flex-col gap-3">
					{borrowerItems.map((item, index) => (
						<BorrowerItem key={index} {...item} />
					))}
				</div>
			</div>
			<div className="w-full md:w-1/2">
				<div className="flex gap-6 justify-end">
					{amountInfos.map((info, index) => (
						<BorrowerSummary key={index} {...info} />
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(BorrowerInfo);
