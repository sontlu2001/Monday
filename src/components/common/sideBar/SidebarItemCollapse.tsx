import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import {
	Box,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RouteType } from "../../../routers/config";
import SidebarItem from "./SidebarItem";
import "./sidebar.scss";

type SidebarItemCollapseProps = {
	item: RouteType;
};

const SidebarItemCollapse = ({ item }: SidebarItemCollapseProps) => {
	const [open, setOpen] = useState(false);

	const { appState } = useAppSelector((state) => state.appState);

	const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

	useEffect(() => {
		if (appState.includes(item.state)) {
			setOpen(true);
		}
	}, [appState, item]);

	return item.sidebarProps ? (
		<>
			<Box className={isCollapsed ? "ifs-collapsible-sidebar-item" : ""}>
				<Tooltip
					title={isCollapsed ? item.sidebarProps.displayText : ""}
					placement="right"
					arrow
				>
					<ListItemButton onClick={() => setOpen(!open)}>
						<ListItemIcon sx={{ color: "unset" }}>
							{item.sidebarProps.icon && item.sidebarProps.icon}
						</ListItemIcon>
						<ListItemText
							disableTypography
							primary={<Typography>{item.sidebarProps.displayText}</Typography>}
						/>
						{open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
					</ListItemButton>
				</Tooltip>
				<Collapse in={open} timeout="auto">
					<List sx={{ paddingBottom: "0" }}>
						{item.child?.map((route, index) =>
							route.sidebarProps ? (
								route.child ? (
									<SidebarItemCollapse item={route} key={index} />
								) : (
									<SidebarItem item={route} key={index} isChild={true} />
								)
							) : null
						)}
					</List>
				</Collapse>
			</Box>
		</>
	) : null;
};

export default SidebarItemCollapse;
