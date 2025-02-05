import { MenuOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme, Typography } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import menuConfigs from "../../configs/menu.config";
import sizeConfigs from "../../configs/sizeConfigs";
import Header from "../header/Header";
import "./applayout.scss";
import { useAppSelector } from "../../hooks/useAppSelector";

const { Content, Sider } = Layout;
const { Text } = Typography;


const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);

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
