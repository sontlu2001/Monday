import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Collapse, Modal } from "antd";
import React, { memo, useState } from "react";
import ApplicationModalLayout from "../modal/ApplicationModalLayout";

// Todo update type
export interface IPanelType1 {
	id: number;
	type: "type1";
	dnb_check_result: {
		last_check: string;
		no_bankruptcy_proceeding: { details: string };
		bankruptcy_discharged: { details: string };
		no_material_litigation: { details: string };
		dnb_check_status: string;
	};
}

export interface IPanelType2 {
	id: number;
	type: "type2";
	dnb_check_result: {
		last_check: string;
		no_bankruptcy_proceeding: { details: string };
		other_data: { details: string };
		dnb_check_status: string;
	};
}

export type PanelData = IPanelType1 | IPanelType2;

const getStatusIcon = (status: string) => {
	switch (status.toLowerCase()) {
		case "passed":
			return <CheckCircleOutlined style={{ color: "green" }} />;
		case "failed":
			return <ExclamationCircleOutlined style={{ color: "red" }} />;
		case "pending":
			return <ExclamationCircleOutlined style={{ color: "orange" }} />;
		default:
			return null;
	}
};

const renderPanelContent = (panel: PanelData) => {
	switch (panel.type) {
		// Todo use Table antd
		case "type1":
			return (
				<ul>
					<li>Last Check: {panel.dnb_check_result.last_check}</li>
					<li>
						No Bankruptcy Proceeding:{" "}
						{panel.dnb_check_result.no_bankruptcy_proceeding.details}
					</li>
					<li>
						Bankruptcy Discharged: {panel.dnb_check_result.bankruptcy_discharged.details}
					</li>
					<li>
						No Material Litigation: {panel.dnb_check_result.no_material_litigation.details}
					</li>
				</ul>
			);
		case "type2":
			return (
				<ul>
					<li>Last Check: {panel.dnb_check_result.last_check}</li>
					<li>
						No Bankruptcy Proceeding:{" "}
						{panel.dnb_check_result.no_bankruptcy_proceeding.details}
					</li>
					<li>Other Data: {panel.dnb_check_result.other_data.details}</li>
				</ul>
			);
		default:
			return <div>Unknown panel type</div>;
	}
};

const DiligenceCard: React.FC<{
	panels: PanelData[];
	children?: React.ReactNode;
}> = ({ panels, children }) => {
	const [isShowModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const [modalTitle, setModalTitle] = useState("");

	const showDetailDiligence = (panel: PanelData) => {
		setShowModal(true);
		setModalTitle(`Panel ${panel.id}`);

		switch (panel.type) {
			// Todo separate component,
			case "type1":
				setModalContent(
					<ApplicationModalLayout
						leftContent={<div>Left Content for Type 1</div>}
						infoContent={<div>Info Content for Type 1</div>}
						tableContent={renderPanelContent(panel)}
					/>
				);
				break;
			case "type2":
				setModalContent(
					<ApplicationModalLayout
						leftContent={<div>Left Content for Type 2</div>}
						infoContent={<div>Info Content for Type 2</div>}
						tableContent={renderPanelContent(panel)}
					/>
				);
				break;
			default:
				setModalContent(<div>Unknown panel type</div>);
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
				{panels.map((panel, index) => (
					<Collapse
						className="h-fit"
						key={index}
						defaultActiveKey={["0", "1", "2", "3"]}
						expandIconPosition="end"
						collapsible="icon"
					>
						<Collapse.Panel
							key={index}
							header={
								<div className="flex flex-row gap-2">
									<div>{getStatusIcon(panel.dnb_check_result.dnb_check_status)}</div>
									<a onClick={() => showDetailDiligence(panel)}> Panel {index + 1}</a>
								</div>
							}
						>
							{renderPanelContent(panel)}
							{children}
						</Collapse.Panel>
					</Collapse>
				))}
			</div>
			<Modal
				title={modalTitle}
				open={isShowModal}
				width={900}
				onOk={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
			>
				{modalContent}
			</Modal>
		</>
	);
};

export default memo(DiligenceCard);
