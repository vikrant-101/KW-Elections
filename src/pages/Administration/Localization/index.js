import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import AddButton from "../../../Components/Common/AddButton";
import AddLocalizationForm from "../../../Components/Common/AddLocalizationForm/AddLocalizationForm";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { activateDeactivateLocalizationFail, addLocalization, deleteLocalization, deleteLocalizationFail, getLocalization, getLocalizationTableColumnNames, getScreens, updateLocalization } from "../../../store/localization/actions";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";

const labels = [
	{
		id: 1,
		labelName: 'Screen Selection',
		fieldName: 'screen-drop-down',
		name: 'ScreenID',
		value: 'ScreenID'
	},
	{
		id: 2,
		labelName: 'Label Key',
		fieldName: 'text-box',
		name: 'LabelKey',
		value: 'LabelKey'
	},
	{
		id: 3,
		labelName: 'Label Name English',
		fieldName: 'text-box',
		name: 'LabelNameEnglish',
		value: 'LabelNameEnglish'
	},
	{
		id: 4,
		labelName: 'Label Name Arabic',
		fieldName: 'text-box',
		name: 'LabelNameArabic',
		value: 'LabelNameArabic'
	},

]
const Localization = () => {
  const { t, i18n } = useTranslation();
	document.title = t('KW-Elections | Localization');
	const authUser = JSON.parse(sessionStorage.getItem("authUser"));
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [deleteRow, setDeleteRow] = useState();
	const [localization, setLocalization] = useState();
	const [classRow, setClassRow] = useState();
	const [isAddOrEdit, setIsAddOrEdit] = useState('isAdd');

	const handleClassesClicks = (value) => {
		setShow(true);
		setIsAddOrEdit(value);
		setClassRow({});
	}

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const localizationObj = {};
		const currentDate = new Date();
		isAddOrEdit === 'isEdit' && (localizationObj['_id'] = localization['_id']);
		isAddOrEdit === 'isEdit' && (localizationObj['IsDelete'] = localization['IsDelete']);
		isAddOrEdit === 'isEdit' && (localizationObj['IsActive'] = localization['IsActive']);
		localizationObj['LabelKey'] = localization.LabelKey;
		localizationObj['ScreenID'] = localization.ScreenID;
		localizationObj['LabelNameEnglish'] = localization.LabelNameEnglish
    localizationObj['LabelNameArabic'] = localization.LabelNameArabic;
		localizationObj['IsDelete'] =  false;
		localizationObj['IsActive'] = true;
    localizationObj['CreatedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
    localizationObj['ModifiedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
		localizationObj['CreatedDate'] =  currentDate.toISOString().slice(0, 10);
		localizationObj['ModifiedDate'] =  currentDate.toISOString().slice(0, 10);
		isAddOrEdit === 'isAdd' ?
			dispatch(addLocalization(localizationObj)) :
			dispatch(updateLocalization(localizationObj));
		setShow(false);
	}

	const onChangeHandler = (e) => {
		setLocalization((preValue) => ({
			...preValue,
			[e.target.name]: e.target.value
		}))
	}

	const onActiveOrDeactiveChange = (localization, e) => {
		const localizationObj = {}
		localizationObj['_id'] = localization._id;
		localizationObj['IsActive'] = localization.IsActive;
		localizationObj['TableName'] = 'Localizations';
		dispatch(activateDeactivateLocalizationFail(localizationObj))
	}

	const onEditClickHandler = (localization, value) => {
		setClassRow(localization);
		setLocalization(localization)
		setIsAddOrEdit(value);
		setShow(true);
	}

	const onDeleteClickHandler = localization => {
		setShowDelete(true);
		setDeleteRow(localization);
	}

	const onDeleteClick = () => {
		dispatch(deleteLocalization({ _id: deleteRow._id }));
		setShowDelete(false);
	}

	const { Localization, isLoading, columnNames } = useSelector((state) => ({
		Localization: state.Localization.localization,
		columnNames: state.Localization.columnNames,
		isLoading: state.Localization.isLoading,
	}));

	const onTranslateClickHandler = () => {
		// dispatch((getTranslation({ LangText: localization.ValueEn })))
	}

	useEffect(() => {
		dispatch(getScreens());
		dispatch(getLocalization());
		dispatch(getLocalizationTableColumnNames());
	}, [dispatch]);

	useEffect(() => {
		setData(Localization)
	}, [Localization]);
	return (
		<React.Fragment>
			<Toaster />
			<div className="page-content">
				<Container fluid>
					<Row className='mb-3'>
						<Col>
							<BreadCrumb title={t('Localization')} />
						</Col>
					</Row>
					<Row className='mb-3'>
						<Col>
							<AddButton handleClassesClicks={handleClassesClicks} />
						</Col>
						<Col>
							<SearchTextBox initialData={Localization} setData={setData} />
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
			<AddModal show={show} setShow={setShow} onSubmitHandler={onSubmitHandler} title={isAddOrEdit === 'isAdd' ? t('Add New Localization') : t('Edit Localization')} modalBody={<AddLocalizationForm onChangeHandler={onChangeHandler} onTranslateClickHandler={onTranslateClickHandler}   labels={labels} show={show} classRow={classRow} isAddOrEdit={isAddOrEdit} />} />
			<DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} onDeleteClick={onDeleteClick} />
		</React.Fragment>
	)
}

export default Localization;