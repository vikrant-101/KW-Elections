import React, { useEffect, useState } from 'react';
import CountUp from "react-countup";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import io from 'socket.io-client';
const socket = io('http://localhost:9000'); // Connect to the server's socket.io endpoint

const SecondWidget = () => {
    const { i18n, t } = useTranslation();
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
            link: "Total Voters",
            bgcolor: "success",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
            path: '/data-reports/all-voters-list'
        },
        {
            id: 2,
            cardColor: "secondary",
            label: "Total References",
            badge: "ri-arrow-right-down-line",
            badgeClass: "danger",
            percentage: "-3.57",
            counter: "36894",
            link: "Total Voted",
            bgcolor: "info",
            icon: "bx bx-user-circle",
            decimals: 0,
            prefix: "",
            separator: ",",
            suffix: "",
            path: '/data-reports/all-voters-list'
        },
        {
            id: 3,
            cardColor: "success",
            label: "Total Sub References",
            badge: "ri-arrow-right-up-line",
            badgeClass: "success",
            percentage: "+29.08",
            counter: "183.35",
            link: "Total To Be Voted",
            bgcolor: "warning",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "",
            suffix: "M",
            path: '/data-reports/all-voters-list'
        },
        {
            id: 4,
            cardColor: "info",
            label: "Total Areas",
            badgeClass: "muted",
            percentage: "+0.00",
            counter: "165.89",
            link: "Total Referred Voters",
            bgcolor: "primary",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
            path: '/data-reports/all-refered-voters-list'
        },

        {
            id: 5,
            cardColor: "info",
            label: "Total Schools",
            badgeClass: "muted",
            percentage: "+0.00",
            counter: "165.89",
            link: "Total Referred Voted",
            bgcolor: "primary",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
            path: '/data-reports/all-refered-voters-list'
        },
        {
            id: 6,
            cardColor: "info",
            label: "Total Classes",
            badgeClass: "muted",
            percentage: "+0.00",
            counter: "165.89",
            link: "Total Referred To Be Voted",
            bgcolor: "primary",
            icon: "bx bx-user-circle",
            decimals: 2,
            prefix: "$",
            suffix: "k",
            path: '/data-reports/all-refered-voters-list'
        },
    ])

    useEffect(() => {
        // Establish socket connection
        socket.connect();

        const fetchTotalSubAdmin = () => {
            socket.emit('fetchTotalSubAdmins', auth.id);
        };

        const fetchTotalReference = () => {
            socket.emit('fetchTotalReference', auth.id);
        };

        const fetchTotalSubReference = () => {
            socket.emit('fetchTotalSubReference', auth.id);
        };
        const fetchTotalAreas = () => {
            socket.emit('fetchTotalAreas', auth.id);
        };
        const fetchTotalSchools = () => {
            socket.emit('fetchTotalSchools', auth.id);
        };

        const fetchTotalClasses = () => {
          socket.emit('fetchTotalClasses', auth.id);
      };

        // Event listener for 'totalVotes' event
        const handleTotalSubAdmins = (count) => {
          setTotalSubAdmin(count);
        };

        // Event listener for 'totalReference' event
        const handleTotalReference = (count) => {
            setTotalReference(count);
        };

        // Event listener for 'totalSubReference' event
        const handleTotalSubReference = (count) => {
            setTotalSubReference(count);
        };
        // Event listener for 'totalAreas' event
        const handleTotalAreas = (count) => {
            setTotalAreas(count);
        };

        // Event listener for 'handleTotalSchools' event
        const handleTotalSchools = (count) => {
            setTotalSchools(count);
        };

          // Event listener for 'handleTotalSchools' event
          const handleTotalClasses = (count) => {
            setTotalClasses(count);
        };

        // Subscribe to 'totalSubAdmins' event
        socket.on('totalSubAdmins', handleTotalSubAdmins);

        // Subscribe to 'totalReference' event
        socket.on('totalReference', handleTotalReference);

        // Subscribe to 'totalSubReference' event
        socket.on('totalSubReference', handleTotalSubReference);

        // Subscribe to 'totalAreas' event
        socket.on('totalAreas', handleTotalAreas);

        // Subscribe to 'totalSchools' event
        socket.on('totalSchools', handleTotalSchools);

         // Subscribe to 'totalClasses' event
         socket.on('totalClasses', handleTotalClasses);

        // Initial fetch
        fetchTotalSubAdmin();
        fetchTotalReference();
        fetchTotalSubReference();
        fetchTotalAreas();
        fetchTotalSchools();
        fetchTotalClasses();

        // Set interval for triggering events every 2 seconds
        const interval = setInterval(() => {
            fetchTotalSubAdmin();
            fetchTotalReference();
            fetchTotalSubReference();
            fetchTotalAreas();
            fetchTotalSchools();
            fetchTotalClasses();
        }, 2000);

        // Clean up the socket connection, event listener, and interval on component unmount
        return () => {
            socket.off('totalSubAdmins', handleTotalSubAdmins);
            socket.off('totalReference', handleTotalReference);
            socket.off('totalSubReference', handleTotalSubReference);
            socket.off('totalAreas', handleTotalAreas);
            socket.off('totalSchools', handleTotalSchools);
            socket.off('totalSchools', handleTotalClasses);
            clearInterval(interval);
            socket.disconnect();
        };
    }, [auth]);


    const updatedEcomWidgets = ecomWidgets.map((widget) => {
        if (widget.label === 'Total Sub Admins') {
            return {
                ...widget,
                counter: totalSubAdmin.toString(), // Update counter with totalSubAdmin
            };
        }
        if (widget.label === 'Total References') {
            return {
                ...widget,
                counter: totalReference.toString(), // Update counter with totalReference
            };
        }
        if (widget.label === 'Total Sub References') {
            return {
                ...widget,
                counter: totalSubReference.toString(), // Update counter with totalSubReference
            };
        }

        if (widget.label === 'Total Areas') {
            return {
                ...widget,
                counter: totalAreas.toString(), // Update counter with totalAreas
            };
        }

        if (widget.label === 'Total Schools') {
            return {
                ...widget,
                counter: totalSchools.toString(), // Update counter with totalSchools
            };
        }

        if (widget.label === 'Total Classes') {
            return {
                ...widget,
                counter: totalClasses.toString(), // Update counter with totalClasses
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
                                    <Link to={item.path} className="text-decoration-underline text-muted">{item.link}</Link>
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