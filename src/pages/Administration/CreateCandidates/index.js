import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import AddButton from "../../../Components/Common/AddButton";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddCandidatesForm from "../../../Components/Common/Forms/AddCandidatesForm";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { activateDeactivateCandidates, addCandidates, deleteCandidates, getCandidates, getCandidatesTableColumnNames, getCircles, getElections, updateCandidates, getCirclesByElectionID } from "../../../store/actions";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";

const labels = [
  {
		id: 1,
		labelName: 'Elections',
		fieldName: 'election-drop-down',
		name: 'ElectionID',
		value: 'ElectionID'
	},
	{
		id: 2,
		labelName: 'Circles',
		fieldName: 'circles-drop-down',
		name: 'CircleID',
		value: 'CircleID'
	},
	{
		id: 3,
		labelName: 'Candidate Name English',
		fieldName: 'text-box',
		name: 'FullNameEnglish',
		value: 'FullNameEnglish'
	},
	{
		id: 4,
		labelName: 'Candidate Name Arabic',
		fieldName: 'text-box',
		name: 'FullNameArabic',
		value: 'FullNameArabic'
	},
	{
		id: 5,
		labelName: 'Mobile Number',
		fieldName: 'mobile-number',
		name: 'MobileNumber',
		value: 'MobileNumber'
	},
	{
		id: 6,
		labelName: 'Domain Name',
		fieldName: 'text-box',
		name: 'DomainName',
		value: 'DomainName'
	},
	{
		id: 7,
		labelName: 'Users Limit',
		fieldName: 'number-box',
		name: 'UsersLimit',
		value: 'UsersLimit'
	}
];
const CreateCandidates = () => {
  const { t, i18n } = useTranslation();
	document.title = t('KW-Elections | Create Candidates');
  const auth = JSON.parse(sessionStorage.getItem("auth"));
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [deleteRow, setDeleteRow] = useState();
	const [candidates, setCandidates] = useState();
	const [classRow, setClassRow] = useState();
	const [isAddOrEdit, setIsAddOrEdit] = useState('isAdd');

	const handleClassesClicks = (value) => {
		setShow(true);
		setIsAddOrEdit(value);
		setClassRow({});
	}

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const candidateObj = {};
		const currentDate = new Date();
		isAddOrEdit === 'isEdit' && (candidateObj['_id'] = candidates['_id']);
		isAddOrEdit === 'isEdit' && (candidateObj['IsDelete'] = candidates['IsDelete']);
		isAddOrEdit === 'isEdit' && (candidateObj['IsActive'] = candidates['IsActive']);
		candidateObj['CircleID'] = candidates.CircleID
    candidateObj['FullNameEnglish'] = candidates.FullNameEnglish;
		candidateObj['FullNameArabic'] = candidates.FullNameArabic;
    candidateObj['ElectionID'] = candidates.ElectionID;
		candidateObj['DomainName'] = candidates.DomainName;
		if (candidates?.MobileNumber.includes('+965')) {
			candidateObj['MobileNumber'] = candidates.MobileNumber;
		} else {
			candidateObj['MobileNumber'] = '+965' +candidates.MobileNumber;
		}
		candidateObj['UsersLimit'] = candidates.UsersLimit;
		candidateObj['IsDelete'] =  false;
		candidateObj['IsActive'] = true;
    candidateObj['CreatedBy'] = auth.id;
    candidateObj['ModifiedBy'] = auth.id;
		candidateObj['CreatedDate'] =  currentDate.toISOString().slice(0, 10);
		candidateObj['ModifiedDate'] =  currentDate.toISOString().slice(0, 10);
		isAddOrEdit === 'isAdd' ?
			dispatch(addCandidates(candidateObj)) :
			dispatch(updateCandidates(candidateObj));
		setShow(false);
	}

	const onSelectHandler = (e) => {
		dispatch(getCirclesByElectionID({ElectionID: e.target.value}))
		setCandidates((preValue) => ({
			...preValue,
			[e.target.name]: e.target.value
		}))
	}

	const onChangeHandler = (e) => {
		setCandidates((preValue) => ({
			...preValue,
			[e.target.name]: e.target.value
		}))
	}

	const onActiveOrDeactiveChange = (candidates, e) => {
		const candidateObj = {}
		candidateObj['_id'] = candidates._id;
		candidateObj['IsActive'] = candidates.IsActive;
		candidateObj['TableName'] = 'Candidates';
		dispatch(activateDeactivateCandidates(candidateObj))
	}

	const onEditClickHandler = (candidates, value) => {
		dispatch(getCirclesByElectionID({ElectionID: candidates.ElectionID}))
		setClassRow(candidates);
		setCandidates(candidates)
		setIsAddOrEdit(value);
		setShow(true);
	}

	const onDeleteClickHandler = candidates => {
		setShowDelete(true);
		setDeleteRow(candidates);
	}

	const onDeleteClick = () => {
		dispatch(deleteCandidates({ _id: deleteRow._id }));
		setShowDelete(false);
	}

	const { Candidates, isLoading, columnNames } = useSelector((state) => ({
		Candidates: state.Candidates.candidates,
		columnNames: state.Candidates.columnNames,
		isLoading: state.Candidates.isLoading,
	}));


	useEffect(() => {
    dispatch(getElections());
		dispatch(getCircles());
		dispatch(getCandidates());
		dispatch(getCandidatesTableColumnNames());
	}, [dispatch]);

	useEffect(() => {
		setData(Candidates)
	}, [Candidates]);
	return (
		<React.Fragment>
			<Toaster />
			<div className="page-content">
				<Container fluid>
					<Row className='mb-3'>
						<Col>
							<BreadCrumb title={t('Create Candidate')} />
						</Col>
					</Row>
					<Row className='mb-3'>
						<Col>
							<AddButton handleClassesClicks={handleClassesClicks} />
						</Col>
						<Col>
							<SearchTextBox initialData={Candidates} setData={setData} />
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
								<BasicTable data={data} columns={columns(columnNames, i18n, t, onEditClickHandler, onDeleteClickHandler, onActiveOrDeactiveChange)} />}
						</Col>
					</Row>
				</Container>
			</div>
			<AddModal show={show} setShow={setShow} onSubmitHandler={onSubmitHandler} title={isAddOrEdit === 'isAdd' ? t('Add New Candidate') : t('Edit Candidate')} modalBody={<AddCandidatesForm onSelectHandler={onSelectHandler} onChangeHandler={onChangeHandler} labels={labels} show={show} classRow={classRow} isAddOrEdit={isAddOrEdit} />} />
			<DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} onDeleteClick={onDeleteClick} />
		</React.Fragment>
	)
}

export default CreateCandidates;