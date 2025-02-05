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
];

export default appRoutes;
