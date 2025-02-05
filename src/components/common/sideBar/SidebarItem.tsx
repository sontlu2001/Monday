import React from "react";
import { ListItemButton, ListItemIcon, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import colorConfigs from "../../../configs/color.configs";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RouteType } from "../../../routers/config";
import sizeConfigs from "../../../configs/sizeConfigs";
import './sidebar.scss'

type SideBarItemProps = {
  item: RouteType;
  isChild?: boolean;
};

const SidebarItem = ({ item, isChild = false }: SideBarItemProps) => {
  const { appState } = useAppSelector((state) => state.appState);
  const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

  return item.sidebarProps && item.path ? (
    <Tooltip title={isCollapsed ? item.sidebarProps.displayText : ""} placement="right" arrow>
      <ListItemButton
        component={Link}
        to={item.path}
				className={`ifs-sidebar-item ${appState === item.state ? 'active' : ''}`}
        sx={{
          "&:hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
          },
          backgroundColor:
            appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          paddingLeft: isChild && !isCollapsed ? sizeConfigs.sidebar.childPaddingLeft : "",
        }}
      >
        <ListItemIcon
          sx={{
            color: appState === item.state ? colorConfigs.mainColor : "unset",
            minWidth: isChild && !isCollapsed ? "auto" : "16px",
          }}
        >
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {!isCollapsed && (
          <Typography
            sx={{
              color: appState === item.state ? colorConfigs.mainColor : "unset",
              marginLeft: isChild && !isCollapsed ? sizeConfigs.sidebar.childMarginLeft : "",
            }}
          >
            {item.sidebarProps.displayText}
          </Typography>
        )}
      </ListItemButton>
    </Tooltip>
  ) : null;
};

export default SidebarItem;
