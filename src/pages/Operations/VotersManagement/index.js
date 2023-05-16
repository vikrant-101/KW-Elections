import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner, Input, Label, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import DropDownTextBox from "../../../Components/Common/DropDownTextBox";
import { getClassVoters, getVotersTableColumnNames, activateDeactivateVoters } from "../../../store/boothVoters/actions";
import { getVotersManagement, getVotersManagementTableColumnNames, activateDeactivateVotersManagement } from "../../../store/votersManagement/actions";
import { getClasses  } from "../../../store/classes/actions";


  let alphaData = [];
  let classData = [];



  const voterAlpabet = [
    {label: "A", value: "a"},
    {label: "B", value: "b"},
    {label: "C", value: "c"},
    {label: "D", value: "d"}]

  const voterClass = [
      {label: "X", value: "x"},
      {label: "Y", value: "y"},
      {label: "Z", value: "z"}
    ]

const VotersManagement = () => {
  const { t, i18n } = useTranslation();

	const dispatch = useDispatch();

  const { Classes, isLoadingClasses } = useSelector((state) => {
    return {
      Classes: state.Classes.classes,
      isLoadingClasses: state.Classes.isLoading
    }
  })

  const [optionsClass, setOptionsClass] =  useState(Classes)
  const [optionsAlpha, setOptionsAlpha] =  useState(voterAlpabet)

  

  useEffect(()=> {
    dispatch(getClasses())
  }, [dispatch])

  useEffect(() => {
		setOptionsClass(Classes)
	}, [Classes]);



  const { VotersManagement, isLoading, columnNames } = useSelector((state) => {
    return {
    VotersManagement: state.VotersManagement.votersmanagement,
		columnNames: state.VotersManagement.columnNames,
		isLoading: state.VotersManagement.isLoading,
	}});

	const [data, setData] = useState(VotersManagement);
  if (alphaData.length ===0) {
    alphaData = VotersManagement
  }

  useEffect(() => {
		setData(VotersManagement)
	}, [VotersManagement]);

  const handleClass = (value) => {
    dispatch(getVotersManagement())
    dispatch(getVotersManagementTableColumnNames())

    if (value === "") {
      setData(VotersManagement)
      classData = VotersManagement;
    } else {
      setData(VotersManagement.filter((item) => {
        return Object.values(item['voterAlphabet']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      }))
      classData = VotersManagement.filter((item) => {
        return Object.values(item['voterAlphabet']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      })
    }
  }


  const handleArabicCharacter = (value) => {
    if (value === "") {
      alphaData = VotersManagement;
      setData(VotersManagement)
    } else {
      setData(VotersManagement.filter((item) => {
        return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      }))
      alphaData = VotersManagement.filter((item) => {
        return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      })
    }
  }

  function onActiveOrDeactiveChange (votersmanagement, e) {
		const votersObj = {}
		votersObj['_id'] = votersmanagement._id;
		votersObj['VotersStatus'] = votersmanagement.VotersStatus;
    if (votersmanagement.Voters_Status !== true) {
      let votedDateTime = new Date().toLocaleString();
      votedDateTime = votedDateTime.replaceAll('/', '-')
      votedDateTime = votedDateTime.replaceAll(',', '')
      votersObj['VotedDateTime'] = votedDateTime;
		dispatch(activateDeactivateVotersManagement(votersObj));
    } else {
      votersObj['VotedDateTime'] = "";
		dispatch(activateDeactivateVotersManagement(votersObj));
    }
	}

  const handleClear = () => {
    document.getElementById('alpha').value = ''
    document.getElementById('voterId').value = ''
    document.getElementById('voterName').value = ''
    setData(VotersManagement);
  }



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <h1>Booth Voting Component</h1> */}
          <Row className='mb-3'>
            <Col>
              <BreadCrumb title={t('Voters Management')} />
            </Col>
          </Row>

          {isLoadingClasses ? <div style={{ display: 'flex', justifyContent: 'center' }}>
								<Spinner style={{
									height: '3rem',
									width: '3rem',
								}} className='me-2'> Loading... </Spinner>
							</div> :	<div>
                <Row className='mb-3'>
                <Col>
                    <Label>{t('Class')}</Label>
                    <Input
                      name="arabic"
                      type="select"
                      className="form-select"
                      id="arabic-character"
                      onChange={(e) => handleClass(e.target.value)}
                      // onBlur={(e) => handleClass(e.target.value)}
                    >
                      <option value='' default>{t('Select')}</option>
                      {
                        <React.Fragment>
                          {optionsClass.map((item, key) => (<option value={item.ClassNo} key={key}>{item.ClassName}</option>))}
                        </React.Fragment>
                      }
                    </Input>
                    {/* <DropDownTextBox initialData={dummyData} options={options} filter="voterAlphabet" setData={setData} /> */}
                  </Col>
                </Row>
              </div>
              }

          { isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spinner style={{
                height: '3rem',
                width: '3rem',
              }} className='me-2'> Loading... </Spinner>
            </div> : <div>
            <Row className='mb-3'>
						<Col>
              <Label>{t('Arabic Character')}</Label>
							{/* <SearchTextBox initialData={VotersManagement} setData={setData} id="alpha" /> */}
              <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                id="alpha"
                onChange={(e) => handleArabicCharacter(e.target.value)} />
						</Col>
						<Col>
              <Label>{t('Voter ID')}</Label>
							<SearchTextBox initialData={alphaData} filter="VotersNo" setData={setData} id="voterId" />
						</Col>
            <Col>
              <Label>{t('Voter Name')}</Label>
							<SearchTextBox initialData={VotersManagement} filter="FirstName" setData={setData} id="voterName" />
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
							</div> :	<BasicTable data={data} columns={columns(columnNames, i18n, t, onActiveOrDeactiveChange)}  />
              }
						</Col>
					</Row>
            </div>
          }
        </Container>
      </div>
    </React.Fragment>
  )
}

export default VotersManagement;