import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import AddButton from "../../../Components/Common/AddButton";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddCirclesForm from "../../../Components/Common/Forms/AddCirclesForm";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { activateDeactivateCircles, addCircles, deleteCircles, getCircles, getCirclesTableColumnNames, getElections, updateCircles } from "../../../store/actions";
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
		labelName: 'Circle Name English',
		fieldName: 'text-box',
		name: 'CircleNameEnglish',
		value: 'CircleNameEnglish'
	},
	{
		id: 3,
		labelName: 'Circle Name Arabic',
		fieldName: 'text-box',
		name: 'CircleNameArabic',
		value: 'CircleNameArabic'
	}
];
const CreateCircles = () => {
  const { t, i18n } = useTranslation();
	document.title = t('KW-Elections | Create Circles');
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [deleteRow, setDeleteRow] = useState();
	const [circles, setCircles] = useState();
	const [classRow, setClassRow] = useState();
	const [isAddOrEdit, setIsAddOrEdit] = useState('isAdd');

	const handleClassesClicks = (value) => {
		setShow(true);
		setIsAddOrEdit(value);
		setClassRow({});
	}

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const circlesObj = {};
		const currentDate = new Date();
		isAddOrEdit === 'isEdit' && (circlesObj['_id'] = circles['_id']);
		isAddOrEdit === 'isEdit' && (circlesObj['IsDelete'] = circles['IsDelete']);
		isAddOrEdit === 'isEdit' && (circlesObj['IsActive'] = circles['IsActive']);
		circlesObj['CircleNameEnglish'] = circles.CircleNameEnglish
    circlesObj['CircleNameArabic'] = circles.CircleNameArabic;
    circlesObj['ElectionID'] = circles.ElectionID;
		circlesObj['IsDelete'] =  false;
		circlesObj['IsActive'] = true;
    circlesObj['CreatedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
    circlesObj['ModifiedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
		circlesObj['CreatedDate'] =  currentDate.toISOString().slice(0, 10);
		circlesObj['ModifiedDate'] =  currentDate.toISOString().slice(0, 10);
		isAddOrEdit === 'isAdd' ?
			dispatch(addCircles(circlesObj)) :
			dispatch(updateCircles(circlesObj));
		setShow(false);
	}

	const onChangeHandler = (e) => {
		setCircles((preValue) => ({
			...preValue,
			[e.target.name]: e.target.value
		}))
	}

	const onActiveOrDeactiveChange = (circles, e) => {
		const circlesObj = {}
		circlesObj['_id'] = circles._id;
		circlesObj['IsActive'] = circles.IsActive;
		circlesObj['TableName'] = 'Circles';
		dispatch(activateDeactivateCircles(circlesObj))
	}

	const onEditClickHandler = (circles, value) => {
		setClassRow(circles);
		setCircles(circles)
		setIsAddOrEdit(value);
		setShow(true);
	}

	const onDeleteClickHandler = circles => {
		setShowDelete(true);
		setDeleteRow(circles);
	}

	const onDeleteClick = () => {
		dispatch(deleteCircles({ _id: deleteRow._id }));
		setShowDelete(false);
	}

	const { Circles, isLoading, columnNames } = useSelector((state) => ({
		Circles: state.Circles.circles,
		columnNames: state.Circles.columnNames,
		isLoading: state.Circles.isLoading,
	}));


	useEffect(() => {
    dispatch(getElections())
		dispatch(getCircles());
		dispatch(getCirclesTableColumnNames());
	}, [dispatch]);

	useEffect(() => {
		setData(Circles)
	}, [Circles]);
	return (
		<React.Fragment>
			<Toaster />
			<div className="page-content">
				<Container fluid>
					<Row className='mb-3'>
						<Col>
							<BreadCrumb title={t('Create Circles')} />
						</Col>
					</Row>
					<Row className='mb-3'>
						<Col>
							<AddButton handleClassesClicks={handleClassesClicks} />
						</Col>
						<Col>
							<SearchTextBox initialData={Circles} setData={setData} />
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
			<AddModal show={show} setShow={setShow} onSubmitHandler={onSubmitHandler} title={isAddOrEdit === 'isAdd' ? t('Add New Circles') : t('Edit Circles')} modalBody={<AddCirclesForm onChangeHandler={onChangeHandler} labels={labels} show={show} classRow={classRow} isAddOrEdit={isAddOrEdit} />} />
			<DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} onDeleteClick={onDeleteClick} />
		</React.Fragment>
	)
}

export default CreateCircles;