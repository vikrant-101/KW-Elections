import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { StoreVisitsCharts } from './DashboardEcommerceCharts';

const StoreVisits = () => {
    const{i18n, t} = useTranslation();
    return (
        <React.Fragment>
            <Col xl={4}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">{t('Top 10 Families Voted/Voting')}</h4>
                        <div className="flex-shrink-0">
                            <UncontrolledDropdown className="card-header-dropdown" direction='start'>
                                <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                                    <span className="text-muted">{t('Report')}<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </DropdownToggle>
                                {/* <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem>{t('Download Report')}</DropdownItem>
                                    <DropdownItem>{t('Export')}</DropdownItem>
                                    <DropdownItem>{t('Import')}</DropdownItem>
                                </DropdownMenu> */}
                            </UncontrolledDropdown>
                        </div>
                    </CardHeader>

                    <div className="card-body">
                        <div dir="ltr">
                            <StoreVisitsCharts dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]' />
                        </div>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default StoreVisits;