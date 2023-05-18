import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner, Input, Label, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import DropDownTextBox from "../../../Components/Common/DropDownTextBox";
import { getBoothVoters, getBoothVotersTableColumnNames,  activateBoothVoters, getClassBoothVoters, getBoothUserDetail } from "../../../store/boothVoters/actions";
import { toast } from 'react-toastify';

  let alphaData = [];
  let boothUserDetail;

const BoothVoting = () => {
  const { t, i18n } = useTranslation();
  const [boothUser, setBoothUser] = useState(false)

	const dispatch = useDispatch();

  const { BoothVoters, isLoading, columnNames, Boothuserdetail } = useSelector((state) => {

    return {
    BoothVoters: state.BoothVoters.boothvoters,
		columnNames: state.BoothVoters.columnNames,
		isLoading: state.BoothVoters.isLoading,
    Boothuserdetail: state.BoothVoters.boothuserdetail[0]
	}});
  // console.log('Boothuserdetail: ', Boothuserdetail);

	const [data, setData] = useState(BoothVoters);
  if (alphaData.length ===0) {
    alphaData = BoothVoters
  }

  let user = sessionStorage.getItem('auth');
  // console.log('user -----: ', JSON.parse(user));
  user = JSON.parse(user);


  useEffect(() => {
    if (user.RoleID <= 2) {
      // console.log("inside if")
      dispatch(getBoothVoters())
    } else {
      console.log("inside else")
      let value = "21";
      // boothUserDetail = getBoothUserDetail({_id: user._id});
      // console.log('boothUserDetail: ', boothUserDetail);
      // dispatch(getClassBoothVoters({ "classNo": Number(value)}))
      setBoothUser(true);
      dispatch(getBoothUserDetail({ userID: user.id}));
    }
    dispatch(getBoothVotersTableColumnNames())
	}, [dispatch]);

  useEffect(() => {
    let classNo = Number(Boothuserdetail?.ClassNo)
    console.log('classNo ---: ', classNo);
    if (!isNaN(classNo)) {
      console.log("number")
      dispatch(getClassBoothVoters({ "classNo": classNo }))
    }
  }, [Boothuserdetail])

  useEffect(() => {
		setData(BoothVoters)
	}, [BoothVoters]);

	


  const handleArabicCharacter = (value) => {
    if (value === "") {
      alphaData = BoothVoters;
      setData(BoothVoters)
    } else {
      setData(BoothVoters.filter((item) => {
        return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      }))
      alphaData = BoothVoters.filter((item) => {
        return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      })
    }
  }

  function onActiveChange (voters, e) {
    // console.log('voters: ', voters);
    const votersObj = {}
    const votedMarkedBY = {}
    let votedDateTime = new Date().toLocaleString();
    votedDateTime = votedDateTime.replaceAll('/', '-')
    votedDateTime = votedDateTime.replaceAll(',', '')
    votedMarkedBY['BoothCoordinatorID'] = "645babd779ae9002d3058af8"
    votedMarkedBY['RoleID'] = 6
    votedMarkedBY['Status'] = true
    votedMarkedBY['Date'] = votedDateTime;

    if (voters.VotersStatus !== true) {
      // console.log("calling activate voters")
      
      votersObj['_id'] = voters._id;
      votersObj['VotersStatus'] = voters.Voters_Status;
      votersObj['VotedDateTime'] = votedDateTime;
      votersObj['VotedMarkedBy'] = votedMarkedBY
      dispatch(activateBoothVoters(votersObj))
    } else {
      alert('Voter Status Cannot Changed')
    }
	}

  const handleClear = () => {
    document.getElementById('alpha').value = ''
    document.getElementById('voterId').value = ''
    document.getElementById('voterName').value = ''
    setData(BoothVoters);
  }

  // let areaName = "gwalior";
  // let schoolName = "padav";
  // let className = "krishan";

  

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
          {(isLoading === false && boothUser) ? <div>
            <Row className='mb-3'>
              <Col>
                <BreadCrumb title={`Area: ${Boothuserdetail?.AreaName} / School: ${Boothuserdetail?.SchoolName} / Class Name: ${Boothuserdetail?.ClassName}`} />
              </Col>
            </Row>
          </div> : ""}
          <div className="card p-4 border">
          <Row className='mb-3'>
            <Col className="col-md-3 col-6 mb-4">
              <Label>{t('Arabic Character')}</Label>
							{/* <SearchTextBox initialData={BoothVoters} setData={setData} id="alpha" /> */}
              <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                id="alpha"
                onChange={(e) => handleArabicCharacter(e.target.value)} />
						</Col>
						<Col className="col-md-3 col-6 mb-4">
              <Label>{t('Voter ID')}</Label>
							<SearchTextBox initialData={alphaData} filter="VotersNo" setData={setData} id="voterId" />
						</Col>
            <Col className="col-md-3 col-6 mb-4">
              <Label>{t('Voter Name')}</Label>
							<SearchTextBox initialData={BoothVoters} filter="FirstName" setData={setData} id="voterName" />
						</Col>
            <Col className="col-md-3 col-6 mb-4">
              <Label>&nbsp; </Label> <br />
                <Button onClick={handleClear} className="cis-width-120">{t('Clear')} < i className="ri-filter-off-line"></i></Button>
            </Col>
					</Row>
          </div>
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