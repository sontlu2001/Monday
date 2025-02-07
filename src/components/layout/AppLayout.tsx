import { Layout, Menu, MenuProps } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import menuConfigs from "../../configs/menu.config";
import sizeConfigs from "../../configs/sizeConfigs";
import useSidebarCollapse from "../../hooks/useSidebarCollapse";
import Header from "../header/Header";
import "./applayout.scss";

const { Content, Sider } = Layout;

const AppLayout = () => {
	const [collapsed, setCollapsed] = useSidebarCollapse();
	const location = useLocation();
	const navigate = useNavigate();

	const openKeyMenuSideBar = menuConfigs.find(
		(menu) =>
			(menu.children &&
				menu.children.some((child) => child.key.includes(location.pathname))) ||
			menu.key.includes(location.pathname)
	);

	const onClick: MenuProps["onClick"] = (e) => {
		navigate(`${e.key}`);
	};

	return (
		<Layout>
			<Header />
			<Layout>
				<Sider
					collapsible
					theme="light"
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					width={sizeConfigs.sidebar.width}
					className="fixed-sider"
				>
					<Menu
						onClick={onClick}
						defaultSelectedKeys={[location.pathname]}
						defaultOpenKeys={[openKeyMenuSideBar ? openKeyMenuSideBar?.key : ""]}
						mode="inline"
						theme="light"
						style={{ borderRight: 0 }}
						items={menuConfigs}
					/>
				</Sider>

				<Layout
					className="site-layout"
					style={{
						marginLeft: collapsed
							? sizeConfigs.sidebar.collapsedWidth
							: sizeConfigs.sidebar.width,
					}}
				>
					<Content className="ifs-app-content">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
