import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const auth = JSON.parse(sessionStorage.getItem('auth'));
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-3-line",
      link: "/dashboard",
      stateVariables: isLanding,
    },
    {
      id: "administration",
      label: "Administration",
      icon: "bx bxs-dashboard",
      link: "/#",
      ModuleID: auth.RoleID === 6 ? 6 : 0,
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "create-elections",
          label: "Create Elections",
          link: "/administration/create-elections",
          parentId: "administration",
          ModuleID: auth?.RoleID
        },
        {
          id: "create-circles",
          label: "Create Circles",
          link: "/administration/create-circles",
          parentId: "administration",
          ModuleID: auth?.RoleID
        },
        {
          id: "localization",
          label: "Localization",
          link: "/administration/localization",
          parentId: "administration",
          ModuleID: auth?.RoleID
        },
        {
          id: "upload-voters",
          label: "Upload-Voters",
          link: "/administration/upload-voters",
          parentId: "administration",
          ModuleID: auth?.RoleID
        },
        {
          id: "create-candidates",
          label: "Create Candidates",
          link: "/administration/create-candidates",
          parentId: "administration",
          ModuleID: auth?.RoleID
        },
        {
          id: "add-users",
          label: "Add Users",
          link: "/administration/add-users",
          parentId: "administration",
          ModuleID: auth?.RoleID === 1 ? 2 : 0
        },
        {
          id: "booth-users",
          label: "Booth Users",
          link: "/administration/booth-users",
          parentId: "administration",
          ModuleID: auth.RoleID === 3 ? 3 : auth.RoleID === 4 ? 4 : auth.RoleID === 5 ? 5 : auth?.RoleID === 1 ? 2 : 0
        },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      icon: "bx bx-layer",
      link: "/#",
      ModuleID: auth.RoleID === 6 ? 6 : auth.RoleID === 1 ? 3 : 0,
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Operations");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: "voters-management",
          label: "Voters Management",
          link: "/operations/voters-management",
          parentId: "operations",
          ModuleID: auth.RoleID === 3 ? 3 : auth.RoleID === 4 ? 4 : auth.RoleID === 5 ? 5 : 0
        },
        {
          id: "refer-voters",
          label: "Refer Voters",
          link: "/operations/refer-voters",
          parentId: "operations",
          ModuleID: 0
        },
        {
          id: "my-refered-voters",
          label: "My Refered Voters",
          link: "/operations/my-refered-voters",
          parentId: "operations",
          ModuleID: 0
        },
        {
          id: "booth-voting",
          label: "Booth Voting",
          link: "/operations/booth-voting",
          parentId: "operations",
          ModuleID: auth.RoleID === 3 ? 3 : auth.RoleID === 4 ? 4 : auth.RoleID === 5 ? 5 : auth.RoleID === 2 ? 3: 0
        },
      ],
    },
    {
      label: "pages",
      isHeader: true,
    },
    {
      id: "data-reports",
      label: "Data Reports",
      icon: "ri-database-line",
      link: "/#",
      ModuleID: auth.RoleID === 6 ? 6 : auth.RoleID === 1 ? 3 : 0,
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("data-reports");
        updateIconSidebar(e);
      },
      stateVariables: isAuth,
      subItems: [
        {
          id: "all-voters-list",
          label: "All Voters List",
          link: "/data-reports/all-voters-list",
          parentId: "data-reports",
          ModuleID: auth.RoleID === 4 ? 4 : auth.RoleID === 5 ? 5 : 0
        },
        {
          id: "all-refered-voters-list",
          label: "All Refered Voters List",
          link: "/data-reports/all-refered-voters-list",
          parentId: "data-reports",
          ModuleID: 0
        },
        {
          id: "roles-wise-selected-voters-list",
          label: "Roles Wise Selected Voters List",
          link: "/data-reports/roles-wise-selected-voters-list",
          parentId: "data-reports",
          ModuleID: auth.RoleID === 5 ? 5 : 0
        },
        {
          id: "booth-wise-report",
          label: "Booth Wise Report",
          link: "/data-reports/booth-wise-report",
          parentId: "data-reports",
          ModuleID: auth.RoleID === 4 ? 4 : auth.RoleID === 5 ? 5 : 0
        },
      ],
    },
    {
      id: "analytical-reports",
      label: "Analytical Reports",
      icon: "bx bx-file",
      link: "/#",
      ModuleID: auth.RoleID === 4 ? 4 : auth.RoleID === 5 ? 5 : auth.RoleID === 6 ? 6 : auth.RoleID === 1 ? 3 : 0,
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("analytical-reports");
        updateIconSidebar(e);
      },
      stateVariables: isPages,
      subItems: [
        {
          id: "area-wise-report",
          label: "Area Wise Report",
          link: "/analytical-reports/area-wise-report",
          parentId: "analytical-reports",
          ModuleID: 0
        },
        {
          id: "school-wise-report",
          label: "School Wise Report",
          link: "/analytical-reports/school-wise-report",
          parentId: "analytical-reports",
          ModuleID: 0
        },
        {
          id: "booth-wise-reports",
          label: "Booth Wise Report",
          link: "/analytical-reports/booth-wise-reports",
          parentId: "analytical-reports",
          ModuleID: 0
        },
        {
          id: "family-name-wise-report",
          label: "Family Name Wise Report",
          link: "/analytical-reports/family-name-wise-report",
          parentId: "analytical-reports",
          ModuleID: 0
        },
      ],
    },
    {
      id: "election-day-report",
      label: "Election Day Report",
      icon: "ri-file-chart-line",
      link: "/#",
      stateVariables: isLanding,
      ModuleID: auth.RoleID === 1 ? 3 : 0,
      click: function (e) {
        e.preventDefault();
        setIsLanding(!isLanding);
        setIscurrentState("Landing");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "report",
          label: "Reports",
          link: "/election-day-report",
          parentId: "election-day-report",
          ModuleID: 0
        }
      ],
    }
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
