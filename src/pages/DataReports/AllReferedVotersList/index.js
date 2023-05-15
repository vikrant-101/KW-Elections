import React, {useEffect, useState} from "react";
import { Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { useTranslation } from "react-i18next";
import { columns } from "./DataTableColumns";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { useDispatch, useSelector } from "react-redux";
// import { getVotersTableColumnNames, getVoters} from "../../../store/voters/actions";
import { getReferVoters, getReferVotersTableColumnNames } from "../../../store/referVoters/actions";

import {CSVLink} from 'react-csv'
import { Link } from "react-router-dom";
import yasaLight from '../../../assets/images/horizonatal-view.png'

const AllReferedVotersList = () => {

	const { t, i18n } = useTranslation();


 const dispatch = useDispatch();


 const { ReferVoters, isLoading, columnNames } = useSelector((state) => {
   console.log('state: ', state);
   return {
    ReferVoters: state.ReferVoters.refervoters,
   columnNames: state.ReferVoters.columnNames,
   isLoading: state.ReferVoters.isLoading,
 }});

 const [data, setData] = useState(ReferVoters)

 useEffect(() => {
  setData(ReferVoters)
}, [ReferVoters]);
 
//  useEffect(() => {
//   setData(Voters)
// }, [Voters]);

 useEffect(() => {
 
    // dispatch(getVoters())  
    // dispatch(getClassVoters({ "classNo": Number(value)}))
    // dispatch(getVotersTableColumnNames({"moduleName": "ALLREFEREDVOTERSLIST"}))
    dispatch(getReferVoters())
    dispatch(getReferVotersTableColumnNames())
}, [dispatch]);


const printTable = (e, columns) => {
  console.log("columns", columns)
  e.preventDefault();
  const newWindow = window.open();
  newWindow.document.write('<html><head>');
  newWindow.document.write('<style>table { border-collapse: collapse; width: 100%; }');
  newWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: center; }</style>');
  newWindow.document.write('<style>th { background-color: #f2f2f2; }</style>');
  newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
  newWindow.document.write('<style>tr:hover { background-color: #ddd; }</style>');
  newWindow.document.write('<style>.logo-container { display: flex; justify-content: center; margin-bottom: 20px; background-color:#000 }</style>');
  newWindow.document.write(`<style>title { text-align: left; }</style><title>Manage Demo Class</title>`);
  newWindow.document.write('</head><body>');
  newWindow.document.write(`<div class="logo-container" ><img src=${yasaLight} onload="window.print()" /></div>`);
  newWindow.document.write('<table>');
  newWindow.document.write(`<thead><tr>${columns.map((col) => `<th>${col?.name?.props?.children}</th>`).join('')}</tr></thead>`);
  newWindow.document.write('<tbody>');
  ReferVoters?.forEach((row) => {
    newWindow.document.write(`<tr>${columns.map((col) => {
      console.log("col s ", col )
      const value = col?.selector && typeof col.selector === 'function' ? col.selector(row) : '';
      console.log("value s ", value )
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

const exportToCsv = (data, columns) => {
  const csvData = data.map((row) => {
    const csvRow = {};
    columns.forEach((col) => {
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
  const csvHeaders = columns.map((col) => col.name.props.children);
  return (
    <CSVLink data={csvData} headers={csvHeaders} filename="Demo-001.csv">
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
							<BreadCrumb title={t('All Refered Voters')} />
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
							{/* <label>{t('Start Date')}</label> */}
							{/* <Input type="date" className="form-control" name="startDate" onChange={(e) => onDateChangeHandler(e)} /> */}
							{/* <Input type="date" className="form-control" name="startDate"  /> */}
						</Col>
						<Col className="col-6 col-md-3 col-lg-2">
							{/* <label>{t('End Date')}</label> */}
							{/* <Input type="date" className="form-control" name="endDate" onChange={(e) => onDateChangeHandler(e)} /> */}
							{/* <Input type="date" className="form-control" name="endDate"  /> */}
						</Col>
						<Col className="col-lg-1">
							<label> &nbsp;</label> <br />
							{/* <Button type="button" onClick={() => onDateFilterSubmit()}><i className="ri-filter-3-line"></i>{t(' Go')}</Button> */}
							{/* <Button type="button" ><i className="ri-filter-3-line"></i>{t(' Go')}</Button> */}
						</Col>
						<Col className="col-12 col-md-3 col-lg-3">
							<label> &nbsp;</label> <br />
							{/* <SearchTextBox initialData={Payments} setData={setData} /> */}
							<SearchTextBox initialData={ReferVoters} setData={setData}  />
						</Col>
					</Row>
					<Row>
						<Col>
							{/* {isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
								<Spinner style={{
									height: '3rem',
									width: '3rem',
								}} className='me-2'> Loading... </Spinner>
							</div> : */}
								{/* <PrivateClassPayments data={data} t={t} columns={columns(columnNames, i18n, t, onActiveOrDeactiveChange, onViewSessionsHistory,data)} /> */}
								{/* <PrivateClassPayments  data={mainData} t={t} columns={columns(columnNames, i18n, t, onActiveOrDeactiveChange, onViewSessionsHistory,data)} /> */}
                {/* } */}
                <BasicTable data={data} columns={columns(columnNames, i18n, t)}/>
						</Col>
					</Row>
				</Container>
			</div>
			{/* <AddModal show={show} isAddOrEdit={isAddOrEdit} setShow={setShow} onSubmitHandler={onSubmitHandler} title={isAddOrEdit === 'ViewSessions' && t('Session History')} modalBody={<ViewPaymentSessions onChangeHandler={onChangeHandler} isSessionLoading={isSessionLoading} pricePerHour={pricePerHour} paymentRefID={paymentRefID} Session={Session} sessionColumnNames={sessionColumnNames} isAddOrEdit={isAddOrEdit} />} /> */}
			<AddModal />
			{/* <DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} onDeleteClick={onDeleteClick} /> */}
			<DeleteModal  />
	</React.Fragment>

      
  )
}

export default AllReferedVotersList;