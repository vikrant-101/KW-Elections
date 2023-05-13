import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner, Input, Label, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import DropDownTextBox from "../../../Components/Common/DropDownTextBox";
import { getVoters, getVotersTableColumnNames, getArabicAlphabets, activateDeactivateVoters, activateVoters, getClassVoters } from "../../../store/voters/actions";
import { toast } from 'react-toastify';


  let alphaData = [];



  // const voterAlpabet = [
  //   {label: "A", value: "a"},
  //   {label: "B", value: "b"},
  //   {label: "C", value: "c"},
  //   {label: "D", value: "d"}]

const BoothVoting = () => {
  const { t, i18n } = useTranslation();

	const dispatch = useDispatch();
  // const [options, setOptions] =  useState(voterAlpabet)
  

  const { Voters, isLoading, columnNames } = useSelector((state) => {
    console.log('state: ', state);

    return {
    Voters: state.Voters.voters,
		columnNames: state.Voters.columnNames,
		isLoading: state.Voters.isLoading,
	}});

	const [data, setData] = useState(Voters);
  // alphaData = Voters
  if (alphaData.length ===0) {
    alphaData = Voters
  }

  let a = true;

  useEffect(() => {
    let user = sessionStorage.getItem('auth');
    console.log('user -----: ', JSON.parse(user));
    if (a === true) {
      dispatch(getVoters())
      console.log("inside if")
    } else {
      console.log("inside else")
      let value = "21";
      dispatch(getClassVoters({ "classNo": Number(value)}))
    }
    dispatch(getVotersTableColumnNames({"moduleName": "BOOTHVOTERS"}))
	}, [dispatch]);

  useEffect(() => {
		setData(Voters)
	}, [Voters]);

	


  const handleArabicCharacter = (value) => {
    console.log('value: ', value);
    if (value === "") {
      alphaData = Voters;
      setData(Voters)
    } else {
      setData(Voters.filter((item) => {
        return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      }))
      alphaData = Voters.filter((item) => {
        return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      })
    }
  }

  function onActiveChange (voters, e) {
    console.log('voters: ', voters);
    const votersObj = {}
    const votedMarkedBY = {}
    let votedDateTime = new Date().toLocaleString();
    votedDateTime = votedDateTime.replaceAll('/', '-')
    votedDateTime = votedDateTime.replaceAll(',', '')
    votedMarkedBY['BoothCoordinatorID'] = "645babd779ae9002d3058af8"
    votedMarkedBY['RoleID'] = 6
    votedMarkedBY['Status'] = true
    votedMarkedBY['Date'] = votedDateTime;
		// votersObj['_id'] = voters._id;
		// votersObj['Voters_Status'] = voters.Voters_Status;
		// votersObj['TableName'] = 'Voters';
		// dispatch(activateDeactivateVoters(votersObj))


    if (voters.Voters_Status !== true) {
      console.log("calling activate voters")
      
      votersObj['_id'] = voters._id;
      votersObj['VotersStatus'] = voters.Voters_Status;
      votersObj['VotedDateTime'] = votedDateTime;
      votersObj['VotedMarkedBy'] = votedMarkedBY
      dispatch(activateVoters(votersObj))
    } else {
      alert('Voter Status Cannot Changed')
    }
	}

  const handleClear = () => {
    document.getElementById('alpha').value = ''
    document.getElementById('voterId').value = ''
    document.getElementById('voterName').value = ''
    setData(Voters);
  }

  let areaName = "gwalior";
  let schoolName = "padav";
  let className = "krishan";
  let role = true;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <h1>Booth Voting Component</h1> */}
          <Row className='mb-3'>
            <Col>
              <BreadCrumb title={t('Booth Voting')} />
            </Col>
          </Row>
          {role ? <div>
            <Row className='mb-3'>
              <Col>
                <BreadCrumb title={`Area: ${areaName} / School: ${schoolName} / Class Name: ${className}`} />
              </Col>
            </Row>
          </div> : ""}
          <Row className='mb-3'>
            <Col>
              <Label>{t('Arabic Character')}</Label>
							{/* <SearchTextBox initialData={Voters} setData={setData} id="alpha" /> */}
              <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                id="alpha"
                onChange={(e) => handleArabicCharacter(e.target.value)} />
						</Col>
						<Col>
              <Label>{t('Voter ID')}</Label>
							<SearchTextBox initialData={alphaData} filter="Voters_No" setData={setData} id="voterId" />
						</Col>
            <Col>
              <Label>{t('Voter Name')}</Label>
							<SearchTextBox initialData={Voters} filter="First_Name" setData={setData} id="voterName" />
						</Col>
					</Row>
          <Row className='mb-3'>
              <Button onClick={handleClear}>{t('Clear')}</Button>
          </Row>
          <Row>
						<Col>
							{isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
								<Spinner style={{
									height: '3rem',
									width: '3rem',
								}} className='me-2'> Loading... </Spinner>
							</div> :	<BasicTable data={data} columns={columns(columnNames, i18n, t, onActiveChange)}  />
              }
						</Col>
					</Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default BoothVoting;