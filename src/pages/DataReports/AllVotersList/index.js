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
import { getVotersTableColumnNames, getVoters, getPrintDetail} from "../../../store/voters/actions";


import {CSVLink} from 'react-csv'
import { Link } from "react-router-dom";
import yasaLight from '../../../assets/images/horizonatal-view.png'

const AllVotersList = () => {

	const { t, i18n } = useTranslation();
  document.title = t('KW-Elections | All Voters');
  const dispatch = useDispatch();


 const { Voters, isLoading, columnNames, printDetail } = useSelector((state) => {
   return {
    Voters: state.Voters.voters,
   columnNames: state.Voters.columnNames,
   isLoading: state.Voters.isLoading,
   printDetail: state.Voters.printDetail[0]
  }});

 const [data, setData] = useState(Voters)

 useEffect(() => {
  setData(Voters)
}, [Voters]);

let user = sessionStorage.getItem('auth')
user = JSON.parse(user)
 
 useEffect(() => {
    dispatch(getVoters({userID: user.id}))  
    dispatch(getVotersTableColumnNames())
    dispatch(getPrintDetail({userID: user.id}))
}, [dispatch]);


const printTable = (e, columns) => {
  e.preventDefault();
  let date =  new Date().toLocaleString();
  const newWindow = window.open();
  newWindow.document.write('<html><head>');
  newWindow.document.write('<style>table { border-collapse: collapse; width: 100%; }');
  newWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: center; font-size: 12px; }</style>');
  newWindow.document.write('<style>th { background-color: #f2f2f2; }</style>');
  newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
  newWindow.document.write('<style>tr:hover { background-color: #ddd; }</style>');
  newWindow.document.write(`<style>title { text-align: center; }</style><title>Voter List</title>`);
  newWindow.document.write('<style>.logo-container { display: flex; justify-content: space-between; margin-bottom: 10px; }</style>');
  newWindow.document.write('</head><body>');
  if (printDetail?.CandidateName != undefined && printDetail?.ElectionName != undefined) {
    newWindow.document.write(`<div class="logo-container" >
      <div>
      <p>${printDetail?.CandidateName}</p>
      <p>${printDetail?.ElectionName}</p>
      </div>
      <div>
        <h2>كل قائمة الناخبين</h2>
      </div>
      <div>
      <img style="margin-top: 20px" src=${yasaLight} onload="window.print()" width="200px" height="33px" />
      </div>
    </div>`);
  } 
  // else {
  //   newWindow.document.write(`<div class="logo-container" >
  //   <div>
  //   <p>Candidate Name :- ______</p>
  //   <p>Election Name :- ______</p>
  //   </div>
  //   <div>
  //   <h2 style="text-align: left;">Refer Voter List</h2>
  //   <img src=${yasaLight} onload="window.print()" width="200px" height="33px" />
  //   </div>
  // </div>`);
  // }


// Set page orientation to landscape
newWindow.document.write('<style>@page  { size: landscape; }</style>');
// newWindow.document.write(`<style type="text/css" media="print">
//   @page {
//     size: auto;  
//     margin: 0; 
//     margin-top: 10;
//     margin-bottom: 15
//   }
// </style>`)
newWindow.document.write(`<style>
    @media print {
      @page {
        margin-top: 0.5px; 
      }
    }
    </style>`)
  newWindow.document.write('</head><body>');
  newWindow.document.write('<table>');
  newWindow.document.write(`<thead><tr>${columns?.map((col) => `<th>${col?.name?.props?.children}</th>`).join('')}</tr></thead>`);
  newWindow.document.write('<tbody>');
  Voters?.forEach((row) => {
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
  newWindow.document.write('</tbody></table></body>')
  // newWindow.document.write(`<p>${printDetail?.FullName}</html>`);
  if (printDetail?.FullNameArabic != undefined) {
    newWindow.document.write(`<footer
    style="position: fixed;
     left: 5;
     bottom: 0;
     width: 100%;
     background-color: white;
     color: black;
     text-align: left;"
     >
     <div>
       ${printDetail?.FullNameArabic}
     </div>
     <div style="font-size: smaller">
       ${date}
     </div>
     </footer>`);
  } 
  // else {
  //   newWindow.document.write(`<footer
  //   style="position: fixed;
  //    left: 5;
  //    bottom: 0;
  //    width: 100%;
  //    background-color: white;
  //    color: black;
  //    text-align: left;"
  //   >Print By :- ______</footer>`);
  // }
  newWindow.document.write('</html>');
  newWindow.document.write('<style>tr:nth-child(odd) { background-color: #ffffff; }</style>');
  newWindow.document.write('<style>tr:nth-child(even) { background-color: #f2f2f2; }</style>');
};




const exportToCsv = (data, columns) => {
  const csvData = data?.map((row) => {
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
  const csvHeaders = columns?.map((col) => col.name.props.children);
  return (
    <CSVLink data={csvData} headers={csvHeaders} filename="AllVotersList.csv">
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
							<BreadCrumb title={t('All Voters List')} />
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
							<SearchTextBox initialData={Voters} setData={setData}  />
						</Col>
					</Row>
					<Row>
						<Col>
                {isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
								<Spinner style={{
									height: '3rem',
									width: '3rem',
								}} className='me-2'> Loading... </Spinner>
							</div> : <BasicTable data={data} columns={columns(columnNames, i18n, t)}/>}
						</Col>
					</Row>
				</Container>
			</div>
			<AddModal />
			<DeleteModal  />
	</React.Fragment>

      
  )
}

export default AllVotersList;