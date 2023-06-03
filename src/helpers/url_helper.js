//REGISTER
export const POST_FAKE_REGISTER = "/auth/signup";

//LOGIN
export const POST_FAKE_LOGIN = "/auth/signin";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";

// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";
export const DELETE_MESSAGE = "delete/message";

//Mailbox
export const GET_MAIL_DETAILS = "/mail";
export const DELETE_MAIL = "/delete/mail";

// Ecommerce
// Product
export const GET_PRODUCTS = "/apps/product";
export const DELETE_PRODUCT = "/apps/product";
export const ADD_NEW_PRODUCT = "/apps/product";
export const UPDATE_PRODUCT = "/apps/product";

// Orders
export const GET_ORDERS = "/apps/order";
export const ADD_NEW_ORDER = "/apps/order";
export const UPDATE_ORDER = "/apps/order";
export const DELETE_ORDER = "/apps/order";

// Customers
export const GET_CUSTOMERS = "/apps/customer";
export const ADD_NEW_CUSTOMER = "/apps/customer";
export const UPDATE_CUSTOMER = "/apps/customer";
export const DELETE_CUSTOMER = "/apps/customer";

// Sellers
export const GET_SELLERS = "/sellers";

// Project list
export const GET_PROJECT_LIST = "/project/list";

// Task
export const GET_TASK_LIST = "/apps/task";
export const ADD_NEW_TASK = "/apps/task";
export const UPDATE_TASK = "/apps/task";
export const DELETE_TASK = "/apps/task";

// CRM
// Conatct
export const GET_CONTACTS = "/apps/contact";
export const ADD_NEW_CONTACT = "/apps/contact";
export const UPDATE_CONTACT = "/apps/contact";
export const DELETE_CONTACT = "/apps/contact";

// Companies
export const GET_COMPANIES = "/apps/company";
export const ADD_NEW_COMPANIES = "/apps/company";
export const UPDATE_COMPANIES = "/apps/company";
export const DELETE_COMPANIES = "/apps/company";

// Lead
export const GET_LEADS = "/apps/lead";
export const ADD_NEW_LEAD = "/apps/lead";
export const UPDATE_LEAD = "/apps/lead";
export const DELETE_LEAD = "/apps/lead";

// Deals
export const GET_DEALS = "/deals";

// Crypto
export const GET_TRANSACTION_LIST = "/transaction-list";
export const GET_ORDRER_LIST = "/order-list";

// Invoice
export const GET_INVOICES = "/apps/invoice";
export const ADD_NEW_INVOICE = "/apps/invoice";
export const UPDATE_INVOICE = "/apps/invoice";
export const DELETE_INVOICE = "/apps/invoice";

// TicketsList
export const GET_TICKETS_LIST = "/apps/ticket";
export const ADD_NEW_TICKET = "/apps/ticket";
export const UPDATE_TICKET = "/apps/ticket";
export const DELETE_TICKET = "/apps/ticket";

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = "/all-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = "/allAudiencesMetrics-data";
export const GET_MONTHLYAUDIENCESMETRICS_DATA = "/monthlyAudiencesMetrics-data";
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA =
  "/halfyearlyAudiencesMetrics-data";
export const GET_YEARLYAUDIENCESMETRICS_DATA = "/yearlyAudiencesMetrics-data";

// Users by Device
export const GET_TODAYDEVICE_DATA = "/todayDevice-data";
export const GET_LASTWEEKDEVICE_DATA = "/lastWeekDevice-data";
export const GET_LASTMONTHDEVICE_DATA = "/lastMonthDevice-data";
export const GET_CURRENTYEARDEVICE_DATA = "/currentYearDevice-data";

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = "/todaySession-data";
export const GET_LASTWEEKSESSION_DATA = "/lastWeekSession-data";
export const GET_LASTMONTHSESSION_DATA = "/lastMonthSession-data";
export const GET_CURRENTYEARSESSION_DATA = "/currentYearSession-data";

// Dashboard CRM

// Balance Overview
export const GET_TODAYBALANCE_DATA = "/todayBalance-data";
export const GET_LASTWEEKBALANCE_DATA = "/lastWeekBalance-data";
export const GET_LASTMONTHBALANCE_DATA = "/lastMonthBalance-data";
export const GET_CURRENTYEARBALANCE_DATA = "/currentYearBalance-data";

// Deal type
export const GET_TODAYDEAL_DATA = "/todayDeal-data";
export const GET_WEEKLYDEAL_DATA = "/weeklyDeal-data";
export const GET_MONTHLYDEAL_DATA = "/monthlyDeal-data";
export const GET_YEARLYDEAL_DATA = "/yearlyDeal-data";

// Sales Forecast

export const GET_OCTSALES_DATA = "/octSales-data";
export const GET_NOVSALES_DATA = "/novSales-data";
export const GET_DECSALES_DATA = "/decSales-data";
export const GET_JANSALES_DATA = "/janSales-data";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";

// Dashboard Crypto
// Portfolio
export const GET_BTCPORTFOLIO_DATA = "/btcPortfolio-data";
export const GET_USDPORTFOLIO_DATA = "/usdPortfolio-data";
export const GET_EUROPORTFOLIO_DATA = "/euroPortfolio-data";

// Market Graph
export const GET_ALLMARKETDATA_DATA = "/allMarket-data";
export const GET_YEARMARKET_DATA = "/yearMarket-data";
export const GET_MONTHMARKET_DATA = "/monthMarket-data";
export const GET_WEEKMARKET_DATA = "/weekMarket-data";
export const GET_HOURMARKET_DATA = "/hourMarket-data";

// Dashboard Crypto
// Project Overview
export const GET_ALLPROJECT_DATA = "/allProject-data";
export const GET_MONTHPROJECT_DATA = "/monthProject-data";
export const GET_HALFYEARPROJECT_DATA = "/halfYearProject-data";
export const GET_YEARPROJECT_DATA = "/yearProject-data";

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = "/allProjectStatus-data";
export const GET_WEEKPROJECTSTATUS_DATA = "/weekProjectStatus-data";
export const GET_MONTHPROJECTSTATUS_DATA = "/monthProjectStatus-data";
export const GET_QUARTERPROJECTSTATUS_DATA = "/quarterProjectStatus-data";

// Dashboard NFT
// Marketplace
export const GET_ALLMARKETPLACE_DATA = "/allMarketplace-data";
export const GET_MONTHMARKETPLACE_DATA = "/monthMarketplace-data";
export const GET_HALFYEARMARKETPLACE_DATA = "/halfYearMarketplace-data";
export const GET_YEARMARKETPLACE_DATA = "/yearMarketplace-data";

// Project
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

// Pages > Team
export const GET_TEAMDATA = "/teamData";
export const DELETE_TEAMDATA = "/delete/teamData";
export const ADD_NEW_TEAMDATA = "/add/teamData";
export const UPDATE_TEAMDATA = "/update/teamData";

// File Manager
// Folder
export const GET_FOLDERS = "/folder";
export const DELETE_FOLDER = "/delete/folder";
export const ADD_NEW_FOLDER = "/add/folder";
export const UPDATE_FOLDER = "/update/folder";

// File
export const GET_FILES = "/file";
export const DELETE_FILE = "/delete/file";
export const ADD_NEW_FILE = "/add/file";
export const UPDATE_FILE = "/update/file";

// To do
export const GET_TODOS = "/todo";
export const DELETE_TODO = "/delete/todo";
export const ADD_NEW_TODO = "/add/todo";
export const UPDATE_TODO = "/update/todo";

// To do Project
export const GET_PROJECTS = "/projects";
export const ADD_NEW_TODO_PROJECT = "/add/project";

//JOB APPLICATION
export const GET_APPLICATION_LIST = "/application-list";

//JOB APPLICATION
export const GET_API_KEY = "/api-key";


//LOCALIZATION
export const POST_LOCALIZATION = '/AddLocalization';
export const UPDATE_LOCALIZATION = '/UpdateLocalization';
export const DELETE_LOCALIZATION = '/DeleteLocalization';
export const GET_LOCALIZATION = '/GetLocalization';
export const GET_LOCALIZATION_TABLE_COLUMN_NAMES = '/GetHeaders';
export const GET_SCREENS = '/GetScreens';
export const GET_DEVICES = '/GetDevices';

// ELECTIONS
export const POST_ELECTIONS = '/AddElections';
export const UPDATE_ELECTIONS = '/UpdateElections';
export const DELETE_ELECTIONS= '/DeleteElections';
export const GET_ELECTIONS = '/GetElections';
export const GET_ELECTIONS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_ELECTIONS = '/ActivateElections'

// CIRCLES
export const POST_CIRCLES = '/AddCircles';
export const UPDATE_CIRCLES = '/UpdateCircles';
export const DELETE_CIRCLES= '/DeleteCircles';
export const GET_CIRCLES = '/GetCircles';
export const GET_CIRCLES_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_CIRCLES = '/ActivateCircles'
export const GET_CIRCLES_BY_ELECTIONID = '/GetCirclesByElectionID';

// REFER_VOTERS  
export const POST_REFER_VOTERS = '/SaveReferVoterTest';
export const UPDATE_REFER_VOTERS = '/UpdateReferVoterTest';
export const DELETE_REFER_VOTERS= '/DeleteReferVoters';
export const GET_REFER_VOTERS = '/GetReferVoter';
export const GET_REFER_VOTERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_REFER_VOTERS = '/ActivateReferVoters'

// My REFER_VOTERS  
export const POST_MY_REFERED_VOTERS = '/SaveMyReferVoterTest';
export const UPDATE_MY_REFERED_VOTERS = '/UpdateReferVoterTest';
export const DELETE_MY_REFERED_VOTERS= '/DeleteReferVoterTest';
export const GET_MY_REFERED_VOTERS = '/GetMyReferVoters';
export const GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS = '/ActivateMyReferedVoters'

// UPLOAD VOTERS
export const POST_UPLOAD_VOTERS = '/CSVtoJSON';
export const POST_ELECTION_CIRCLE = '/SaveElectionandCircle';
export const UPDATE_UPLOAD_VOTERS = '/UpdateUploadVoters';
export const DELETE_UPLOAD_VOTERS= '/DeleteUploadVoters';
export const GET_ELECTION_CIRCLE = '/FetchElectionCircle';
export const GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_UPLOAD_VOTERS = '/ActivateUploadVoters'

// Election Day Report
export const GET_ELECTIONDAY_REPORT = '/electionReports';
export const GET_ELECTIONDAY_REPORT_COLUMN_NAMES = '/GetHeaders';

// Candidate
export const POST_CANDIDATES = '/AddCandidates';
export const UPDATE_CANDIDATES = '/UpdateCandidates';
export const DELETE_CANDIDATES= '/DeleteCandidates';
export const GET_CANDIDATES = '/GetCandidates';
export const GET_CANDIDATES_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_CANDIDATES = '/ActivateCandidates'
export const CHECK_PHONE_NUMBER = '/CheckPhoneNumberExists'

// Voters
export const POST_VOTERS = '/AddVoters';
export const UPDATE_VOTERS = '/UpdateVoters';
export const DELETE_VOTERS= '/DeleteVoters';
export const GET_VOTERS = '/GetVoters';
export const GET_VOTERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_VOTERS = '/ActivateDeactivateVoters';
export const ACTIVATE_VOTERS = '/ActivateVoters';
export const GET_AREANAME = '/GetAreaName';
export const GET_FAMILYNAME = '/GetFamilyName';
export const GET_NEXT_VOTERS = '/GetNextVoters';

// Booth Voters
export const POST_BOOTHVOTERS = '/AddBoothVoters';
export const UPDATE_BOOTHVOTERS = '/UpdateBoothVoters';
export const DELETE_BOOTHVOTERS= '/DeleteBoothVoters';
export const GET_BOOTHVOTERS = '/GetBoothVoters';
export const GET_CLASS_BOOTHVOTERS = '/GetClassBoothVoters';
export const GET_BOOTHVOTERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_BOOTHVOTERS = '/ActivateDeactivateBoothVoters';
export const ACTIVATE_BOOTHVOTERS = '/ActivateBoothVoters';

// Classes
export const POST_CLASSES = '/AddClasses';
export const UPDATE_CLASSES = '/UpdateClasses';
export const DELETE_CLASSES= '/DeleteClasses';
export const GET_CLASSES = '/GetClasses';
export const GET_CLASSES_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_CLASSES = '/ActivateClasses';

// ReferVoters
export const POST_REFERVOTERS = '/AddReferVoters';
export const UPDATE_REFERVOTERS = '/UpdateReferVoters';
export const DELETE_REFERVOTERS= '/DeleteReferVoters';
export const GET_REFERVOTERS = '/GetReferVoters';
export const GET_REFERVOTERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_REFERVOTERS = '/ActivateReferVoters'

//USERS
export const POST_USERS = '/AddUsers';
export const UPDATE_USERS = '/UpdateUsers';
export const DELETE_USERS= '/DeleteUsers';
export const GET_USERS = '/GetUsers';
export const GET_USERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_USERS = '/ActivateUsers';
export const GET_PRINTDETAIL = '/GetPrintDetail';

//Roles
export const POST_ROLES = '/AddRoles';
export const UPDATE_ROLES = '/UpdateRoles';
export const DELETE_ROLES= '/DeleteRoles';
export const GET_ROLES = '/GetRoles';
export const GET_ROLES_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_ROLES = '/ActivateRoles'

// booth users
export const POST_BOOTHUSERS = '/GeneratePassword';
export const UPDATE_BOOTHUSERS = '/UpdateUserMobileOrFullName';
export const DELETE_BOOTHUSERS= '/DeleteBoothUsers';
export const GET_BOOTHUSERS = '/GetBoothUsers';
export const GET_BOOTHUSERS_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_BOOTHUSERS = '/ActivateUsers';
export const GET_BOOTHUSER_DETAIL = '/GetBoothUserDetail';

// Voters Management
export const POST_VOTERSMANAGEMENT = '/AddVotersManagement';
export const UPDATE_VOTERSMANAGEMENT = '/UpdateVotersManagement';
export const DELETE_VOTERSMANAGEMENT= '/DeleteVotersManagement';
export const GET_VOTERSMANAGEMENT = '/GetVotersManagement';
export const GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES = '/GetHeaders';
export const ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT = '/ActivateVotersManagement';

// Analytical Reports
export const GET_AREAWISE_REPORT = '/GetAreaWiseReports';
export const GET_AREAWISE_TABLE_COLUMN_NAMES = '/GetHeaders';

export const GET_SCHOOLWISE_REPORT = '/GetSchoolWiseReports';
export const GET_SCHOOLWISE_TABLE_COLUMN_NAMES = '/GetHeaders';

export const GET_BOOTHWISE_REPORT = '/GetBoothWiseReports';
export const GET_BOOTHWISE_TABLE_COLUMN_NAMES = '/GetHeaders';

export const GET_FAMILYNAMEWISE_REPORT = '/GetFamilyNameWiseReports';
export const GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES = '/GetHeaders';

// All Refer Voters List
export const GET_ALLREFERVOTERSLIST = '/GetAllReferVotersList';
export const GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES = '/GetHeaders';

// Dashboard
export const GET_COUNT = "/GetTotalCount";
export const GET_SECOND_COUNT = "/GetCount";