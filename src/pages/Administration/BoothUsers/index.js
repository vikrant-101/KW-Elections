import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import AddpdfButton from "../../../Components/Common/AddpdfButton";
import AddGenrateButton from "../../../Components/Common/AddGenrateButton";
import {
	addBoothUsers,
	getBoothUsers,
	getBoothUsersTableColumnNames,
	updateBoothUsers
} from "../../../store/boothusers/actions";
import yasaLight from '../../../assets/images/KW-Elections-Light.png'

const BoothUsers = () => {
	const { t, i18n } = useTranslation();
	document.title = t('KW-Elections | Create Add Users');
	const dispatch = useDispatch();
	const [data, setData] = useState([]);


	const getBoothUsersClicks = (value) => {
		dispatch(addBoothUsers({ "CandidateID": JSON.parse(sessionStorage.getItem("auth"))["id"] }))
	}

	const { BoothUsers, isLoading, columnNames } = useSelector((state) => ({
		columnNames: state.BoothUsers.columnNames,
		BoothUsers: state.BoothUsers.boothuser,
		isLoading: state.BoothUsers.isLoading,
	}));


	const onMobileNumberBlurHandler = (e, col) => {
		dispatch(updateBoothUsers({ "_id": col._id, "MobileNumber": e.target.value }))
	}

	const onFullNameBlurHandler = (e, col) => {
		dispatch(updateBoothUsers({ "_id": col._id, "FullName": e.target.value }))
	}

	useEffect(() => {
		dispatch(getBoothUsers({ "CandidateID": JSON.parse(sessionStorage.getItem("auth"))["id"] }));
		dispatch(getBoothUsersTableColumnNames());
	}, [dispatch]);

	useEffect(() => {
		setData(BoothUsers)
	}, [BoothUsers]);
	const printTable = (columns) => {
		const newWindow = window.open();
		newWindow.document.write('<html><head>');
		newWindow.document.write('<style>table { border-collapse: collapse; width: 100%; }');
		newWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: center; }</style>');
		newWindow.document.write('<style>th { background-color: #f2f2f2; }</style>');
		newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
		newWindow.document.write('<style>tr:hover { background-color: #ddd; }</style>');
		newWindow.document.write('<style>.logo-container { display: flex; justify-content: center; margin-bottom: 20px; background-color:#000 }</style>');
		newWindow.document.write(`<style>title { text-align: right; }</style><title>Manage Demo Class</title>`);
		newWindow.document.write('</head><body>');
		newWindow.document.write(`<div class="logo-container" ><img src=${yasaLight} onload="window.print()" /></div>`);
		newWindow.document.write('<table>');
		newWindow.document.write(`<thead><tr>${columns.map((col) => `<th>${col?.name?.props?.children}</th>`).join('')}</tr></thead>`);
		newWindow.document.write('<tbody>');
		BoothUsers?.forEach((row) => {
			newWindow.document.write(`<tr>${columns.map((col) => {
				const value = col?.selector && typeof col.selector === 'function' ? col.selector(row) : '';
				if (col?.name?.props?.children === 'Active') {
					let isActive = false;
					if (value?.props?.checked) {
						isActive = true;
					} else if (Array.isArray(value?.props?.children)) {
						isActive = value.props.children.some(child => child.props.checked);
					}
					return `<td>${isActive ? 'true' : 'false'}</td>`;
				} else if (typeof value === 'object' && value !== null) {
					if (value.text) {
						return `<td>${value.text}</td>`;
					} else if (value.props && value.props.children) {
						return `<td>${value.props.children}</td>`;
					} else {
						return `<td>${JSON.stringify(value)}</td>`;
					}
				} else {
					return `<td>${value}</td>`;
				}
			}).join('')}</tr>`);
		});
		newWindow.document.write('</tbody></table></body></html>');
		newWindow.document.write('<style>tr:nth-child(odd) { background-color: #ffffff; }</style>');
		newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
	};

	return (
		<React.Fragment>
			<Toaster />
			<div className="page-content">
				<Container fluid>
					<Row className='mb-3'>
						<Col>
							<BreadCrumb title={t('Booth Users')} />
						</Col>
					</Row>
					<Row className='mb-3'>
						<Col>
							<AddpdfButton handleClassesClicks={(e) => printTable(columns(columnNames, i18n, t))} />&nbsp;
							{data.length === 0 && <AddGenrateButton handleClassesClicks={getBoothUsersClicks} />}
						</Col>
						<Col>
							<SearchTextBox initialData={BoothUsers} setData={setData} />
						</Col>
					</Row>
					<Row>
						<Col>
							{isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
								<Spinner style={{
									height: '3rem',
									width: '3rem',
								}} className='me-2'> Loading... </Spinner>
							</div> :
								<BasicTable data={data} columns={columns(columnNames, i18n, onMobileNumberBlurHandler, onFullNameBlurHandler)} />}
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	)
}

export default BoothUsers;
