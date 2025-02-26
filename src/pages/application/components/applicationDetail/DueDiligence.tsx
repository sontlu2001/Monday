import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import applicationApi from "../../../../api/module/application.api";
import {
	JOB_STATUS,
	SELECT_MLCB_OPTIONS,
	SOURCE,
} from "../../../../constants/general.constant";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import { IDueDiligence } from "../../../../interface/due.dilegence.api";
import {
	filterNonEmptyValues,
	handleApiResponseError,
} from "../../../../utils/utils";
import { INITIAL_DUE_DILIGENCE_LIST } from "../../constant/application.constant";
import ApplicationCard from "./ApplicationCard";
import DiligenceCard from "./DiligenceCard";

const DueDiligence = () => {
	const [diligence, setDiligence] = useState<IDueDiligence[]>(INITIAL_DUE_DILIGENCE_LIST);

	const { applicationDetail } = useApplicationDetailContext();
	const [selectedType, setSelectedType] = useState<string[]>([]);

	const [isGettingTaskRunning, setTaskRunning] = useState(false);

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		getAllListDueDiligence();
	}, []);

	const getAllListDueDiligence = async () => {
		const response = await applicationApi.getDiligence({
			applicationId: applicationDetail.id,
			checkType: filterNonEmptyValues(
				SELECT_MLCB_OPTIONS.map((option) => option.value)
			),
		});
		if(!response.length) return;

		setDiligence(response);
	};

	const checkTypeDueDiligence = async () => {
    if (!selectedType.length) return;

		try {
			setTaskRunning(true);

			const createTask = await applicationApi.createTask({
				checkType: filterNonEmptyValues(selectedType),
				applicationId:
					applicationDetail.source === SOURCE.FRIDAY
						? applicationDetail.frdAppId
						: applicationDetail.id,
				source: applicationDetail.source,
			});

			let runningTask = await applicationApi.getTaskResult(
				createTask
			);

			let updatedDiligenceList = updateDiligenceList(
				diligence,
				runningTask,
				selectedType
			);
			setDiligence(updatedDiligenceList);

			let failedTasks = getFailedTasks(runningTask);

			setTaskRunning(false);

			while (failedTasks.length) {
				setTaskRunning(true);
				await delay(5000);

				runningTask = await applicationApi.getTaskResult(createTask);

				updatedDiligenceList = updateDiligenceList(
					diligence,
					runningTask,
					selectedType
				);
				setDiligence(updatedDiligenceList);

				failedTasks = getFailedTasks(runningTask);
			}

			setTaskRunning(false);
		} catch (error) {
			handleApiResponseError(error);
			setTaskRunning(false);
		}
	};

	const updateDiligenceList = (
		diligence: IDueDiligence[],
		runningTask: IDueDiligence[],
		selectedType: string[]
	) => {
		return diligence.map((diligen) => {
			const matchingResponse = runningTask.find(
				(task) => task.checkType?.trim() === diligen.checkType?.trim()
			);

			return selectedType.includes(diligen?.checkType.trim())
				? { ...diligen, ...matchingResponse }
				: diligen;
		});
	};

	const getFailedTasks = (responseRunningTask: IDueDiligence[]) => {
		return responseRunningTask.filter(
			(job) =>
				job.message === JOB_STATUS.PENDING || job.status === JOB_STATUS.NOT_EXITS
		);
	};

	return (
		<div>
			<ApplicationCard title={<p className="font-medium">Due Diligence</p>}>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 mb-4">
					<div className="col-span-4 flex gap-4 items-center">
						<span>Check Type</span>
						<Select
							className="min-w-24"
							options={SELECT_MLCB_OPTIONS}
							mode="multiple"
							allowClear
							onChange={setSelectedType}
							placeholder="Select"
						/>
						<Button
							type="primary"
							disabled={!selectedType.length || isGettingTaskRunning}
							loading={isGettingTaskRunning}
							onClick={checkTypeDueDiligence}
						>
							Check
						</Button>
					</div>
				</div>
				<DiligenceCard diligence={diligence} />
			</ApplicationCard>
		</div>
	);
};

export default DueDiligence;
