import { useEffect, useState } from "react";
import LoanOfferSaveMode from "./LoanOfferSaveMode";
import { FormProvider, useForm } from "react-hook-form";
import { ILoanOffer } from "../../../../interface/application.interface";
import LoanOfferViewMode from "./LoanOfferViewMode";
import ApplicationCard from "./ApplicationCard";
import { Button } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import loanOfferApi from "../../../../api/module/loanOffer.api";
import { toast } from "react-toastify";
import { TOAST_MESSAGE } from "../../../../constants/general.constant";

const LoanOffer = () => {
	const [isEditLoanOffer, setEditLoanOffer] = useState(false);
	const [isSaveLoanOffer, setSaveLoanOffer] = useState(false);
	const paramsUrl = useParams();

	const methods = useForm<ILoanOffer>({});

	const fetchLoanOfferDetail = async() => {
		try {
			const response = await loanOfferApi.getDetailLoanOffer("4");
			if (!response) {
        toast.error(TOAST_MESSAGE.ERROR);
        return;
      }
			methods.reset(response);
		} catch (error) {
		}
	};

	useEffect(() => {
		fetchLoanOfferDetail();
	}, []);

	return (
		<FormProvider {...methods}>
			<ApplicationCard
				title={
					<span className="font-medium">
						Loan Offer
						<button className="ml-2"><HistoryOutlined className="" /></button>
					</span>
				}
				extraContent={
					isEditLoanOffer && !isSaveLoanOffer ? (
						<Button type="primary" onClick={()=> setSaveLoanOffer(true)}>Submit</Button>
					) : (
						isSaveLoanOffer ? (
							<div className="flex gap-2">
								<Button type="primary" danger>Cancel new offer</Button>
								<Button type="primary" disabled>
									Request new offer
								</Button>
							</div>
						) : (
							<div className="flex gap-2">
							<Button type="primary" disabled>Cancel new offer</Button>
								<Button type="primary" onClick={() => setEditLoanOffer(true)}>
									Request new offer
								</Button>
							</div>
						)
					)
				}
			>
				{isEditLoanOffer && !isSaveLoanOffer ? (
					<LoanOfferSaveMode />
				) : (
					<LoanOfferViewMode/>
				)}
			</ApplicationCard>
		</FormProvider>
	)
};

export default LoanOffer;
