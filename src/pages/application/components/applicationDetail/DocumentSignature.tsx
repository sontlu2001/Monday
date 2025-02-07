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
	QRCode,
	Select,
	Table,
	Tabs,
	TabsProps,
} from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import UploadDocument from "../upload/UploadDocument";

const { Option } = Select;
const { TextArea } = Input;

interface Document {
	key: string;
	name: string;
}
const items: TabsProps["items"] = [
	{
		key: "1",
		label: "File Insurance ",
		children: <UploadDocument></UploadDocument>,
	},
	{
		key: "2",
		label: "File Contract",
		children: <UploadDocument></UploadDocument>,
	},
	{
		key: "3",
		label: "File Consent",
		children: <UploadDocument></UploadDocument>,
	},
	{
		key: "4",
		label: "Interview Record",
		children: <UploadDocument></UploadDocument>,
	},
];

const DocumentESignature: React.FC = () => {
	const methods = useForm({});
	const onSubmit = (data: any) => console.log(data);
	const columns = [
		{
			title: "Document Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: (
				<Button type="primary" icon={<DownloadOutlined />}>
					Download All
				</Button>
			),
			key: "actions",
			render: (text: string, record: Document) => (
				<>
					<a href="#">
						<EyeOutlined /> Preview
					</a>
					<a href="#" style={{ marginLeft: 16 }}>
						<DownloadOutlined /> Download
					</a>
				</>
			),
		},
	];

	const data: Document[] = [
		{
			key: "1",
			name: "IFS_Form_Insurance_temp_v0.1",
		},
		{
			key: "2",
			name: "IFS_Form_Contract_redacted_v0.1",
		},
		{
			key: "3",
			name: "IFS_Form_Consent_redacted_v0.1",
		},
	];

	return (
		<>
			<Card title="Document e-signature">
				<div
					style={{ marginBottom: 16 }}
					className="grid grid-cols-1 md:grid-cols-2 justify-between"
				>
					<div>
						<p>Generate Documents</p>
						<Select defaultValue="All" style={{ width: 200 }}>
							<Option value="all">All</Option>
						</Select>
					</div>
					<div className="justify-self-end">
						<Button type="primary" style={{ marginLeft: 16 }}>
							Generate
						</Button>
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
				<Tabs defaultActiveKey="1" items={items} />
			</Card>
		</>
	);
};

export default DocumentESignature;
