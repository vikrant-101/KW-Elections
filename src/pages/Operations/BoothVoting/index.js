import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner, Input, Label, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import { getBoothVoters, getBoothVotersTableColumnNames, activateBoothVoters, getClassBoothVoters, getBoothUserDetail } from "../../../store/boothVoters/actions";

let alphaData = [];

const BoothVoting = () => {
  const { t, i18n } = useTranslation();
  document.title = t('KW-Elections | Booth Voting');
  const user = JSON.parse(sessionStorage.getItem('auth'));
  const [boothUser, setBoothUser] = useState(false)
  const dispatch = useDispatch();
  const { BoothVoters, isLoading, columnNames, Boothuserdetail } = useSelector((state) => {
    return {
      BoothVoters: state.BoothVoters.boothvoters,
      columnNames: state.BoothVoters.columnNames,
      isLoading: state.BoothVoters.isLoading,
      Boothuserdetail: state.BoothVoters.boothuserdetail[0]
    }
  });


  const [data, setData] = useState(BoothVoters);
  if (alphaData.length === 0) {
    alphaData = BoothVoters
  }

  useEffect(() => {
    dispatch(getBoothVoters({ UserID: user.id }))
    dispatch(getBoothUserDetail({ userID: user.id }));
    dispatch(getBoothVotersTableColumnNames())
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getClassBoothVoters({ "classNo": Boothuserdetail?.ClassNo }))
  // }, [Boothuserdetail])

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

  function onActiveChange(voters, e) {
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




  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className='mb-3'>
            <Col>
              <BreadCrumb title={t('Booth Voting')} />
            </Col>
          </Row>
          {(isLoading === false) ? <div>
            <Row className='mb-3'>
              <Col>
                <BreadCrumb title={`Area: ${Boothuserdetail?.AreaName ? Boothuserdetail?.AreaName: '-'} / School: ${Boothuserdetail?.SchoolName? Boothuserdetail?.SchoolName: '-'} / Class Name: ${Boothuserdetail?.ClassName}`} />
              </Col>
            </Row>
          </div> : ""}
          <div className="card p-4 border">
            <Row className='mb-3'>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Voter Alphabet')}</Label>
                <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                  id="alpha"
                  onChange={(e) => handleArabicCharacter(e.target.value)} />
              </Col>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Voter Number')}</Label>
                <SearchTextBox initialData={alphaData} filter="VotersNo" setData={setData} id="voterId" />
              </Col>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Voter Name')}</Label>
                <SearchTextBox initialData={BoothVoters} filter="FullName" setData={setData} id="voterName" />
              </Col>
              <Col className="col-md-3 col-6 mb-4">
                <Label>&nbsp; </Label> <br />
                <Button onClick={handleClear} className="cis-width-120">{t('Clear')} <i className="ri-filter-off-line"></i></Button>
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
              </div> : <BasicTable data={data} columns={columns(columnNames, i18n, t, onActiveChange)} />
              }
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default BoothVoting;