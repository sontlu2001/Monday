import { useEffect, useState } from "react";
import LoanOfferSaveMode from "./LoanOfferSaveMode";
import { FormProvider, useForm } from "react-hook-form";
import LoanOfferViewMode from "./LoanOfferViewMode";
import ApplicationCard from "./ApplicationCard";
import { Button, Modal, Space, Table } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { APPLICATION_STATUS, TOAST_MESSAGE } from "../../../../constants/general.constant";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import ApplicationModalLayout from "../modal/ApplicationModalLayout";
import RepaymentSchedule from "./RepaymentSchedule";
import loanOfferApi from "../../../../api/module/loanOffer.api";
import LoanOfferHistory from "./LoanOfferHistory";
import { ILoanOffer, ILoanOfferRes, INITIAL_LOAN_OFFER } from "../../../../interface/loanOffer.interface";
import { formatDate } from "../../../../utils/utils";
import { INIT_LOAN_OFFER_REPAYMENT_SCHEDULES } from "../../constant/loanOffer.constant";

const LoanOffer = ({
	isRequestNewOffer,
	setIsRequestNewOffer,
}: {
	isRequestNewOffer: boolean;
	setIsRequestNewOffer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [isSaveLoanOffer, setSaveLoanOffer] = useState(false);
	const [isShowModal, setShowModal] = useState(false);
	const { applicationDetail, fetchApplicationDetail } = useApplicationDetailContext();
	const [loanOfferHistories, setLoanOfferHistories] = useState<ILoanOffer[]>([]);
	const [loanOfferDetail, setLoanOfferDetail] = useState<ILoanOffer>(INITIAL_LOAN_OFFER);
	const [loanOfferRepaymentSchedules, setLoanOfferRepaymentSchedules] = useState<ILoanOfferRes[]>([]);

	const columns = [
		{
			title: 'Time',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (createdDate: string) => formatDate(createdDate, 'DD/MM/YYYY HH:mm:ss'),
		},
		{
			title: 'Create By',
			dataIndex: 'createdBy',
			key: 'createdBy',
		},
	];

	const methods = useForm<ILoanOffer>({});

	const fetchLoanOfferDetail = async () => {
		try {
			const response = await loanOfferApi.getDetailLoanOffer(applicationDetail.loanOffer.id.toString());
			if (!response) {
				toast.error(TOAST_MESSAGE.ERROR);
				return;
			}

			methods.reset(response);
		} catch (error) {
		}
	};

	const fetchLoanOfferRepaymentSchedule = async () => {
		try {
			const response = await loanOfferApi.getRepaymentSchedules({
				loanOfferId: applicationDetail.loanOffer.id,
				sort: 'date,asc',
			});
			if (!response) {
				toast.error(TOAST_MESSAGE.ERROR);
				return;
			}
		} catch (error) {
		}
	};

	useEffect(() => {
		fetchLoanOfferDetail();
		fetchLoanOfferRepaymentSchedule();
	}, []);

	const handleEditLoanOffer = async () => {
		try {
			const loanOfferData = methods.getValues();

			const response = await loanOfferApi.updateLoanOffer(loanOfferData);
			if (!response) {
				toast.error(TOAST_MESSAGE.ERROR);
				return;
			}
			await fetchApplicationDetail();
			toast.success(TOAST_MESSAGE.SUCCESS);
		} catch (error) {
		}
	}

	const viewLoanOfferHistory = async () => {
		setShowModal(true);
		try {
			const response = await loanOfferApi.getLoanOfferHistory(applicationDetail.id);
			if (!response) {
				toast.error(TOAST_MESSAGE.ERROR);
				return;
			}
			setLoanOfferHistories(response);
			setLoanOfferDetail(response[0]);
		} catch (error) {
		}
	};

	const handleCancelNewOrder = async () => {
		try {
			const response = await loanOfferApi.cancelLoanOffer(applicationDetail.loanOffer.id.toString());
			if (!response) {
				toast.error(TOAST_MESSAGE.ERROR);
				return;
			}
			await fetchApplicationDetail();
			setIsRequestNewOffer(false);
			toast.success(TOAST_MESSAGE.SUCCESS);
		} catch (error) {
		}
	};

	const isSaveMode = isRequestNewOffer && !isSaveLoanOffer && applicationDetail.applicationStatus !== APPLICATION_STATUS.EDIT_PENDING;

	return (
		<FormProvider {...methods}>
			<ApplicationCard
				title={
					<span className="font-medium">
						Loan Offer
						<button className="ml-2"><HistoryOutlined className="" onClick={viewLoanOfferHistory} /></button>
					</span>
				}
				extraContent={
					isSaveMode ? (
						<Space>
							<Button color="blue" variant="outlined" onClick={() => setIsRequestNewOffer(false)}>Cancel</Button>
							<Button type="primary" onClick={handleEditLoanOffer}>Submit</Button>
						</Space>
					) : (
						isSaveLoanOffer || applicationDetail.applicationStatus === APPLICATION_STATUS.EDIT_PENDING ? (
							<div className="flex gap-2">
								<Button type="primary" danger onClick={handleCancelNewOrder}>Cancel new offer</Button>
							</div>
						) : (
							<div className="flex gap-2">
								<Button type="primary" onClick={() => setIsRequestNewOffer(true)}>
									Request new offer
								</Button>
							</div>
						)
					)
				}
			>
				{isSaveMode ? <LoanOfferSaveMode /> : <LoanOfferViewMode />}
			</ApplicationCard>
			<Modal
				title={"Loan Offer History"}
				open={isShowModal}
				width={1200}
				onCancel={() => setShowModal(false)}
				footer={[
					<Button type="primary" key="close" onClick={() => setShowModal(false)}>
						Close
					</Button>,
				]}
			>
				<ApplicationModalLayout
					leftContent={
						<Table pagination={false} dataSource={loanOfferHistories} columns={columns} />}
					infoContent={
						<LoanOfferHistory loanOfferDetail={loanOfferDetail} />
					}
					tableContent={<RepaymentSchedule listRepaymentSchedules={INIT_LOAN_OFFER_REPAYMENT_SCHEDULES} onlyViewData={false} />}
				/>
			</Modal>
		</FormProvider>
	)
};

export default LoanOffer;