import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner, Input, Label, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import DropDownTextBox from "../../../Components/Common/DropDownTextBox";
import { getClassVoters, getVotersTableColumnNames, getArabicAlphabets, activateDeactivateVoters } from "../../../store/voters/actions";
import { getClasses  } from "../../../store/classes/actions";


// const columnNames = [
//   {
//     FieldName: "Normal",
//     ModuleName: "BOOTH_VOTING",
//     Title: "voterAlphabet",
//     ValueAr: "أبجدية الناخب",
//     ValueEn: "Voter Alphabet",
//   },
//   {
//       FieldName: "Normal",
//       ModuleName: "BOOTH_VOTING",
//       Title: "voterNumber",
//       ValueAr: "رقم الناخب",
//       ValueEn: "Voter Number",
//   },
//   {
//     FieldName: "Normal",
//     ModuleName: "BOOTH_VOTING",
//     Title: "fullName",
//     ValueAr: "الاسم الكامل",
//     ValueEn: "FullName",
//   },
//   {
//     FieldName: "Active",
//     ModuleName: "BOOTH_VOTING",
//     Title: "isVoted",
//     ValueAr: "تم التصويت",
//     ValueEn: "Is Voted",
//   }
// ];

const dummyData = [
  {
      id: 1,
      voterAlphabet: 'A',
      fullName: 'Beetlejuice',
      voterNumber: "1",
      isVoted: "true",
  },
  {
    id: 2,
    voterAlphabet: 'B',
    fullName: 'Beetlejuice',
    voterNumber: 2,
    isVoted: "false",
  },
  {
    id: 3,
    voterAlphabet: 'C',
    fullName: 'Beetlejuice',
    voterNumber: "3",
    isVoted: "true",
  },
  {
    id: 5,
    voterAlphabet: 'C',
    fullName: 'Ajay',
    voterNumber: "5",
    isVoted: "true",
  },
  {
    id: 6,
    voterAlphabet: 'D',
    fullName: 'Sourav',
    voterNumber: "5",
    isVoted: "true",
  },
  {
    id: 4,
    voterAlphabet: 'D',
    fullName: 'Beetlejuice',
    voterNumber: "4",
    isVoted: "true",
  }]

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
	// const [data, setData] = useState(dummyData);

  // const { Voters, isLoading, columnNames } = useSelector((state) => {
  //   console.log('state: ', state);
  //   console.log('state.Voters.voters: ', state.Voters.voters);
  //   return {
  //   Voters: state.Voters.voters,
	// 	columnNames: state.Voters.columnNames,
	// 	isLoading: state.Voters.isLoading,
  //   // alpha: state.Voters.alpha
	// }});


  const { Classes, isLoadingClasses } = useSelector((state) => {
    return {
      Classes: state.Classes.classes,
      isLoadingClasses: state.Voters.isLoading
    }
  })

  const [optionsClass, setOptionsClass] =  useState(Classes)
  const [optionsAlpha, setOptionsAlpha] =  useState(voterAlpabet)

  
  console.log('Classes: ', Classes);

  useEffect(()=> {
    dispatch(getClasses())
  }, [dispatch])

  useEffect(() => {
		setOptionsClass(Classes)
	}, [Classes]);



  const { Voters, isLoading, columnNames } = useSelector((state) => {
    console.log('state.Voters: ', state.Voters);
    return {
    Voters: state.Voters.voters,
		columnNames: state.Voters.columnNames,
		isLoading: state.Voters.isLoading,
	}});

	const [data, setData] = useState(Voters);
  if (alphaData.length ===0) {
    alphaData = Voters
  }
  console.log('alphaData: ', alphaData);

  // useEffect(() => {
  //   dispatch(getVoters())
  //   dispatch(getVotersTableColumnNames())
  //   dispatch(getArabicAlphabets())
	// }, [dispatch]);

  useEffect(() => {
		setData(Voters)
	}, [Voters]);

  console.log('data *--------------*******: ', data);


	// useEffect(() => {
	// 	setData(data)
	// }, [data]);

  const handleClass = (value) => {
    console.log('value: ', value);
    dispatch(getClassVoters({ "classNo": Number(value)}))
    dispatch(getVotersTableColumnNames({"moduleName": "VOTERS"}))
    // dispatch(getArabicAlphabets())

    if (value === "") {
      setData(Voters)
      classData = Voters;
    } else {
      setData(Voters.filter((item) => {
        return Object.values(item['voterAlphabet']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      }))
      classData = Voters.filter((item) => {
        return Object.values(item['voterAlphabet']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      })
    }
  }


  // const handleArabicCharacter = (value) => {
  //   console.log('value: ', value);
  //   if (value === "") {
  //     alphaData = Voters;
  //     setData(Voters)
  //   } else {
  //     setData(Voters.filter((item) => {
  //       return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
  //     }))
  //     alphaData = Voters.filter((item) => {
  //       return Object.values(item['Alpha']).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
  //     })
  //   }
  // }

  // function onActiveOrDeactiveChange (voters, e) {
  //   console.log('voters: ', voters);
	// 	const votersObj = {}
	// 	votersObj['_id'] = voters._id;
	// 	votersObj['Voters_Status'] = voters.Voters_Status;
	// 	dispatch(activateDeactivateVoters(votersObj))
	// }

  // const handleClear = () => {
  //   document.getElementById('alpha').value = ''
  //   document.getElementById('voterId').value = ''
  //   document.getElementById('voterName').value = ''
  //   setData(Voters);
  // }

  // const dispatch = useDispatch();
  // // const [options, setOptions] =  useState(voterAlpabet)
  

  // const { Voters, isLoading, columnNames } = useSelector((state) => {
  //   console.log('state: ', state);

  //   return {
  //   Voters: state.Voters.voters,
	// 	columnNames: state.Voters.columnNames,
	// 	isLoading: state.Voters.isLoading,
	// }});

	// const [data, setData] = useState(Voters);
  // alphaData = Voters


  // useEffect(() => {
  //   dispatch(getVoters())
  //   dispatch(getVotersTableColumnNames())
	// }, [dispatch]);

  // useEffect(() => {
	// 	setData(Voters)
	// }, [Voters]);

	


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

  function onActiveOrDeactiveChange (voters, e) {
    // console.log('e: ', e);
    console.log('voters: ', voters);
		const votersObj = {}
		votersObj['_id'] = voters._id;
		votersObj['VotersStatus'] = voters.Voters_Status;
		// votersObj['TableName'] = 'Voters';
    // dispatch(activateDeactivateVoters(votersObj));

    if (voters.Voters_Status !== true) {
      let votedDateTime = new Date().toLocaleString();
      votedDateTime = votedDateTime.replaceAll('/', '-')
      votedDateTime = votedDateTime.replaceAll(',', '')
      votersObj['VotedDateTime'] = votedDateTime;
		dispatch(activateDeactivateVoters(votersObj));
    } else {
      votersObj['VotedDateTime'] = "";
		dispatch(activateDeactivateVoters(votersObj));
    }
	}

  const handleClear = () => {
    document.getElementById('alpha').value = ''
    document.getElementById('voterId').value = ''
    document.getElementById('voterName').value = ''
    setData(Voters);
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

          {/* { isLoadingClasses ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spinner style={{
                height: '3rem',
                width: '3rem',
              }} className='me-2'> Loading... </Spinner>
            </div> : <div>
            </div>
          } */}
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
                      {optionsClass.map((item, key) => (<option value={item.Class_No} key={key}>{item.Class_Name}</option>))}
                    </React.Fragment>
                  }
                </Input>
                {/* <DropDownTextBox initialData={dummyData} options={options} filter="voterAlphabet" setData={setData} /> */}
              </Col>
            </Row>

          { isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spinner style={{
                height: '3rem',
                width: '3rem',
              }} className='me-2'> Loading... </Spinner>
            </div> : <div>
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
							</div> :	<BasicTable data={data} columns={columns(columnNames, i18n, t, onActiveOrDeactiveChange)}  />
              }
						</Col>
					</Row>
              {/* <Row className='mb-3'>
                <Col>
                  <Label>{t('Arabic Character')}</Label>
                  <SearchTextBox initialData={Voters} setData={setData} id="alpha" />            
                </Col>
                <Col>
                  <Label>{t('Voter ID')}</Label>
                  <SearchTextBox initialData={Voters} currentData={data} filter="voterNumber" setData={setData} />
                </Col>
                <Col>
                  <Label>{t('Voter Name')}</Label>
                  <SearchTextBox initialData={Voters} filter="fullName" setData={setData} />
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
                    </div> : <BasicTable data={data} columns={columns(columnNames, i18n, t)} />
                  }
                </Col>
              </Row> */}
            </div>
          }
        </Container>
      </div>
    </React.Fragment>
  )
}

export default VotersManagement;