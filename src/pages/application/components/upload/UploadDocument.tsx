import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
	name: "file",
	multiple: true,
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	},
};

type UploadDocumentProps = {
	accept: string;
	applicationId: number;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ accept, applicationId }) => (
	<Dragger {...props} accept={accept} beforeUpload={(file) => {
		const acceptMimeType = accept.includes(",") ? accept.split(",") : [accept];
		const isValidFile = acceptMimeType.includes(file.type);
		if (!isValidFile) {
			message.error(`${file.name} is not allowed`);
		}
		return isValidFile;
	}} action={`https://mongw-ifsdev.tdt.asia/api/applications/doc-upload?applicationId=${applicationId}`}>
		<p className="ant-upload-drag-icon">
			<InboxOutlined />
		</p>
		<p className="ant-upload-text">Click or drag file to this area to upload</p>
		<p className="ant-upload-hint">
			Support for a single or bulk upload. Strictly prohibited from uploading company
			data or other banned files.
		</p>
	</Dragger>
);

export default UploadDocument;
