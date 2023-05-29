import React, { useEffect, useState } from 'react';
import CountUp from "react-countup";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { getCount } from '../../store/dashboard/actions';


const SecondWidget = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    const [totalSubAdmin, setTotalSubAdmin] = useState(0);
    const [totalReference, setTotalReference] = useState(0);
    const [totalSubReference, setTotalSubReference] = useState(0);
    const [totalAreas, setTotalAreas] = useState(0);
    const [totalSchools, setTotalSchools] = useState(0)
    const [totalClasses, setTotalClasses] = useState(0);
    const [ecomWidgets, setEcomWidgets] = useState([
        {
            id: 1,
            cardColor: "primary",
            label: "Total Sub Admins",
            badge: "ri-arrow-right-up-line",
            badgeClass: "success",
            percentage: "+16.24",
            counter: "559.25",
            link: "Total Sub Admins",
            bgcolor: "success",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
        },
        {
            id: 2,
            cardColor: "secondary",
            label: "Total References",
            badge: "ri-arrow-right-down-line",
            badgeClass: "danger",
            percentage: "-3.57",
            counter: "36894",
            link: "Total References",
            bgcolor: "info",
            icon: "bx bx-user-circle",
            decimals: 0,
            prefix: "",
            separator: ",",
            suffix: "",
        },
        {
            id: 3,
            cardColor: "success",
            label: "Total Sub References",
            badge: "ri-arrow-right-up-line",
            badgeClass: "success",
            percentage: "+29.08",
            counter: "183.35",
            link: "Total Sub References",
            bgcolor: "warning",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "",
            suffix: "M",
        },
        {
            id: 4,
            cardColor: "info",
            label: "Total Areas",
            badgeClass: "muted",
            percentage: "+0.00",
            counter: "165.89",
            link: "Total Areas",
            bgcolor: "primary",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
        },

        {
            id: 5,
            cardColor: "info",
            label: "Total Schools",
            badgeClass: "muted",
            percentage: "+0.00",
            counter: "165.89",
            link: "Total Schools",
            bgcolor: "primary",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
        },
        {
            id: 6,
            cardColor: "info",
            label: "Total Classes",
            badgeClass: "muted",
            percentage: "+0.00",
            counter: "165.89",
            link: "Total Classes",
            bgcolor: "primary",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
        },
    ])

    const { SubAdmin, References, SubReferences, Areas, Schools, Classes } = useSelector((state) => ({
        SubAdmin: state.Dashboard.totalSubAdmins,
        References: state.Dashboard.totalReferences,
        SubReferences: state.Dashboard.totalSubReferences,
        Areas: state.Dashboard.totalAreas,
        Schools: state.Dashboard.totalSchools,
        Classes: state.Dashboard.totalClasses,
    }));

    const fetchTotalCount = () => {
        dispatch(getCount({ UserID: auth.id }));
    };

    useEffect(() => {
        fetchTotalCount();
        const interval = setInterval(() => {
            fetchTotalCount();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch]);

    useEffect(() => {
        setTotalSubAdmin(SubAdmin);
        setTotalReference(References);
        setTotalSubReference(SubReferences);
        setTotalAreas(Areas);
        setTotalSchools(Schools);
        setTotalClasses(Classes)
    }, [SubAdmin, References, SubReferences, Areas, Schools, Classes])


    const updatedEcomWidgets = ecomWidgets.map((widget) => {
        if (widget.label === 'Total Sub Admins') {
            return {
                ...widget,
                counter: totalSubAdmin, // Update counter with totalSubAdmin
            };
        }
        if (widget.label === 'Total References') {
            return {
                ...widget,
                counter: totalReference, // Update counter with totalReference
            };
        }
        if (widget.label === 'Total Sub References') {
            return {
                ...widget,
                counter: totalSubReference, // Update counter with totalSubReference
            };
        }

        if (widget.label === 'Total Areas') {
            return {
                ...widget,
                counter: totalAreas, // Update counter with totalAreas
            };
        }

        if (widget.label === 'Total Schools') {
            return {
                ...widget,
                counter: totalSchools, // Update counter with totalSchools
            };
        }

        if (widget.label === 'Total Classes') {
            return {
                ...widget,
                counter: totalClasses, // Update counter with totalClasses
            };
        }
        return widget;
    });

    return (
        <React.Fragment>
            {updatedEcomWidgets.map((item, key) => (
                <Col xl={2} md={2} key={key}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{t(item.label)}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            separator={item.separator}
                                            end={item.counter}
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to="#" className="text-decoration-underline text-muted">{t(item.link)}</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className={"avatar-title rounded fs-3 bg-soft-" + item.bgcolor}>
                                        <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>))}
        </React.Fragment>
    );
};

export default SecondWidget;