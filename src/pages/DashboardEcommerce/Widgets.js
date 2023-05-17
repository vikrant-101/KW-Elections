import React, { useEffect, useState } from 'react';
import CountUp from "react-countup";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import io from 'socket.io-client';
const socket = io('http://localhost:9000'); // Connect to the server's socket.io endpoint

const Widgets = () => {
    const { i18n, t } = useTranslation();
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    const [totalVoters, setTotalVoters] = useState(0);
    const [totalVoted, setTotalVoted] = useState(0);
    const [totalToBeVoted, setTotalToBeVoted] = useState(0);
    const [totalRefered, setTotalRefered] = useState(0);
    const [totalReferedVoted, setTotalReferedVoted] = useState(0);
    const [totalReferedToBeVoted, setTotalReferedToBeVoted] = useState(0);
    const [ecomWidgets, setEcomWidgets] = useState([
        {
            id: 1,
            cardColor: "primary",
            label: "Total Voters",
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
            label: "Total Voted",
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
            label: "Total To Be Voted",
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
            label: "Total Referred Voters",
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
            label: "Total Referred Voted",
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
            label: "Total Referred To Be Voted",
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

        const fetchTotalVotes = () => {
            socket.emit('fetchTotalVotes', auth.id);
        };

        const fetchTotalVoted = () => {
            socket.emit('fetchTotalVoted', auth.id);
        };

        const fetchTotalToBeVoted = () => {
            socket.emit('fetchTotalToBeVoted', auth.id);
        };
        const fetchTotalRefered = () => {
            socket.emit('fetchTotalRefered', auth.id);
        };
        const fetchTotalReferedVoted = () => {
            socket.emit('fetchTotalReferedVoted', auth.id);
        };

        const fetchTotalReferedToBeVoted = () => {
            socket.emit('fetchTotalReferedToBeVoted', auth.id);
        };

        // Event listener for 'totalVotes' event
        const handleTotalVotes = (count) => {
            setTotalVoters(count);
        };

        // Event listener for 'totalVoted' event
        const handleTotalVoted = (count) => {
            setTotalVoted(count);
        };

        // Event listener for 'totalToBeVoted' event
        const handleTotalToBeVoted = (count) => {
            setTotalToBeVoted(count);
        };
        // Event listener for 'totalRefered' event
        const handleTotalRefered = (count) => {
            setTotalRefered(count);
        };

        // Event listener for 'handleTotalReferedVoted' event
        const handleTotalReferedVoted = (count) => {
            setTotalReferedVoted(count);
        };

        const handleTotalReferedToBeVoted = (count) => {
            setTotalReferedToBeVoted(count);
        };

        // Subscribe to 'totalVotes' event
        socket.on('totalVoters', handleTotalVotes);

        // Subscribe to 'totalVoted' event
        socket.on('totalVoted', handleTotalVoted);

        // Subscribe to 'totalToBeVoted' event
        socket.on('totalToBeVoted', handleTotalToBeVoted);

        // Subscribe to 'totalRefered' event
        socket.on('totalRefered', handleTotalRefered);

        // Subscribe to 'totalReferedVoted' event
        socket.on('totalReferedVoted', handleTotalReferedVoted);

        socket.on('totalReferedToBeVoted', handleTotalReferedToBeVoted)

        // Initial fetch
        fetchTotalVotes();
        fetchTotalVoted();
        fetchTotalToBeVoted();
        fetchTotalRefered();
        fetchTotalReferedVoted();
        fetchTotalReferedToBeVoted();

        // Set interval for triggering events every 2 seconds
        const interval = setInterval(() => {
            fetchTotalVotes();
            fetchTotalVoted();
            fetchTotalToBeVoted();
            fetchTotalRefered();
            fetchTotalReferedVoted();
            fetchTotalReferedToBeVoted();
        }, 2000);

        // Clean up the socket connection, event listener, and interval on component unmount
        return () => {
            socket.off('totalVotes', handleTotalVotes);
            socket.off('totalVoted', handleTotalVoted);
            socket.off('totalToBeVoted', handleTotalToBeVoted);
            socket.off('totalRefered', handleTotalRefered);
            socket.off('totalReferedVoted', handleTotalReferedVoted);
            socket.off('totalReferedToBeVoted',handleTotalReferedToBeVoted )
            clearInterval(interval);
            socket.disconnect();
        };
    }, [auth]);


    const updatedEcomWidgets = ecomWidgets.map((widget) => {
        if (widget.label === 'Total Voters') {
            return {
                ...widget,
                counter: totalVoters.toString(), // Update counter with totalVoters
            };
        }
        if (widget.label === 'Total Voted') {
            return {
                ...widget,
                counter: totalVoted.toString(), // Update counter with totalVoted
            };
        }
        if (widget.label === 'Total To Be Voted') {
            return {
                ...widget,
                counter: totalToBeVoted.toString(), // Update counter with totalToBeVoted
            };
        }

        if (widget.label === 'Total Referred Voters') {
            return {
                ...widget,
                counter: totalRefered.toString(), // Update counter with totalRefered
            };
        }

        if (widget.label === 'Total Referred Voted') {
            return {
                ...widget,
                counter: totalReferedVoted.toString(), // Update counter with totalReferedVoted
            };
        }

        if (widget.label === 'Total Referred To Be Voted') {
            return {
                ...widget,
                counter: totalReferedToBeVoted.toString(), // Update counter with totalReferedToBeVoted
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
                                    <Link to={item.path} className="text-decoration-underline text-muted">{t(item.link)}</Link>
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

export default Widgets;