import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ApplicationPageLayout from "../pages/application/ApplicationPageLayout";
import AssignedApplication from "../pages/application/AssignedApplicationPage";
import ListApplication from "../pages/application/ListApplicationPage";
import BorrowerDetail from "../pages/borrower/BorrowerDetail";
import BorrowerPageLayout from "../pages/borrower/BorrowerPageLayout";
import CreateBorrower from "../pages/borrower/CreateBorrower";
import { RouteType } from "./config";
import { BorrowerProvider } from "../context/BorrowerDetailContext";
import ApplicationDetail from "../pages/application/ApplicationDetail";
import UserPage from "../pages/userManagement/user/UserPage";
import UserPageLayOut from "../pages/userManagement/UserPageLayOut";
import RolesPage from "../pages/userManagement/roles/RolesPage";
import LoanPageLayout from "../pages/loan/LoanPageLayout";
import LoanDetail from "../pages/loan/loanDetail/LoanDetail";
import LoanDashboard from "../pages/loan/loanDasboard/LoanDashboard";
import { Navigate } from "react-router-dom";

const appRoutes: RouteType[] = [
    {
        index: true,
        element: <BorrowerProvider><CreateBorrower /></BorrowerProvider> ,
        state: "borrower.create",
    },
    {
        path: "/borrower",
        element: <BorrowerPageLayout />,
        state: "borrower",
        sidebarProps: {
            displayText: "Borrower Management",
            icon: <AccountBoxOutlinedIcon fontSize="small" />,
        },
        child: [
            {
                index: true,
                element:<BorrowerProvider><CreateBorrower /></BorrowerProvider> ,
                state: "borrower.create",
            },
            {
                path: "/borrower/create",
                element: <BorrowerProvider><CreateBorrower /></BorrowerProvider> ,
                state: "borrower.create",
                sidebarProps: {
                    displayText: "Create Borrower",
                    icon: <PersonAddOutlinedIcon fontSize="small" />,
                },
            },
            {
                path: "/borrower/detail/:slug",
                element: <BorrowerProvider> <BorrowerDetail /> </BorrowerProvider>  ,
                state: "borrower.detail",
            },
        ],
    },
    {
        path: "/application",
        element: <ApplicationPageLayout />,
        state: "application",
        sidebarProps: {
            displayText: "Application Management",
            icon: <AssignmentOutlinedIcon fontSize="small" />,
        },
        child: [
            {
                path: "/application/dashboard/:slug",
                element: <ApplicationDetail />,
                state: "application.detail",
            },
            {
                path: "/application/dashboard",
                element: <ListApplication />,
                state: "application.dashboard",
                sidebarProps: {
                    displayText: "Applications Dashboard",
                    icon: <ListAltOutlinedIcon fontSize="small" />,
                },
            },
            {
                path: "/application/assigned",
                element: <AssignedApplication />,
                state: "application.assigned",
                sidebarProps: {
                    displayText: "Assigned Applications",
                    icon: <AssignmentTurnedInOutlinedIcon fontSize="small" />,
                },
            },
        ],
    },
    {
        path: "/user",
        element: <UserPageLayOut />,
        state: "user",
        child: [
            {
                index: true,
                element: <UserPage />,
                state: "user.list",
            },
            {
                path:"/user/list",
                element: <UserPage />,
                state: "user.list",
            },
            {
                path: "/user/roles",
                element: <RolesPage />,
                state: "user.roles",
            },
        ],
    },
    {
        path: "/loan",
        element: <LoanPageLayout />,
        state: "loan",
        child: [
            {
                index: true,
                element: <Navigate to={'/loan/dashboard'} replace ></Navigate>,
                state: "loan.dashboard",
            },
            {
                path:"/loan/dashboard",
                element: <LoanDashboard />,
                state: "loan.dashboard",
            },
            {
                path: "/loan/detail/:slug",
                element: <LoanDetail />,
                state: "loan.detail",
            },
        ],
    },
];

export default appRoutes;
