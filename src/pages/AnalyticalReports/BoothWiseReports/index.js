import React, {useEffect, useState} from "react";
import { Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { useTranslation } from "react-i18next";
import { columns } from "../DataTableColumns";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { useDispatch, useSelector } from "react-redux";
// import { getAreaWiseReport, getAreaWiseTableColumnNames } from "../../../store/analyticalReport/actions";
import { getBoothWiseReport, getBoothWiseTableColumnNames } from "../../../store/analyticalReport/actions";


import { getPrintDetail} from "../../../store/voters/actions";

import {CSVLink} from 'react-csv'
import { Link } from "react-router-dom";
import yasaLight from '../../../assets/images/horizonatal-view.png'

const BoothWiseReports = () => {

	const { t, i18n } = useTranslation();
  const dispatch = useDispatch();


 const { BoothWise, isLoading, columnNames, printDetail } = useSelector((state) => {
   console.log('state: ', state);
   return {
    BoothWise: state.AnalyticalReports.boothWise,
   columnNames: state.AnalyticalReports.boothWiseColumnNames,
   isLoading: state.AnalyticalReports.isLoading,
   printDetail: state.Voters.printDetail[0]
 }});

 const [data, setData] = useState(BoothWise)

 useEffect(() => {
  setData(BoothWise)
}, [BoothWise]);
 

let user = sessionStorage.getItem('auth')
user = JSON.parse(user)

 useEffect(() => {
    dispatch(getBoothWiseReport())
    dispatch(getBoothWiseTableColumnNames())
    dispatch(getPrintDetail({userID: user.id}))
}, [dispatch]);

const printTable = (e, columns) => {
  e.preventDefault();
  const newWindow = window.open();
  newWindow.document.write('<html><head>');
  newWindow.document.write('<style>table { border-collapse: collapse; width: 100%; }');
  newWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: center; font-size: 12px; }</style>');
  newWindow.document.write('<style>th { background-color: #f2f2f2; }</style>');
  newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
  newWindow.document.write('<style>tr:hover { background-color: #ddd; }</style>');
  newWindow.document.write(`<style>title { text-align: center; }</style><title>All Area Booth Wise List</title>`);
  newWindow.document.write('<style>.logo-container { display: flex; justify-content: space-between; margin-bottom: 20px; }</style>');
  newWindow.document.write(`<style>title { text-align: right; }</style><title>Manage Demo Class</title>`);
  newWindow.document.write('</head><body>');
  newWindow.document.write(`<div class="logo-container" ><div><p>Candidate Name : ${printDetail?.CandidateName}</p><p>Election Name : ${printDetail?.ElectionName}</p></div><img src=${yasaLight} onload="window.print()" width="300px" height="50px" /></div>`);

  // Set page orientation to landscape
  // newWindow.document.write('<style>@page  { size: landscape; }</style>');

  newWindow.document.write('</head><body>');
  newWindow.document.write('<table>');
  newWindow.document.write(`<thead><tr>${columns?.map((col) => `<th>${col?.name?.props?.children}</th>`).join('')}</tr></thead>`);
  newWindow.document.write('<tbody>');
  BoothWise?.forEach((row) => {
    newWindow.document.write(`<tr>${columns?.map((col) => {
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
  newWindow.document.write('</tbody></table></body>');
  newWindow.document.write(`<p style="margin-top: 20px">Print By: ${printDetail?.FullName}</html>`);
  newWindow.document.write('<style>tr:nth-child(odd) { background-color: #ffffff; }</style>');
  newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
};

const exportToCsv = (data, columns) => {
  const csvData = data?.map((row) => {
    const csvRow = {};
    columns?.forEach((col) => {
      const value = col?.selector && typeof col.selector === 'function' ? col.selector(row) : '';
      if (col?.name?.props?.children === 'Active') {
        let isActive = false;
        if (value?.props?.checked) {
          isActive = true;
        } else if (Array.isArray(value?.props?.children)) {
          isActive = value.props.children.some((child) => child.props.checked);
        }
        csvRow[col.name.props.children] = isActive ? 'true' : 'false';
      } else if (typeof value === 'object' && value !== null) {
        if (value.text) {
          csvRow[col.name.props.children] = value.text;
        } else if (value.props && value.props.children) {
          csvRow[col.name.props.children] = value.props.children;
        } else {
          csvRow[col.name.props.children] = JSON.stringify(value);
        }
      } else {
        csvRow[col.name.props.children] = value;
      }
    });
    return csvRow;
  });
  const csvHeaders = columns?.map((col) => col.name.props.children);
  return (
    <CSVLink data={csvData} headers={csvHeaders} filename="AllReferedVotersList.csv">
      <button type="button" className="btn btn-primary ml-4">
        <i className="ri-file-excel-2-line align-bottom me-1"></i>
        {t('Export to csv')}
      </button>
    </CSVLink> 
  );
};



  return (
  

   <React.Fragment>
			<Toaster />
			<div className="page-content">
				<Container fluid>
					<Row className='mb-3'>
						<Col>
							<BreadCrumb title={t('Area Wise Report')} />
						</Col>
					</Row>
					<Row className='mb-3'>
						<Col className="col-12 col-md-3 col-lg-4">
            <div className="mb-3 cis-manage-demo-btn">
              <Link to="#"  onClick={(e)=>{printTable(e,columns(columnNames, i18n, t))}} className="btn btn-success mr-15px" style={{margin:"5px"
              }}>
                <i className="ri-printer-line align-bottom me-1"></i>
                {t('Print')}
              </Link>
              {exportToCsv(data, columns(columnNames, i18n, t))}
            </div>
						</Col>
						<Col className="col-6 col-md-3 col-lg-2">
						</Col>
						<Col className="col-6 col-md-3 col-lg-2">
						</Col>
						<Col className="col-lg-1">
							<label> &nbsp;</label> <br />
						</Col>
						<Col className="col-12 col-md-3 col-lg-3">
							<label> &nbsp;</label> <br />
							<SearchTextBox initialData={BoothWise} setData={setData}  />
						</Col>
					</Row>
					<Row>
						<Col>
                <BasicTable data={data} columns={columns(columnNames, i18n, t)}/>
						</Col>
					</Row>
				</Container>
			</div>
			<AddModal />
			<DeleteModal  />
	</React.Fragment> 
  )
}

export default BoothWiseReports;