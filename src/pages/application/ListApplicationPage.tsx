import { Card, Table, TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import applicationApi from "../../api/module/application.api";
import SkeletonLoading from "../../components/common/SkeletonLoading";
import {
	MAP_LOAN_TYPE_NAME,
	TOAST_MESSAGE,
} from "../../constants/general.constant";
import {
	IApplication,
	IApplicationSearchInput,
	IApplicationStatistics,
} from "../../interface/application.interface";
import { ITablePaginationConfig } from "../../interface/pagination.interface";
import { formatDate } from "../../utils/utils";
import './application.scss';
import ApplicationBrief from "./components/ApplicationBrief";
import ApplicationSearch from "./components/ApplicationSearch";
import ApplicationTag from "./components/ApplicationTag";
import { INITIAL_STATISTICS } from "./constant/application.constant";

const ListApplication = () => {
	const navigate = useNavigate();

	const [dataTable, setDataTable] = useState<IApplication[]>([]);
	const [paginationConfig, setPaginationConfig] = useState<ITablePaginationConfig>({
		current: 0,
		pageSize: 10,
		total: 0
	})
	const [loadingPage, setLoadingPage] = useState(true);

	const [isSearching, setSearching] = useState(false);
	const [statistics, setStatistics] = useState<IApplicationStatistics>(INITIAL_STATISTICS);

	useEffect(() => {
		const fetchData = async () => {
			await Promise.all([getListApplication(), getListStatistics()]);
			setLoadingPage(false);
		};

		fetchData();
	}, []);

	const getListStatistics = async (params?: IApplicationSearchInput) => {
		try {
			const response = await applicationApi.getStatistics(params);
			if (!response) throw new Error(TOAST_MESSAGE.ERROR);
			setStatistics(response);
		} catch (error) {
			console.log(error);
		}
	};

	const getListApplication = async (params?: IApplicationSearchInput) => {
		try {
			setSearching(true);
			const response = await applicationApi.getListApplication({
				...params,
				page: paginationConfig.current,
				size: paginationConfig.pageSize
			});
			if (!response) throw new Error(TOAST_MESSAGE.ERROR);
			setDataTable(response.data);
			setPaginationConfig({ ...paginationConfig, total: response.totalDocument })
		} catch (error) {
			console.log(error);
		} finally {
			setSearching(false);
		}
	};

	useEffect(() => {
		getListApplication();
	}, [paginationConfig.current, paginationConfig.pageSize]);

	const onSearchApplication = useCallback((formData: IApplicationSearchInput) => {
		getListApplication(formData);
		getListStatistics(formData);
	}, []);

	const onResetFormSearch = () => {
		getListApplication();
		getListStatistics();
	};

	const handleTableChange: TableProps<IApplication>['onChange'] = (pagination, filters, sorter) => {
		setPaginationConfig({
			...paginationConfig,
			current: pagination.current ? pagination.current - 1 : paginationConfig.current,
			pageSize: pagination.pageSize ? pagination.pageSize : paginationConfig.pageSize
		})
		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== paginationConfig?.pageSize) {
			setDataTable([]);
		}
	}

	const columns: TableProps<IApplication>["columns"] = [
		{
			title: "Application ID",
			dataIndex: "id",
			key: "id",
			render: (applicationId: string, record) => (
				<a
					href="#"
					className="text-blue-500"
					onClick={(e) => {
						e.preventDefault();
						navigate(`/application/dashboard/${record.id}`);
					}}
				>
					{record.id}
				</a>
			),
		},
		{
			title: "Borrower Name",
			dataIndex: "borrower",
			key: "borrower",
			render: (_: string, record) => (
				<a
					href="#"
					className="text-blue-500"
					onClick={(e) => {
						e.preventDefault();
						navigate(`/borrower/detail/${record.borrower.id}`);
					}}
				>
					{record.borrower.fullName}
				</a>
			),
		},
		{
			title: "Application Date",
			dataIndex: "dateOfApplication",
			key: "dateOfApplication",
			render: (date: string) => formatDate(date),
		},
		{
			title: "Loan Amount",
			dataIndex: "loanAmount",
			key: "loanAmount",
			render: (amount: number) => `$${amount.toLocaleString()}`,
		},
		{
			title: "Loan Type",
			dataIndex: "loanType",
			key: "loanType",
			render: (type: string, record) => (
				<span>{MAP_LOAN_TYPE_NAME.get(record.loanType)}</span>
			),
		},
		{
			title: "Status",
			dataIndex: "applicationStatus",
			key: "applicationStatus",
			render: (status, record) => (
				<ApplicationTag status={record.applicationStatus}></ApplicationTag>
			),
		},
		{
			title: "Remarks",
			dataIndex: "remarks",
			key: "remarks",
			render: (remarks: string) => <span>{remarks}</span>,
		},
		{
			title: "Last Updated",
			dataIndex: "lastModifiedDate",
			key: "lastModifiedDate",
			render: (type: string, record) => formatDate(record.lastModifiedDate, "DD/MM/YYYY"),
		},
	];

	if (loadingPage) return <SkeletonLoading />;

	return (
		<section>
			<ApplicationBrief {...statistics} />
			<ApplicationSearch
				isSearchingData={isSearching}
				eventResetForm={onResetFormSearch}
				eventSearch={onSearchApplication}
			/>
			<Card
				className="border rounded-md bg-white shadow-sm"
				title={<span className="text-base">Application ({paginationConfig?.total})</span>}
			>
				<Table<IApplication>
					size="small"
					rowKey={(record) => record.id}
					loading={isSearching}
					columns={columns}
					dataSource={dataTable}
					onChange={handleTableChange}
					pagination={{
						pageSize: paginationConfig?.pageSize ? paginationConfig?.pageSize : 20,
						current: paginationConfig?.current ? paginationConfig?.current + 1 : 1,
						total: paginationConfig?.total ? paginationConfig?.total : 0,
						pageSizeOptions: [20, 50, 100],
						showSizeChanger: true,
					}}
					scroll={{ x: 240 }}
				/>
			</Card>
		</section>
	);
};

export default ListApplication;
