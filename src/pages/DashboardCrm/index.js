import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import BalanceOverview from './BalanceOverview';
import ClosingDeals from './ClosingDeals';
import DealsStatus from './DealsStatus';
import DealType from './DealType';
import MyTasks from './MyTasks';
import SalesForecast from './SalesForecast';
import UpcomingActivities from './UpcomingActivities';
import Widgets from './Widgets';

const DashboardCrm = () => {
    const {i18n, t} = useTranslation();
    document.title= t('Dashboard | KW-Elections Admin & Dashboard');
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>            
                    <BreadCrumb title={t('Dashboard')} pageTitle="Dashboards" />
                    <Row>
                        <Widgets />
                    </Row>
                    <Row>
                        <SalesForecast />
                        <DealType />
                        <BalanceOverview />
                    </Row>
                    <Row>
                        <DealsStatus />
                        <MyTasks />
                    </Row>
                    <Row>
                        <UpcomingActivities />
                        <ClosingDeals />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardCrm;