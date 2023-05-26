import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner, Input, Label, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import { getVotersManagement, getVotersManagementTableColumnNames, activateDeactivateVotersManagement, resetVotersManagement } from "../../../store/votersManagement/actions";
import { getClasses } from "../../../store/classes/actions";
import Toaster from "../../../Components/Common/Toaster";


// let alphaData = [];
// let classNumber = "";



const VotersManagement = () => {
  const { t, i18n } = useTranslation();
  document.title = t('KW-Elections | Voters Management');
  const [optionsClass, setOptionsClass] = useState()
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const handleClass = (value) => {
    // classNumber = value;
    if (value !== '') {
      dispatch(getVotersManagement({ "classNo": value }));
      dispatch(getVotersManagementTableColumnNames());
    } else {
      dispatch(resetVotersManagement())
    }
  }


  function onActiveOrDeactiveChange(votersmanagement, e) {
    const votersObj = {}
    votersObj['_id'] = votersmanagement?._id;
    votersObj['VotersStatus'] = votersmanagement?.VotersStatus;
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

  const { Classes, isLoadingClasses, VotersManagement, isLoading, columnNames } = useSelector((state) => {
    return {
      Classes: state.Classes.classes,
      VotersManagement: state.VotersManagement.votersmanagement,
      columnNames: state.VotersManagement.columnNames,
      isLoading: state.VotersManagement.isLoading,
    }
  })

  const handleClear = () => {
    document.getElementById('alpha').value = ''
    document.getElementById('votersNo').value = ''
    document.getElementById('voterName').value = ''
    setData(VotersManagement)
  }


  const filterData = (data, filter, value) => {
    return data.filter((item) => {
      let obj = {[filter]: item[filter]}
      return Object.values(obj)
        .map((entry) => entry?.toString().toLowerCase())
        .find((v) => v?.substring(0, value?.length) === value?.toString().toLowerCase());
    });
  };

  const handleArabicCharacter = (value) => {
    const voterIdValue = document.getElementById('votersNo')?.value;
    const voterNameValue = document.getElementById('voterName')?.value;
  
    let filteredData = VotersManagement;
    // if (value !== "") {
      if (voterIdValue !== "") {
        filteredData = filterData(filteredData, 'VotersNo', voterIdValue);
      }
      if (voterNameValue !== "") {
        filteredData = filterData(filteredData, 'FullName', voterNameValue);
      }
      filteredData = filterData(filteredData, 'Alpha', value);
    // }
    
    setData(filteredData);
  };

  const handleVotersNo = (value) => {
    const alphaValue = document.getElementById('alpha')?.value;
    const voterNameValue = document.getElementById('voterName')?.value;
  
    let filteredData = VotersManagement;
    // if (value !== "") {
      if (alphaValue !== "") {
        filteredData = filterData(filteredData, 'Alpha', alphaValue);
      }
      if (voterNameValue !== "") {
        filteredData = filterData(filteredData, 'FullName', voterNameValue);
      }
      filteredData = filterData(filteredData, 'VotersNo', value);
    // }
  
    setData(filteredData);
  };
  
  const handleFullName = (value) => {
    const alphaValue = document.getElementById('alpha')?.value;
    const voterIdValue = document.getElementById('votersNo')?.value;
  
    let filteredData = VotersManagement;
    // if (value !== "") {
      if (alphaValue !== "") {
        filteredData = filterData(filteredData, 'Alpha', alphaValue);
      }
      if (voterIdValue !== "") {
        filteredData = filterData(filteredData, 'VotersNo', voterIdValue);
      }
      filteredData = filterData(filteredData, 'FullName', value);
    // }
  
    setData(filteredData);
  };

  // useEffect(() => {
  //   if (alphaData?.length === 0) {
  //     alphaData = VotersManagement
  //   }
  // }, [VotersManagement, alphaData])


  useEffect(() => {
    setData(VotersManagement)
  }, [VotersManagement]);

  useEffect(()=> {
    let user = JSON.parse(sessionStorage.getItem('auth'));
    if (user !== null) {
      dispatch(getClasses({userID: user.id}));
    }
  },[dispatch]);

  useEffect(() => {
    setOptionsClass(Classes);
  }, [dispatch,Classes]);


   useEffect(() => {
    return () => {
      dispatch(resetVotersManagement())
    };
  }, [])




  return (
    <React.Fragment>
			<Toaster />
      <div className="page-content">
        <Container fluid>
          {/* <h1>Booth Voting Component</h1> */}
          <Row className='mb-3'>
            <Col>
              <BreadCrumb title={t('Voters Management')} />
            </Col>
          </Row>

            <Row className='mb-3'>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Class')}</Label>
                <Input
                  name="arabic"
                  type="select"
                  className="form-select"
                  id="voterClass"
                  onChange={(e) => handleClass(e.target.value)}
                // onBlur={(e) => handleClass(e.target.value)}
                >
                  <option value='' default>{t('Select')}</option>
                  {
                    <React.Fragment>
                      {optionsClass?.map((item, key) => (<option value={item.ClassNo} key={item._id}>{item.ClassName}</option>))}
                    </React.Fragment>
                  }
                </Input>
                {/* <DropDownTextBox initialData={dummyData} options={options} filter="voterAlphabet" setData={setData} /> */}
              </Col>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Voter Alphabet')}</Label>
                {/* <SearchTextBox initialData={VotersManagement} setData={setData} id="alpha" /> */}
                <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                  id="alpha"
                  onChange={(e) => handleArabicCharacter(e.target.value)} />
              </Col>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Voter Number')}</Label>
                {/* <SearchTextBox initialData={data} filter="VotersNo" setData={setData} id="voterId" /> */}
                <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                  id="votersNo"
                  onChange={(e) => handleVotersNo(e.target.value)} />
              </Col>
              <Col className="col-md-3 col-6 mb-4">
                <Label>{t('Voter Name')}</Label>
                {/* <SearchTextBox initialData={data} filter="FullName" setData={setData} id="voterName" /> */}
                <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
                  id="voterName"
                  onChange={(e) => handleFullName(e.target.value)} />
              </Col>
              <Col className="col-md-3">
                <Button onClick={handleClear} className="cis-width-120">{t('Clear')} <i className="ri-filter-off-line"></i></Button>
              </Col>

            </Row>

          {isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner style={{
              height: '3rem',
              width: '3rem',
            }} className='me-2'> Loading... </Spinner>
          </div> :
            <Row>
              <Col>
                {(isLoadingClasses && isLoading) ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Spinner style={{
                    height: '3rem',
                    width: '3rem',
                  }} className='me-2'> Loading... </Spinner>
                </div> : <BasicTable data={data} columns={columns(columnNames, i18n, t, onActiveOrDeactiveChange)} />
                }
              </Col>
            </Row>
          }
        </Container>
      </div>
    </React.Fragment>
  )
}

export default VotersManagement;