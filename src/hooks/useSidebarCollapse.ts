import { useEffect, useState } from "react";

const useSidebarCollapse = (): [boolean, (value: boolean) => void] => {
	const [collapsed, setCollapsed] = useState(window.innerWidth < 992);

	useEffect(() => {
		const handleResize = () => setCollapsed(window.innerWidth < 992);

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return [collapsed, setCollapsed];
};

export default useSidebarCollapse;
