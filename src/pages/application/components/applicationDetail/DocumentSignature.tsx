import {
	AndroidOutlined,
	AppleOutlined,
	DownloadOutlined,
	EyeOutlined,
} from "@ant-design/icons";
import {
	Button,
	Card,
	Form,
	Input,
	Modal,
	QRCode,
	Select,
	Table,
	Tabs,
	TabsProps,
} from "antd";
import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadDocument from "../upload/UploadDocument";
import applicationApi from "../../../../api/module/application.api";
import { IApplicationDetail } from "../../../../interface/application.interface";
import { toast } from "react-toastify";

import "./DocumentSignature.scss"
import { APPLICATION_STATUS, TOAST_MESSAGE } from "../../../../constants/general.constant";

const { Option } = Select;
const { TextArea } = Input;

interface Document {
	key: string;
	name: string;
	content: string;
}
const items: (applicationDetail: IApplicationDetail) => TabsProps["items"] = (applicationDetail) => {
	return [
		{
			key: "1",
			label: "File Insurance ",
			children: <UploadDocument accept="application/pdf,image/png,image/jpeg" applicationId={applicationDetail.id}></UploadDocument>,
		},
		{
			key: "2",
			label: "File Contract",
			children: <UploadDocument accept="application/pdf,image/png,image/jpeg" applicationId={applicationDetail.id}></UploadDocument>,
		},
		{
			key: "3",
			label: "File Consent",
			children: <UploadDocument accept="application/pdf,image/png,image/jpeg" applicationId={applicationDetail.id}></UploadDocument>,
		},
		{
			key: "4",
			label: "Interview Record",
			children: <UploadDocument accept="video/mp4,audio/mp4,application/mp4" applicationId={applicationDetail.id}></UploadDocument>,
		},
	];
}

const disbursementItems: TabsProps["items"] = [
	{
		key: "1",
		label: "",
		children: <Button className="bg-red-500" onClick={() => { }}>Cancel Disbursement</Button>
	},
	{
		key: "2",
		label: "",
		children: <Button className="bg-red-500" onClick={() => { }}>Manual Disburse</Button>
	},
	{
		key: "3",
		label: "",
		children: <Button className="bg-red-500">Auto Disburse</Button>
	},
]

interface DocumentESignatureProps {
	applicationDetail: IApplicationDetail;
	setApplicationDetail: React.Dispatch<React.SetStateAction<IApplicationDetail>>;
}

const GENERATE_TYPE = {
	ALL: 'All',
	INSURANCE: 'Insurance',
	CONTRACT: 'Contract',
	CONSENT: 'Consent'
}

const ReachableContext = createContext<string | null>(null);

type ModalConfig = {
	title: string | null,
	content: any | null,
	width: string,
	centered: boolean,
	icon: null,
	footer: null,
	maskClosable: boolean,
	style: any,
	className: string,
}

const DocumentESignature: React.FC<DocumentESignatureProps> = ({ applicationDetail, setApplicationDetail }) => {
	const [generateType, setGenerateType] = useState<string>('ALL')
	const methods = useForm({});
	const onSubmit = (data: any) => console.log(data);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modal, contextHolder] = Modal.useModal();
	const [config, setConfig] = useState<ModalConfig>({
		title: null,
		content: null,
		width: '80%',
		centered: true,
		icon: null,
		footer: null,
		maskClosable: true,
		style: {
			height: '90vh'
		},
		className: 'document-modal',
	});

	const [data, setData] = useState<Document[]>([]);

	const columns = [
		{
			title: "Document Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "",
			key: "actions",
			render: (text: string, record: Document) => (
				<>
					<a href="#" onClick={(event) => {
						event.preventDefault();
						setActiveDocument(record.content);
						showDocumentModal();
					}}>
						<EyeOutlined /> Preview
					</a>
					<a href="#" style={{ marginLeft: 16 }} onClick={(event) => {
						event.preventDefault();
						const link = document.createElement('a');
						link.href = record.content;
						link.setAttribute('download', `${record.name}.pdf`);
						link.click();
					}}>
						<DownloadOutlined /> Download
					</a>
				</>
			),
		},
	];

	useEffect(() => {
		if (config && config.content !== null) {
			modal.info(config);
		}
	}, [config]);

	useEffect(() => {
		generateForm();
	}, []);

	const [activeDocument, setActiveDocument] = useState<string>('');

	const showDocumentModal = () => {
		// setIsModalOpen(true);
		setConfig(prevState => ({ ...prevState, content: (<ReachableContext.Consumer>{(documentUrl) => <iframe style={{ width: '100%', height: '90vh' }} src={documentUrl} />}</ReachableContext.Consumer>) }));
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const generateURL = (blob: Blob): string => URL.createObjectURL(blob);

	const b64toBlob = (b64Data: string, contentType = 'application/pdf', sliceSize = 512) => {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		const blob = new Blob(byteArrays, { type: contentType });
		return blob;
	}

	const generateForm = async () => {
		try {
			const response = await applicationApi.generateForm(applicationDetail.id, GENERATE_TYPE[generateType as keyof typeof GENERATE_TYPE].toLowerCase());

			if (!response || !response.files) {
				toast.error("Failed to generate form");
				return;
			}

			if (data && data.length > 0) {
				for (const item of data) {
					URL.revokeObjectURL(item.content);
				}
			}

			setData([]);

			const documentList: Document[] = [];
			for (const key of Object.keys(response.files)) {
				if (response.files[key] !== null) {
					documentList.push({
						key,
						name: response.files[key]['fileName'],
						content: response.files[key]['content'].length > 0 ? generateURL(b64toBlob(response.files[key]['content'].slice(response.files[key]['content'].indexOf(",") + 1))) : '',
					})
				}
			}

			setData(documentList);
			// setData
		} catch (error) {
			console.error("Failed to generate form:", error);
			// setLoading(false);
		}
	}

	const requestCancelDisburse = async () => {
		try {
			const response = await applicationApi.cancelDisburse(applicationDetail.id);
			if (response && response.applicationStatus) {
				setApplicationDetail({ ...applicationDetail, applicationStatus: response.applicationStatus });
				toast.success(TOAST_MESSAGE.SUCCESS);
			}

		} catch (error) {
			console.error("Failed to cancel disburse:", error);
		}
	}

	const requestManualDisburse = async () => {
		try {
			const response = await applicationApi.manualDisburse(applicationDetail.id);
			if (response && response.applicationStatus) {
				setApplicationDetail({ ...applicationDetail, applicationStatus: response.applicationStatus });
				toast.success(TOAST_MESSAGE.SUCCESS);
			}

		} catch (error) {
			console.error("Failed to manual disburse:", error);
		}
	}

	return (
		<>
			<ReachableContext.Provider value={activeDocument || 'Lorem Ipsum'}>
				<Card title="Document e-signature">
					<div
						style={{ marginBottom: 16 }}
						className="grid grid-cols-1 md:grid-cols-2 justify-between"
					>
						<div>
							<p>Generate Documents</p>
							<Select defaultValue={GENERATE_TYPE["ALL"]} style={{ width: 200 }} onChange={(value) => setGenerateType(value)}>
								{Object.keys(GENERATE_TYPE).map((key) => (
									<Option key={key} value={key}>{GENERATE_TYPE[key as keyof typeof GENERATE_TYPE]}</Option>
								))}
							</Select>
						</div>
						<div className="justify-self-end">
							<Button type="primary" style={{ marginLeft: 16 }} onClick={generateForm}>
								Generate
							</Button>
							{/* <Button type="primary" icon={<DownloadOutlined />} disabled={data.length === 0}>
								Download All
							</Button> */}
						</div>
					</div>
					<Table<Document> columns={columns} dataSource={data} pagination={false} />
				</Card>

				<div style={{ marginTop: 16 }} className="border p-4 rounded-md">
					<div className="grid grid-cols-1 md:grid-cols-2">
						<div className="flex flex-col gap-4">
							<div>
								<p className="font-medium">E-GIRO set up:</p>
								<p className="italic">(Please provide this QR code to customer)</p>
							</div>
							<QRCode value={"-"}></QRCode>
						</div>
						<div className="flex flex-col gap-4">
							<div>
								<p className="font-medium">Interbank GIRO info (if any):</p>
							</div>
							<Form layout="horizontal">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
									<Form.Item
										label="Customer’s Name:"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Name (As in Bank Account):"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="ID No:"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Account Number:"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Name of Bank:"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="BIC Code:"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Branch:"
										labelCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
										labelAlign="left"
										wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 12 }}
									>
										<Input />
									</Form.Item>
								</div>
								<div className="justify-self-end">
									<Button
										htmlType="submit"
										className="w-full"
										type="primary"
										variant="solid"
										disabled
									>
										Save
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>

				<Card title="Upload Documents">
					<Tabs defaultActiveKey="1" items={items(applicationDetail)} />
				</Card>

				{applicationDetail.applicationStatus !== APPLICATION_STATUS.DISBURSED && (
					<Card title="Disbursement" className="disbursement-card">
						{/* <Tabs defaultActiveKey="1" items={disbursementItems} /> */}
						<Button onClick={() => { modal.confirm({ title: 'Are you sure you to cancel this application?', onOk: () => { requestCancelDisburse() } }) }} style={{ marginRight: "24px", textDecoration: "underline", color: "#FFFFFF", height: "51px", fontWeight: 500, borderRadius: "8px", backgroundColor: "#D32F2F" }}>Cancel Disbursement</Button>
						<Button onClick={() => { modal.confirm({ title: 'Are you sure you to manually disburse this application?', onOk: () => { requestManualDisburse() } }) }} style={{ marginRight: "24px", textDecoration: "underline", backgroundColor: "#777777", color: "#FFFFFF", height: "51px", fontWeight: 500, borderRadius: "8px" }}>Manual Disburse</Button>
						<Button onClick={() => { modal.confirm({ title: 'Are you sure you to auto disburse this application?', onOk: () => { } }) }} style={{ textDecoration: "underline", backgroundColor: "#777777", color: "#FFFFFF", height: "51px", fontWeight: 500 }}>Auto Disburse</Button>
					</Card>
				)}


				{contextHolder}
			</ReachableContext.Provider>


			{/* <DocumentModal activeDocumentUrl={activeDocument} /> */}
		</>
	);
};

export default DocumentESignature;
