import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import AddButton from "../../../Components/Common/AddButton";
import AddLocalizationForm from "../../../Components/Common/AddLocalizationForm/AddLocalizationForm";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddElectionsForm from "../../../Components/Common/Forms/AddElectionsForm";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { activateDeactivateElections, addElections, deleteElections, getElections, getElectionsTableColumnNames, updateElections } from "../../../store/elections/actions";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";


const labels = [
	{
		id: 1,
		labelName: 'Election Name English',
		fieldName: 'text-box',
		name: 'ElectionNameEnglish',
		value: 'ElectionNameEnglish'
	},
	{
		id: 2,
		labelName: 'Election Name Arabic',
		fieldName: 'text-box',
		name: 'ElectionNameArabic',
		value: 'ElectionNameArabic'
	}

]
const CreateElections = () => {
  const { t, i18n } = useTranslation();
	document.title = t('KW-Elections | Create Elections');
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [deleteRow, setDeleteRow] = useState();
	const [elections, setElections] = useState();
	const [classRow, setClassRow] = useState();
	const [isAddOrEdit, setIsAddOrEdit] = useState('isAdd');

	const handleClassesClicks = (value) => {
		setShow(true);
		setIsAddOrEdit(value);
		setClassRow({});
	}

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const electionsObj = {};
		const currentDate = new Date();
		isAddOrEdit === 'isEdit' && (electionsObj['_id'] = elections['_id']);
		isAddOrEdit === 'isEdit' && (electionsObj['IsDelete'] = elections['IsDelete']);
		isAddOrEdit === 'isEdit' && (electionsObj['IsActive'] = elections['IsActive']);
		electionsObj['ElectionNameEnglish'] = elections.ElectionNameEnglish
    electionsObj['ElectionNameArabic'] = elections.ElectionNameArabic;
		electionsObj['IsDelete'] =  false;
		electionsObj['IsActive'] = true;
    electionsObj['CreatedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
    electionsObj['ModifiedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
		electionsObj['CreatedDate'] =  currentDate.toISOString().slice(0, 10);
		electionsObj['ModifiedDate'] =  currentDate.toISOString().slice(0, 10);
		isAddOrEdit === 'isAdd' ?
			dispatch(addElections(electionsObj)) :
			dispatch(updateElections(electionsObj));
		setShow(false);
	}

	const onChangeHandler = (e) => {
		setElections((preValue) => ({
			...preValue,
			[e.target.name]: e.target.value
		}))
	}

	const onActiveOrDeactiveChange = (elections, e) => {
		const electionsObj = {}
		electionsObj['_id'] = elections._id;
		electionsObj['IsActive'] = elections.IsActive;
		electionsObj['TableName'] = 'Elections';
		dispatch(activateDeactivateElections(electionsObj))
	}

	const onEditClickHandler = (elections, value) => {
		setClassRow(elections);
		setElections(elections)
		setIsAddOrEdit(value);
		setShow(true);
	}

	const onDeleteClickHandler = elections => {
		setShowDelete(true);
		setDeleteRow(elections);
	}

	const onDeleteClick = () => {
		dispatch(deleteElections({ _id: deleteRow._id }));
		setShowDelete(false);
	}

	const { Elections, isLoading, columnNames } = useSelector((state) => ({
		Elections: state.Elections.elections,
		columnNames: state.Elections.columnNames,
		isLoading: state.Elections.isLoading,
	}));


	useEffect(() => {
		dispatch(getElections());
		dispatch(getElectionsTableColumnNames());
	}, [dispatch]);

	useEffect(() => {
		setData(Elections)
	}, [Elections]);
	return (
		<React.Fragment>
			<Toaster />
			<div className="page-content">
				<Container fluid>
					<Row className='mb-3'>
						<Col>
							<BreadCrumb title={t('Create Elections')} />
						</Col>
					</Row>
					<Row className='mb-3'>
						<Col>
							<AddButton handleClassesClicks={handleClassesClicks} />
						</Col>
						<Col>
							<SearchTextBox initialData={Elections} setData={setData} />
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
			<AddModal show={show} setShow={setShow} onSubmitHandler={onSubmitHandler} title={isAddOrEdit === 'isAdd' ? t('Add New Elections') : t('Edit Elections')} modalBody={<AddElectionsForm onChangeHandler={onChangeHandler} labels={labels} show={show} classRow={classRow} isAddOrEdit={isAddOrEdit} />} />
			<DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} onDeleteClick={onDeleteClick} />
		</React.Fragment>
	)
}

export default CreateElections;