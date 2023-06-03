import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getAgeCount } from '../../store/actions';
import { Negative } from '../Charts/ApexCharts/BarCharts/BarCharts';
import { StoreVisitsCharts } from './DashboardEcommerceCharts';

const AgeGroupChart = () => {
    const{i18n, t} = useTranslation();
    const auth = JSON.parse(sessionStorage.getItem('auth'))
    const dispatch = useDispatch();

    useEffect(()=> {
      dispatch(getAgeCount({ userID: auth.id }));
    },[dispatch]);


    return (
        <React.Fragment>
            <Col xl={4}>
            <Card>
                    <CardHeader>
                      <h4 className="card-title mb-0">Age Group Wise Statistics</h4>
                    </CardHeader>
                    <CardBody>
                      <Negative  dataColors='["--vz-primary", "--vz-success"]' />
                    </CardBody>
                  </Card> 
            </Col>
        </React.Fragment>
    );
};

export default AgeGroupChart;