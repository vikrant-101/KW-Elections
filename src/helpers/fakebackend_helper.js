import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

// Calendar
// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// get Events
export const getCategories = () => api.get(url.GET_CATEGORIES);

// get Upcomming Events
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);

// add Events
export const addNewEvent = (event) => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = (event) => api.put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = (event) =>
  api.delete(url.DELETE_EVENT, { headers: { event } });

// Chat
// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get Messages
export const getMessages = (roomId) =>
  api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message) => api.create(url.ADD_MESSAGE, message);

// add Message
export const deleteMessage = (message) =>
  api.delete(url.DELETE_MESSAGE, { headers: { message } });

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);

// MailBox
//get Mail
export const getMailDetails = () => api.get(url.GET_MAIL_DETAILS);

// delete Mail
export const deleteMail = (forId) =>
  api.delete(url.DELETE_MAIL, { headers: { forId } });

// Ecommerce
// get Products
export const getProducts = () => api.get(url.GET_PRODUCTS);

// delete Product
export const deleteProducts = (product) =>
  api.delete(url.DELETE_PRODUCT + "/" + product);

// add Products
export const addNewProduct = (product) =>
  api.create(url.ADD_NEW_PRODUCT, product);

// update Products
export const updateProduct = (product) =>
  api.update(url.UPDATE_PRODUCT + "/" + product._id, product);

// get Orders
export const getOrders = () => api.get(url.GET_ORDERS);

// add Order
export const addNewOrder = (order) => api.create(url.ADD_NEW_ORDER, order);

// update Order
export const updateOrder = (order) =>
  api.update(url.UPDATE_ORDER + "/" + order._id, order);

// delete Order
export const deleteOrder = (order) =>
  api.delete(url.DELETE_ORDER + "/" + order);

// get Customers
export const getCustomers = () => api.get(url.GET_CUSTOMERS);

// add Customers
export const addNewCustomer = (customer) =>
  api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers
export const updateCustomer = (customer) =>
  api.update(url.UPDATE_CUSTOMER + "/" + customer._id, customer);

// delete Customers
export const deleteCustomer = (customer) =>
  api.delete(url.DELETE_CUSTOMER + "/" + customer);

// get Sellers
export const getSellers = () => api.get(url.GET_SELLERS);

// Project
// get Project list
export const getProjectList = () => api.get(url.GET_PROJECT_LIST);

// Tasks
// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);

// add Task
export const addNewTask = (task) => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = (task) =>
  api.update(url.UPDATE_TASK + "/" + task._id, task);

// delete Task
export const deleteTask = (task) => api.delete(url.DELETE_TASK + "/" + task);

// CRM
// get Contacts
export const getContacts = () => api.get(url.GET_CONTACTS);

// add Contact
export const addNewContact = (contact) =>
  api.create(url.ADD_NEW_CONTACT, contact);

// update Contact
export const updateContact = (contact) =>
  api.update(url.UPDATE_CONTACT + "/" + contact._id, contact);

// delete Contact
export const deleteContact = (contact) =>
  api.delete(url.DELETE_CONTACT + "/" + contact);

// get Companies
export const getCompanies = () => api.get(url.GET_COMPANIES);

// add Companies
export const addNewCompanies = (company) =>
  api.create(url.ADD_NEW_COMPANIES, company);

// update Companies
export const updateCompanies = (company) =>
  api.update(url.UPDATE_COMPANIES + "/" + company._id, company);

// delete Companies
export const deleteCompanies = (company) =>
  api.delete(url.DELETE_COMPANIES + "/" + company);

// get Deals
export const getDeals = () => api.get(url.GET_DEALS);

// get Leads
export const getLeads = () => api.get(url.GET_LEADS);

// add Lead
export const addNewLead = (lead) => api.create(url.ADD_NEW_LEAD, lead);

// update Lead
export const updateLead = (lead) =>
  api.update(url.UPDATE_LEAD + "/" + lead._id, lead);

// delete Lead
export const deleteLead = (lead) => api.delete(url.DELETE_LEAD + "/" + lead);

// Crypto
// Transation
export const getTransationList = () => api.get(url.GET_TRANSACTION_LIST);

// Order List
export const getOrderList = () => api.get(url.GET_ORDRER_LIST);

// Invoice
//get Invoice
export const getInvoices = () => api.get(url.GET_INVOICES);

// add Invoice
export const addNewInvoice = (invoice) =>
  api.create(url.ADD_NEW_INVOICE, invoice);

// update Invoice
export const updateInvoice = (invoice) =>
  api.update(url.UPDATE_INVOICE + "/" + invoice._id, invoice);

// delete Invoice
export const deleteInvoice = (invoice) =>
  api.delete(url.DELETE_INVOICE + "/" + invoice);

// Support Tickets
// Tickets
export const getTicketsList = () => api.get(url.GET_TICKETS_LIST);

// add Tickets
export const addNewTicket = (ticket) => api.create(url.ADD_NEW_TICKET, ticket);

// update Tickets
export const updateTicket = (ticket) =>
  api.update(url.UPDATE_TICKET + "/" + ticket._id, ticket);

// delete Tickets
export const deleteTicket = (ticket) =>
  api.delete(url.DELETE_TICKET + "/" + ticket);

// Dashboard Analytics

// Sessions by Countries
export const getAllData = () => api.get(url.GET_ALL_DATA);
export const getHalfYearlyData = () => api.get(url.GET_HALFYEARLY_DATA);
export const getMonthlyData = () => api.get(url.GET_MONTHLY_DATA);

// Audiences Metrics
export const getAllAudiencesMetricsData = () =>
  api.get(url.GET_ALLAUDIENCESMETRICS_DATA);
export const getMonthlyAudiencesMetricsData = () =>
  api.get(url.GET_MONTHLYAUDIENCESMETRICS_DATA);
export const getHalfYearlyAudiencesMetricsData = () =>
  api.get(url.GET_HALFYEARLYAUDIENCESMETRICS_DATA);
export const getYearlyAudiencesMetricsData = () =>
  api.get(url.GET_YEARLYAUDIENCESMETRICS_DATA);

// Users by Device
export const getTodayDeviceData = () => api.get(url.GET_TODAYDEVICE_DATA);
export const getLastWeekDeviceData = () => api.get(url.GET_LASTWEEKDEVICE_DATA);
export const getLastMonthDeviceData = () =>
  api.get(url.GET_LASTMONTHDEVICE_DATA);
export const getCurrentYearDeviceData = () =>
  api.get(url.GET_CURRENTYEARDEVICE_DATA);

// Audiences Sessions by Country
export const getTodaySessionData = () => api.get(url.GET_TODAYSESSION_DATA);
export const getLastWeekSessionData = () =>
  api.get(url.GET_LASTWEEKSESSION_DATA);
export const getLastMonthSessionData = () =>
  api.get(url.GET_LASTMONTHSESSION_DATA);
export const getCurrentYearSessionData = () =>
  api.get(url.GET_CURRENTYEARSESSION_DATA);

// Dashboard CRM

// Balance Overview
export const getTodayBalanceData = () => api.get(url.GET_TODAYBALANCE_DATA);
export const getLastWeekBalanceData = () =>
  api.get(url.GET_LASTWEEKBALANCE_DATA);
export const getLastMonthBalanceData = () =>
  api.get(url.GET_LASTMONTHBALANCE_DATA);
export const getCurrentYearBalanceData = () =>
  api.get(url.GET_CURRENTYEARBALANCE_DATA);

// Dial Type
export const getTodayDealData = () => api.get(url.GET_TODAYDEAL_DATA);
export const getWeeklyDealData = () => api.get(url.GET_WEEKLYDEAL_DATA);
export const getMonthlyDealData = () => api.get(url.GET_MONTHLYDEAL_DATA);
export const getYearlyDealData = () => api.get(url.GET_YEARLYDEAL_DATA);

// Sales Forecast
export const getOctSalesData = () => api.get(url.GET_OCTSALES_DATA);
export const getNovSalesData = () => api.get(url.GET_NOVSALES_DATA);
export const getDecSalesData = () => api.get(url.GET_DECSALES_DATA);
export const getJanSalesData = () => api.get(url.GET_JANSALES_DATA);

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(url.GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(url.GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () =>
  api.get(url.GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(url.GET_YEARREVENUE_DATA);

// Dashboard Crypto
// Portfolio
export const getBtcPortfolioData = () => api.get(url.GET_BTCPORTFOLIO_DATA);
export const getUsdPortfolioData = () => api.get(url.GET_USDPORTFOLIO_DATA);
export const getEuroPortfolioData = () => api.get(url.GET_EUROPORTFOLIO_DATA);

// Market Graph
export const getAllMarketData = () => api.get(url.GET_ALLMARKETDATA_DATA);
export const getYearMarketData = () => api.get(url.GET_YEARMARKET_DATA);
export const getMonthMarketData = () => api.get(url.GET_MONTHMARKET_DATA);
export const getWeekMarketData = () => api.get(url.GET_WEEKMARKET_DATA);
export const getHourMarketData = () => api.get(url.GET_HOURMARKET_DATA);

// Dashboard Project
// Project Overview
export const getAllProjectData = () => api.get(url.GET_ALLPROJECT_DATA);
export const getMonthProjectData = () => api.get(url.GET_MONTHPROJECT_DATA);
export const gethalfYearProjectData = () =>
  api.get(url.GET_HALFYEARPROJECT_DATA);
export const getYearProjectData = () => api.get(url.GET_YEARPROJECT_DATA);

// Project Status
export const getAllProjectStatusData = () =>
  api.get(url.GET_ALLPROJECTSTATUS_DATA);
export const getWeekProjectStatusData = () =>
  api.get(url.GET_WEEKPROJECTSTATUS_DATA);
export const getMonthProjectStatusData = () =>
  api.get(url.GET_MONTHPROJECTSTATUS_DATA);
export const getQuarterProjectStatusData = () =>
  api.get(url.GET_QUARTERPROJECTSTATUS_DATA);

// Dashboard NFT
// Marketplace
export const getAllMarketplaceData = () => api.get(url.GET_ALLMARKETPLACE_DATA);
export const getMonthMarketplaceData = () =>
  api.get(url.GET_MONTHMARKETPLACE_DATA);
export const gethalfYearMarketplaceData = () =>
  api.get(url.GET_HALFYEARMARKETPLACE_DATA);
export const getYearMarketplaceData = () =>
  api.get(url.GET_YEARMARKETPLACE_DATA);

// Project
export const addProjectList = (project) =>
  api.create(url.ADD_NEW_PROJECT, project);
export const updateProjectList = (project) =>
  api.put(url.UPDATE_PROJECT, project);
export const deleteProjectList = (project) =>
  api.delete(url.DELETE_PROJECT, { headers: { project } });

// Pages > Team
export const getTeamData = (team) => api.get(url.GET_TEAMDATA, team);
export const deleteTeamData = (team) =>
  api.delete(url.DELETE_TEAMDATA, { headers: { team } });
export const addTeamData = (team) => api.create(url.ADD_NEW_TEAMDATA, team);
export const updateTeamData = (team) => api.put(url.UPDATE_TEAMDATA, team);

// File Manager

// Folder
export const getFolders = (folder) => api.get(url.GET_FOLDERS, folder);
export const deleteFolder = (folder) =>
  api.delete(url.DELETE_FOLDER, { headers: { folder } });
export const addNewFolder = (folder) => api.create(url.ADD_NEW_FOLDER, folder);
export const updateFolder = (folder) => api.put(url.UPDATE_FOLDER, folder);

// File
export const getFiles = (file) => api.get(url.GET_FILES, file);
export const deleteFile = (file) =>
  api.delete(url.DELETE_FILE, { headers: { file } });
export const addNewFile = (file) => api.create(url.ADD_NEW_FILE, file);
export const updateFile = (file) => api.put(url.UPDATE_FILE, file);

// To Do
export const getTodos = (todo) => api.get(url.GET_TODOS, todo);
export const deleteTodo = (todo) =>
  api.delete(url.DELETE_TODO, { headers: { todo } });
export const addNewTodo = (todo) => api.create(url.ADD_NEW_TODO, todo);
export const updateTodo = (todo) => api.put(url.UPDATE_TODO, todo);

// To do Project
export const getProjects = (project) => api.get(url.GET_PROJECTS, project);
export const addNewProject = (project) =>
  api.create(url.ADD_NEW_TODO_PROJECT, project);

//Job Application
export const getJobApplicationList = () => api.get(url.GET_APPLICATION_LIST);

//API Key
export const getAPIKey = () => api.get(url.GET_API_KEY);

//Localization
export const getLocalization = () => api.get(url.GET_LOCALIZATION);
export const getLocalizationTableColumnNames = ({ moduleName: module }) =>
  api.create(url.GET_LOCALIZATION_TABLE_COLUMN_NAMES, { module });
export const addLocalization = (localization) =>
  api.create(url.POST_LOCALIZATION, localization);
export const updateLocalization = (localization) =>
  api.update(url.UPDATE_LOCALIZATION, localization);
export const deleteLocalization = (localization) =>
  api.create(url.DELETE_LOCALIZATION, localization);
export const getScreens = () => api.get(url.GET_SCREENS);
export const getDevices = () => api.get(url.GET_DEVICES);

//Elections
export const getElections = () => api.get(url.GET_ELECTIONS);
export const getElectionsTableColumnNames = ({ moduleName: module }) =>
  api.create(url.GET_ELECTIONS_TABLE_COLUMN_NAMES, { module });
export const addElections = (elections) =>
  api.create(url.POST_ELECTIONS, elections);
export const updateElections = (elections) =>
  api.update(url.UPDATE_ELECTIONS, elections);
export const deleteElections = (elections) =>
  api.create(url.DELETE_ELECTIONS, elections);
export const activateDeactivateElections = (elections) =>
  api.update(url.ACTIVATE_DEACTIVATE_ELECTIONS, elections);

//Circles
export const getCircles = () => api.get(url.GET_CIRCLES);
export const getCirclesTableColumnNames = ({ moduleName: module }) =>
  api.create(url.GET_CIRCLES_TABLE_COLUMN_NAMES, { module });
export const addCircles = (circles) => api.create(url.POST_CIRCLES, circles);
export const updateCircles = (circles) =>
  api.update(url.UPDATE_CIRCLES, circles);
export const deleteCircles = (circles) =>
  api.create(url.DELETE_CIRCLES, circles);
export const activateDeactivateCircles = (circles) =>
  api.update(url.ACTIVATE_DEACTIVATE_CIRCLES, circles);

//Refer Voters
export const getReferVoters = (refervoters) => api.create(url.GET_REFER_VOTERS, refervoters);
export const getReferVotersTableColumnNames = ({ moduleName: module }) =>
  api.create(url.GET_REFER_VOTERS_TABLE_COLUMN_NAMES, { module });
export const addReferVoters = (referVoters) =>
  api.create(url.POST_REFER_VOTERS, referVoters);
export const updateReferVoters = (referVoters) =>
  api.update(url.UPDATE_REFER_VOTERS, referVoters);
export const deleteReferVoters = (referVoters) =>
  api.create(url.DELETE_REFER_VOTERS, referVoters);
export const activateDeactivateReferVoters = (referVoters) =>
  api.update(url.ACTIVATE_DEACTIVATE_REFER_VOTERS, referVoters);

//My Refer Voters
export const getMyReferedVoters = (myReferedVoters) => api.create(url.GET_MY_REFERED_VOTERS, myReferedVoters);
export const getMyReferedVotersTableColumnNames = ({ moduleName: module }) =>
  api.create(url.GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES, { module });
export const addMyReferedVoters = (myReferVoters) =>
  api.create(url.POST_MY_REFERED_VOTERS, myReferVoters);
export const updateMyReferedVoters = (myReferVoters) =>
  api.update(url.UPDATE_MY_REFERED_VOTERS, myReferVoters);
export const deleteMyReferedVoters = (myReferVoters) =>
  api.create(url.DELETE_MY_REFERED_VOTERS, myReferVoters);
export const activateDeactivateMyReferedVoters = (myReferVoters) =>
  api.update(url.ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS, myReferVoters);

//Upload Voters
export const getElectionCircle = () => api.get(url.GET_ELECTION_CIRCLE);
export const getUploadVotersTableColumnNames = ({ moduleName: module }) => api.create(url.GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES, { module });
export const addUploadVoters = (uploadVoters) => api.create('https://kwelections.uc.r.appspot.com/uploadHandler', uploadVoters);
export const UploadVoters = (voters)=>  api.create('https://us-central1-kwelections.cloudfunctions.net/CSVtoJSON', voters)
export const addElectionCircle = (electionCircle) =>
  api.create(url.POST_ELECTION_CIRCLE, electionCircle);
export const updateUploadVoters = (uploadVoters) =>
  api.update(url.UPDATE_UPLOAD_VOTERS, uploadVoters);
export const deleteUploadVoters = (uploadVoters) =>
  api.create(url.DELETE_UPLOAD_VOTERS, uploadVoters);
export const activateDeactivateUploadVoters = (uploadVoters) =>
  api.update(url.ACTIVATE_DEACTIVATE_UPLOAD_VOTERS, uploadVoters);

//Election Day Report
export const getElectionDayReport = (userId) => api.create(url.GET_ELECTIONDAY_REPORT, userId);
export const getElectionDayReportColumnNames = ({ moduleName: module }) => api.create(url.GET_ELECTIONDAY_REPORT_COLUMN_NAMES, { module });

//Candidates
export const getCandidates = () => api.get(url.GET_CANDIDATES);
export const getCandidatesTableColumnNames = ({ moduleName: module }) => api.create(url.GET_CANDIDATES_TABLE_COLUMN_NAMES, { module });
export const addCandidates = (candidates) => api.create(url.POST_CANDIDATES, candidates);
export const updateCandidates = (candidates) => api.update(url.UPDATE_CANDIDATES, candidates);
export const deleteCandidates = (candidates) => api.create(url.DELETE_CANDIDATES, candidates);
export const activateDeactivateCandidates = (candidates) => api.update(url.ACTIVATE_DEACTIVATE_CANDIDATES, candidates);
export const checkPhoneNumber = (phone) => api.create(url.CHECK_PHONE_NUMBER, phone)

// Voters
export const getVoters = (voters) => api.create(url.GET_VOTERS, voters);
export const getVotersTableColumnNames = ({ moduleName: module }) => api.create(url.GET_VOTERS_TABLE_COLUMN_NAMES, { module });
export const addVoters = (voters) => api.create(url.POST_VOTERS, voters);
export const updateVoters = (voters) => api.update(url.UPDATE_VOTERS, voters);
export const deleteVoters = (voters) => api.create(url.DELETE_VOTERS, voters);
export const activateDeactivateVoters = (voters) => api.update(url.ACTIVATE_DEACTIVATE_VOTERS, voters)
export const activateVoters = (voters) => api.update(url.ACTIVATE_VOTERS, voters)
export const getPrintDetail = (userID) => api.update(url.GET_PRINTDETAIL, userID );

// Booth Voters
export const getBoothVoters = (boothvoters) => api.create(url.GET_BOOTHVOTERS, boothvoters);
export const getBoothVotersTableColumnNames = ({ moduleName: module }) => api.create(url.GET_BOOTHVOTERS_TABLE_COLUMN_NAMES, { module });
export const addBoothVoters = (boothvoters) => api.create(url.POST_BOOTHVOTERS, boothvoters);
export const updateBoothVoters = (boothvoters) => api.update(url.UPDATE_BOOTHVOTERS, boothvoters);
export const deleteBoothVoters = (boothvoters) => api.create(url.DELETE_BOOTHVOTERS, boothvoters);
export const activateDeactivateBoothVoters = (boothvoters) => api.update(url.ACTIVATE_DEACTIVATE_BOOTHVOTERS, boothvoters)
export const activateBoothVoters = (boothvoters) => api.update(url.ACTIVATE_BOOTHVOTERS, boothvoters)
export const getClassBoothVoters = ({classNo: classNo}) => api.update(url.GET_CLASS_BOOTHVOTERS, { classNo });
export const getBoothUserDetail = ({userID}) => {
  return api.update(url.GET_BOOTHUSER_DETAIL, {userID: userID});
};

// Classes
export const getClasses = ({userID}) => api.update(url.GET_CLASSES, {userID: userID});
export const getClassesTableColumnNames = ({ moduleName: module }) => api.create(url.GET_CLASSES_TABLE_COLUMN_NAMES, { module });
export const addClasses = (classes) => api.create(url.POST_CLASSES, classes);
export const updateClasses = (classes) => api.update(url.UPDATE_CLASSES, classes);
export const deleteClasses = (classes) => api.create(url.DELETE_CLASSES, classes);
export const activateDeactivateClasses = (classes) => api.update(url.ACTIVATE_DEACTIVATE_CLASSES, classes)

//addUsers

export const getUsers = (users) => api.create(url.GET_USERS, users);
export const getUsersTableColumnNames = ({ moduleName: module }) => api.create(url.GET_USERS_TABLE_COLUMN_NAMES, { module });
export const addUsers = (users) => api.create(url.POST_USERS, users);
export const updateUsers = (users) => api.update(url.UPDATE_USERS, users);
export const deleteUsers = (users) => api.create(url.DELETE_USERS, users);
export const activateDeactivateUsers = (users) => api.update(url.ACTIVATE_DEACTIVATE_USERS, users)

//boothusers

export const getBoothUsers = (boothusers) => api.create(url.GET_BOOTHUSERS, boothusers);
export const getBoothUsersTableColumnNames = ({ moduleName: module }) => api.create(url.GET_USERS_TABLE_COLUMN_NAMES, { module });
export const addBoothUsers = (boothusers) => api.create(url.POST_BOOTHUSERS, boothusers);
export const updateBoothUsers = (boothusers) => api.update(url.UPDATE_BOOTHUSERS, boothusers);
export const deleteBoothUsers = (boothusers) => api.create(url.DELETE_BOOTHUSERS, boothusers);
export const activateDeactivateBoothUsers = (boothusers) => api.update(url.ACTIVATE_DEACTIVATE_BOOTHUSERS, boothusers)


//add Roles
export const getRoles = (roles) => api.create(url.GET_ROLES, roles);
export const getRolesTableColumnNames = ({ moduleName: module }) => api.create(url.GET_ROLES_TABLE_COLUMN_NAMES, { module });
export const addRoles = (roles) => api.create(url.POST_ROLES, roles);
export const updateRoles = (roles) => api.update(url.UPDATE_ROLES, roles);
export const deleteRoles = (roles) => api.create(url.DELETE_ROLES, roles);
export const activateDeactivateRoles = (roles) => api.update(url.ACTIVATE_DEACTIVATE_ROLES, roles);

// Voters Management
export const getVotersManagement = ({classNo: classNo}) => api.create(url.GET_VOTERSMANAGEMENT, {classNo});
export const getVotersManagementTableColumnNames = ({ moduleName: module }) => api.create(url.GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES, { module });
export const addVotersManagement = (votersmanagement) => api.create(url.POST_VOTERSMANAGEMENT, votersmanagement);
export const updateVotersManagement = (votersmanagement) => api.update(url.UPDATE_VOTERSMANAGEMENT, votersmanagement);
export const deleteVotersManagement = (votersmanagement) => api.create(url.DELETE_VOTERSMANAGEMENT, votersmanagement);
export const activateDeactivateVotersManagement = (votersmanagement) => api.update(url.ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT, votersmanagement);

// Analytical Report
export const getAreaWiseReport = (userID) => api.create(url.GET_AREAWISE_REPORT, userID);
export const getAreaWiseTableColumnNames = ({ moduleName: module }) => api.create(url.GET_AREAWISE_TABLE_COLUMN_NAMES, { module });
export const getSchoolWiseReport = (userID) => api.create(url.GET_SCHOOLWISE_REPORT, userID);
export const getSchoolWiseTableColumnNames = ({ moduleName: module }) => api.create(url.GET_AREAWISE_TABLE_COLUMN_NAMES, { module });
export const getBoothWiseReport = (userID) => api.create(url.GET_BOOTHWISE_REPORT, userID);
export const getBoothWiseTableColumnNames = ({ moduleName: module }) => api.create(url.GET_AREAWISE_TABLE_COLUMN_NAMES, { module });
export const getFamilyNameWiseReport = (userID) => api.create(url.GET_FAMILYNAMEWISE_REPORT, userID);
export const getFamilyNameWiseTableColumnNames = ({ moduleName: module }) => api.create(url.GET_AREAWISE_TABLE_COLUMN_NAMES, { module });

// All Refer Voter List
export const getAllReferVotersList = (userID) => api.create(url.GET_ALLREFERVOTERSLIST, userID);
export const getAllReferVotersListTableColumnNames = ({ moduleName: module }) => api.create(url.GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES, { module });

//Dashboard
export const getTotalCount = (votersCount)=> api.create(url.GET_COUNT, votersCount );
export const getCount = (count)=> api.create(url.GET_SECOND_COUNT, count);
