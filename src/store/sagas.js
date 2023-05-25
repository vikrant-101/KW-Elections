import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";
//ecommerce
import ecommerceSaga from "./ecommerce/saga";

//Project
import projectSaga from "./projects/saga";
// Task
import taskSaga from "./tasks/saga";
// Crypto
import cryptoSaga from "./crypto/saga";
//TicketsList
import ticketsSaga from "./tickets/saga";

//crm
import crmSaga from "./crm/saga";
//invoice
import invoiceSaga from "./invoice/saga";
//mailbox
import mailboxSaga from "./mailbox/saga";

// Dashboard Analytics
import dashboardAnalyticsSaga from "./dashboardAnalytics/saga";

// Dashboard CRM
import dashboardCrmSaga from "./dashboardCRM/saga";

// Dashboard Ecommerce
import dashboardEcommerceSaga from "./dashboardEcommerce/saga";

// Dashboard Crypto
import dashboardCryptoSaga from "./dashboardCrypto/saga";

// Dashboard Project
import dashboardProjectSaga from "./dashboardProject/saga";

// Dashboard NFT
import dashboardNFTSaga from "./dashboardNFT/saga";

// Pages > Team
import teamSaga from "./team/saga";

// File Manager
import fileManager from "./fileManager/saga";

// To do
import todos from "./todos/saga";
//Jobs
import ApplicationSaga from "./job/saga";
//API Key
import APIKeysaga from "./apikey/saga";
import LocalizationSaga from "./localization/saga";
import ElectionsSaga from "./elections/saga";
import CirclesSaga from "./circles/saga";
import ReferVotersSaga from "./referVoters/saga";
import MyReferedVotersSaga from "./myReferedVoters/saga";
import UploadVotersSaga from "./uploadVoters/saga";
import ElectionDayReportSaga from "./electionDayReport/saga";
import CandidatesSaga from "./candidates/saga";
import PhoneSaga from "./phone/saga";
import VotersSaga from "./voters/saga";
import BoothVotersSaga from "./boothVoters/saga";
import ClassesSaga from "./classes/saga";
import UsersSaga from "./users/saga";
import RolesSaga from "./roles/saga"
import BoothUsersSaga from "./boothusers/saga";
import VotersMangementSaga from "./votersManagement/saga";
import AnalyticalReportsSaga from "./analyticalReport/saga";
import AllReferedVotersListSata from "./allReferVotersList/saga";
export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(chatSaga),
    fork(projectSaga),
    fork(taskSaga),
    fork(cryptoSaga),
    fork(ticketsSaga),
    fork(calendarSaga),
    fork(ecommerceSaga),
    fork(crmSaga),
    fork(invoiceSaga),
    fork(mailboxSaga),
    fork(dashboardAnalyticsSaga),
    fork(dashboardCrmSaga),
    fork(dashboardEcommerceSaga),
    fork(dashboardCryptoSaga),
    fork(dashboardProjectSaga),
    fork(dashboardNFTSaga),
    fork(teamSaga),
    fork(fileManager),
    fork(todos),
    fork(ApplicationSaga),
    fork(APIKeysaga),
    fork(LocalizationSaga),
    fork(ElectionsSaga),
    fork(CirclesSaga),
    fork(MyReferedVotersSaga),
    fork(ReferVotersSaga),
    fork(UploadVotersSaga),
    fork(ElectionDayReportSaga),
    fork(CandidatesSaga),
    fork(PhoneSaga),
    fork(VotersSaga),
    fork(BoothVotersSaga),
    fork(ClassesSaga),
    fork(UsersSaga),
    fork(RolesSaga),
    fork(BoothUsersSaga),
    fork(VotersMangementSaga),
    fork(AnalyticalReportsSaga),
    fork(AllReferedVotersListSata)
  ]);
}
