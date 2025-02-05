import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

export const useAppSelector = useSelector.withTypes<IRootState>();
