import { useEffect, useState } from "react";
import LoanOfferSaveMode from "./LoanOfferSaveMode";
import { FormProvider, useForm } from "react-hook-form";
import { ILoanOffer } from "../../../../interface/application.interface";
import LoanOfferViewMode from "./LoanOfferViewMode";
import ApplicationCard from "./ApplicationCard";
import { Button } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const LoanOffer = () => {
	const [isEditLoanOffer, setEditLoanOffer] = useState(false);
	const [isSaveLoanOffer, setSaveLoanOffer] = useState(false);
	const paramsUrl = useParams();

	const methods = useForm<ILoanOffer>({
		defaultValues: {
			loanType: "U",
			loanPurpose: "Education",
			applicationDate: "16-01-2024",
			loanAmountOffer: 8000,
			loanTenorOffer: 12,
			installments: 6,
			installmentFrequency: "Monthly",
			installmentDate: "16-01-2024",
			book: "Bank book",
			paymentType: "GIRO",
			cbsScore: 1800,
			cbsPd: 3.5,
			remarks: "Business plan validate",
			monthlyInterestRate: 1.5,
			interestFrequency: "Monthly",
			interestCalculationMethod: "Reducing interest",
			adminFee: 2,
			adminFeePercentage: 0.5,
			lateFee: 40,
			lateFeePercentage: 5,
		},
	});

	const fetchLoanOfferDetail = () => {
		// try {
		// 	const res = 
		// } catch (error) {
			
		// }
	};

	useEffect(() => {
		fetchLoanOfferDetail();
	}, [paramsUrl.slug]);

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
