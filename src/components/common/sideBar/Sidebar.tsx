import { Drawer, List, Toolbar, Typography } from "@mui/material";
import sizeConfigs from "../../../configs/sizeConfigs";
import { useAppSelector } from "../../../hooks/useAppSelector";
import appRoutes from "../../../routers/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const Sidebar = () => {
	const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: isCollapsed ? sizeConfigs.sidebar.collapsedWidth : sizeConfigs.sidebar.width,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: isCollapsed ? sizeConfigs.sidebar.collapsedWidth : sizeConfigs.sidebar.width,
					boxSizing: "border-box",
					borderRight: "0px",
				},
			}}
			className="ifs-sidebar"
		>
			{!isCollapsed && <Toolbar>{<Typography>LMS Dashboard</Typography>}</Toolbar>}

			<List disablePadding>
				{appRoutes.map((route, index) =>
					route.sidebarProps ? (
						route.child ? (
							<SidebarItemCollapse item={route} key={index}/>
						) : (
							<SidebarItem item={route} key={index}/>
						)
					) : null
				)}
			</List>
		</Drawer>
	);
};

export default Sidebar;
