import React, { useEffect } from "react";
import { Button, Select } from "antd";
import ApplicationCard from "./ApplicationCard";
import DiligenceCard, { PanelData } from "./DiligenceCard";
import applicationApi from "../../../../api/module/application.api";

const DueDiligence = () => {
	const samplePanels: PanelData[] = [
		{
			id: 1,
			type: "type1",
			dnb_check_result: {
				last_check: "2025-01-01",
				no_bankruptcy_proceeding: { details: "No bankruptcy proceedings found" },
				bankruptcy_discharged: { details: "No discharged bankruptcy" },
				no_material_litigation: { details: "No material litigation" },
				dnb_check_status: "passed",
			},
		},
		{
			id: 2,
			type: "type2",
			dnb_check_result: {
				last_check: "2025-02-01",
				no_bankruptcy_proceeding: { details: "No bankruptcy proceedings found" },
				other_data: { details: "Additional relevant information" },
				dnb_check_status: "failed",
			},
		},
		{
			id: 3,
			type: "type1",
			dnb_check_result: {
				last_check: "2025-03-01",
				no_bankruptcy_proceeding: { details: "No bankruptcy proceedings found" },
				bankruptcy_discharged: { details: "No discharged bankruptcy" },
				no_material_litigation: { details: "No material litigation" },
				dnb_check_status: "pending",
			},
		},
		{
			id: 4,
			type: "type2",
			dnb_check_result: {
				last_check: "2025-04-01",
				no_bankruptcy_proceeding: { details: "No bankruptcy proceedings found" },
				other_data: { details: "Additional relevant information" },
				dnb_check_status: "passed",
			},
		},
	];

	useEffect(() => {
		getListDueDiligence();
	}, []);

	const getListDueDiligence = async () => {
		const response = await applicationApi.getDiligence();
	};

	return (
		<div>
			<ApplicationCard title={<p className="font-medium">Due Diligence</p>}>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 mb-4">
					<div className="col-span-4 flex gap-4 items-center">
						<span>Check Type</span>
						<Select className="min-w-24" options={[]} allowClear />
						<Button type="primary">Check</Button>
					</div>
				</div>

				<DiligenceCard panels={samplePanels}></DiligenceCard>
			</ApplicationCard>
		</div>
	);
};

export default DueDiligence;
