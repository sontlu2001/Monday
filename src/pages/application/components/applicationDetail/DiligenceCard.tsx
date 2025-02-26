import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	LoadingOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import { Collapse, Modal, Skeleton, Typography } from "antd";
import React, { memo, useState } from "react";
import {
	COMMON_CHECK_STATUS,
	COMMON_RESULT_SUMMARY,
	JOB_STATUS,
} from "../../../../constants/general.constant";
import {
	ICbsCheckResult,
	IDnbCheckResult,
	IDueDiligence,
	IMlcbCheckResult,
	IMyInfoCheckResult,
	IWorldCheckResult
} from "../../../../interface/due.dilegence.api";
import { tCheckStatus } from "../../../../types/common.type";
import { getColorTextDiligence } from "../../../../utils/utils";
import ModalBlackListHistory from "../modal/ModalBlackListHistory";
import ModalCBSHistory from "../modal/ModalCBSHistory";
import ModalDNBHistory from "../modal/ModalDNBHistory";
import ModalMLCBHistory from "../modal/ModalMLCBHistory";
import ModalMyInfoHistory from "../modal/ModalMyInfoHistory";
import ModalWorldCheckHistory from "../modal/ModalWorldCheckHistory";
const { Text } = Typography;

const getStatusIcon = (status?: tCheckStatus) => {
	if (status !== COMMON_CHECK_STATUS.PASS && status !== COMMON_CHECK_STATUS.FAIL) {
		return null;
	}

	const iconMap = {
			Pass: <CheckCircleOutlined style={{ color: "green" }} />,
			Fail: <ExclamationCircleOutlined style={{ color: "red" }} />,
	};

	return iconMap[status];
};


const getStatusContent = (message: string, checkStatus?: tCheckStatus) => {
	if (message === JOB_STATUS.NOT_EXITS)
		return <WarningOutlined style={{ color: "red" }} />;

	if (message === JOB_STATUS.PENDING) return <LoadingOutlined />;

	return getStatusIcon(checkStatus);
};

const renderDNBDetails = (data: IDnbCheckResult) => {
	if (data?.dnb_result_summary === COMMON_RESULT_SUMMARY.ATTENTION) {
		return (
			<>
				{data?.no_bankruptcy_proceeding?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.no_bankruptcy_proceeding?.details}</li>
					</ul>
				)}
				{data?.bankruptcy_discharged?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.bankruptcy_discharged?.details}</li>
					</ul>
				)}
				{data?.no_material_litigation?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.no_material_litigation?.details}</li>
					</ul>
				)}
			</>
		);
	}
	return null;
};

const renderMLCBDetails = (data: IMlcbCheckResult) => {
	if (data?.mlcb_result_summary === COMMON_RESULT_SUMMARY.ATTENTION) {
		return (
			<>
				{data?.self_exclusion?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.self_exclusion?.details}</li>
					</ul>
				)}
				{data?.late_repayment?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.late_repayment?.details}</li>
					</ul>
				)}
			</>
		);
	}
	return null;
};

const renderMyInfoDetails = (data: IMyInfoCheckResult) => {
	if (data?.myInfo_result_summary === COMMON_RESULT_SUMMARY.ATTENTION) {
		return (
			<>
				{data?.spr_flag?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.spr_flag?.details}</li>
					</ul>
				)}
				{data?.borrower_age?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.borrower_age?.details}</li>
					</ul>
				)}
				{data?.legitimate_source_income?.status === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.legitimate_source_income?.details}</li>
					</ul>
				)}
			</>
		);
	}
	return null;
};

const renderCBSDetails = (data: ICbsCheckResult) => {
	if (data?.cbs_result_summary === COMMON_RESULT_SUMMARY.ATTENTION) {
		return (
			<>
				{data?.cbs_grade_check?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.cbs_grade_check?.value}</li>
					</ul>
				)}
				{data?.no_default_payment?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.no_default_payment?.value}</li>
					</ul>
				)}
				{data?.no_bankruptcy_discharged?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.no_bankruptcy_discharged?.value}</li>
					</ul>
				)}
				{data?.no_bankruptcy_proceeding?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.no_bankruptcy_proceeding?.value}</li>
					</ul>
				)}
				{data?.debt_consolidation_plan?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.debt_consolidation_plan?.value}</li>
					</ul>
				)}
				{data?.debt_management_plan?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.debt_management_plan?.value}</li>
					</ul>
				)}
				{data?.adverse_account_history?.value === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.adverse_account_history?.value}</li>
					</ul>
				)}
			</>
		);
	}
	return null;
};

const renderWorldcheckDetails = (data: IWorldCheckResult) => {
	if (data?.worldcheck_result_summary === COMMON_RESULT_SUMMARY.ATTENTION) {
		return (
			<>
				{data?.worldcheck_details?.details === COMMON_RESULT_SUMMARY.ATTENTION && (
					<ul>
						<li>{data?.worldcheck_details?.result}</li>
					</ul>
				)}
			</>
		);
	}
	return null;
};

const DiligenceCard: React.FC<{
	diligence: IDueDiligence[];
	children?: React.ReactNode;
}> = ({ diligence, children }) => {
	const [isShowModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const [modalTitle, setModalTitle] = useState("");

	const renderHeaderContent = (panel: IDueDiligence) => {
		const { checkType, data, message } = panel;
		let checkStatus, resultSummary;

		switch (checkType?.trim()) {
			case "DNB":
				checkStatus = data.dnb_check_result?.dnb_check_status;
				resultSummary = data.dnb_check_result?.dnb_result_summary;
				break;
			case "MLCB":
				checkStatus = data.mlcb_check_result?.mlcb_check_status;
				resultSummary = data.mlcb_check_result?.mlcb_result_summary;
				break;
			case "MyInfo":
				checkStatus = data.myInfo_check_result?.myInfo_check_status;
				resultSummary = data.myInfo_check_result?.myInfo_result_summary;
				break;
			case "CBS":
				checkStatus = data.cbs_check_result?.cbs_check_status;
				resultSummary = data.cbs_check_result?.cbs_result_summary;
				break;
			case "Blacklist":
				checkStatus = data.blacklist_check_result?.blacklist_check_status;
				resultSummary = data.blacklist_check_result?.blacklist_result_summary;
				break;
			case "Worldcheck":
				checkStatus = data.worldcheck_result?.worldcheck_check_status;
				resultSummary = data.worldcheck_result?.worldcheck_result_summary;
				break;
			default:
				return null;
		}

		return (
			<div className="flex flex-row gap-2">
				<div>{getStatusContent(panel.message, checkStatus)}</div>
				<a onClick={() => showDetailDiligence(panel)}>{checkType}</a>
				<Text type={getColorTextDiligence(resultSummary)}>{resultSummary}</Text>
			</div>
		);
	};

	const renderPanelContent = (diligence: IDueDiligence) => {
		if (diligence.message === JOB_STATUS.PENDING) return <Skeleton title={false}></Skeleton>;

		if (!diligence?.id || diligence.message === JOB_STATUS.NOT_EXITS) return null;

		const { checkType, data } = diligence;

		const getLastCheck = () => {
			switch (checkType.trim()) {
				case "DNB":
					return data.dnb_check_result?.last_checked;
				case "MLCB":
					return data.mlcb_check_result?.last_checked;
				case "MyInfo":
					return data.myInfo_check_result?.last_checked;
				case "CBS":
					return data.cbs_check_result?.last_checked;
				case "Blacklist":
					return data.blacklist_check_result?.last_checked;
				case "Worldcheck":
					return data.worldcheck_result?.last_checked;
				default:
					return null;
			}
		};

		const lastCheck = getLastCheck();
		let details: JSX.Element | null = null;

		switch (checkType?.trim()) {
			case "DNB":
				details = renderDNBDetails(data?.dnb_check_result);
				break;
			case "MLCB":
				details = renderMLCBDetails(data?.mlcb_check_result);
				break;
			case "MyInfo":
				details = renderMyInfoDetails(data?.myInfo_check_result);
				break;
			case "CBS":
				details = renderCBSDetails(data.cbs_check_result);
				break;
			case "Worldcheck":
				details = renderWorldcheckDetails(data.worldcheck_result);
				break;
			case "Blacklist":
				details = null;
				break;
			default:
				break;
		}

		return (
			<>
				<span>Last Check: {lastCheck}</span>
				{details}
			</>
		);
	};

	const showDetailDiligence = (diligence: IDueDiligence) => {
		if (!diligence.id) return;

		setShowModal(true);
		setModalTitle(`${diligence.checkType} Check result`);

		switch (diligence.checkType?.trim()) {
			case "DNB":
				setModalContent(<ModalDNBHistory id={diligence.id}/>);
				break;
			case "MLCB":
				setModalContent(<ModalMLCBHistory id={diligence.id}/>);
				break;
			case "BlackList":
				setModalContent(<ModalBlackListHistory id={diligence.id}/>);
				break;
			case "CBS":
				setModalContent(<ModalCBSHistory id={diligence.id}/>);
				break;
			case "MyInfo":
				setModalContent(<ModalMyInfoHistory id={diligence.id}/>);
				break;
			case "Worldcheck":
				setModalContent(<ModalWorldCheckHistory id={diligence.id}/>);
				break;
			case "Blacklist":
				setModalContent(<ModalBlackListHistory id={diligence.id}/>);
				break;
			default:
				setModalContent(<div>Unknown panel type</div>);
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-fit">
				{diligence.map((panel, index) => {
					return (
						<Collapse
							className="h-fit"
							key={index}
							defaultActiveKey={["0", "1", "2", "3", "4", "5", "6"]}
							expandIconPosition="end"
							collapsible="icon"
						>
							<Collapse.Panel key={index} header={renderHeaderContent(panel)}>
								{renderPanelContent(panel)}
								{children}
							</Collapse.Panel>
						</Collapse>
					);
				})}
			</div>
			<Modal
				title={modalTitle}
				open={isShowModal}
				width={900}
				onOk={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
				className="max-height-modal"
			>
				{modalContent}
			</Modal>
		</>
	);
};

export default memo(DiligenceCard);
