import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setAppState } from "../../redux/slice/appStateSlice";
import useScrollToTop from "../../hooks/useScrollToTop";

type Props = {
	state?: string;
	children: ReactNode;
};

const PageWrapper = (props: Props) => {
	const dispatch = useAppDispatch();

	useScrollToTop();

	useEffect(() => {
		if (props.state) {
			dispatch(setAppState(props.state));
		}
	}, [dispatch, props]);

	return <>{props.children}</>;
};

export default PageWrapper;
