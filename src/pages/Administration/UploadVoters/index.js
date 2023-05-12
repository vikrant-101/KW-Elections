import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import AddButton from "../../../Components/Common/AddButton";
import AddLocalizationForm from "../../../Components/Common/AddLocalizationForm/AddLocalizationForm";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddElectionsForm from "../../../Components/Common/Forms/AddElectionsForm";
import AddCirclesForm from "../../../Components/Common/Forms/AddCirclesForm";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import {
  activateDeactivateElections,
  addElections,
  deleteElections,
  getElections,
  getElectionsTableColumnNames,
  updateElections,
} from "../../../store/elections/actions";

import {
  activateDeactivateUploadVoters,
  addUploadVoters,
  deleteUploadVoters,
  getUploadVoters,
  getUploadVotersTableColumnNames,
  updateUploadVoters,
} from "../../../store/uploadVoters/actions";

import { BasicTable } from "../../Tables/DataTables/datatableCom";
import Select from "react-select";
import { getCircles, getCirclesTableColumnNames } from "../../../store/actions";
//import { getUploadVoters, getUploadVotersTableColumnNames } from "../../../store/actions";
import { columns } from "./DataTableColumns";

const labels = [
  {
    id: 1,
    labelName: "Elections",
    fieldName: "election-drop-down",
    name: "Election",
    value: "Election",
  },
  {
    id: 2,
    labelName: "Circles",
    fieldName: "circle-drop-down",
    name: "Circles",
    value: "Circles",
  },
];

// const labels = [
//   {
// 		id: 1,
// 		labelName: 'Elections',
// 		fieldName: 'list-election-drop-down',
// 		name: 'ElectionID',
// 		value: 'Election'
// 	},
// 	{
// 		id: 2,
// 		labelName: 'Circles',
// 		fieldName: 'list-circle-drop-down',
// 		name: 'CircleID',
// 		value: 'Circles'
// 	},
// ];

const UploadVoters = () => {
  const { t, i18n } = useTranslation();
  document.title = t("KW-Elections | Create Elections");
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteRow, setDeleteRow] = useState();
  const [elections, setElections] = useState();
  const [uploadVotersDetails, setUploadVotersDetails] = useState(null);
  const [classRow, setClassRow] = useState();
  const [isAddOrEdit, setIsAddOrEdit] = useState("isAdd");

  const handleClassesClicks = (value) => {
    setShow(true);
    setIsAddOrEdit(value);
    setClassRow({});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("uploadVoters", JSON.stringify(uploadVotersDetails));
    console.log("uploadVotersDetails: ", uploadVotersDetails);
    // const electionsObj = {};
    // const currentDate = new Date();
    // isAddOrEdit === 'isEdit' && (electionsObj['_id'] = elections['_id']);
    // isAddOrEdit === 'isEdit' && (electionsObj['IsDelete'] = elections['IsDelete']);
    // isAddOrEdit === 'isEdit' && (electionsObj['IsActive'] = elections['IsActive']);
    // electionsObj['ElectionNameEnglish'] = elections.ElectionNameEnglish
    // electionsObj['ElectionNameArabic'] = elections.ElectionNameArabic;
    // electionsObj['IsDelete'] = false;
    // electionsObj['IsActive'] = true;
    // electionsObj['CreatedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
    // electionsObj['ModifiedBy'] = 'AIgUO3mOWDarAIk8mXWs4IVwBLK2';
    // electionsObj['CreatedDate'] = currentDate.toISOString().slice(0, 10);
    // electionsObj['ModifiedDate'] = currentDate.toISOString().slice(0, 10);
    // isAddOrEdit === 'isAdd' ?
    // dispatch(addElections(electionsObj)) :
    // dispatch(updateElections(electionsObj));
    setShow(false);
  };

  const onChangeHandler = (e) => {
    // console.log( JSON.parse(e.target.value),e.target.name,"submit name value  selected option");
    // let electionCircleData={}
    // electionCircleData[]
    // setElections((preValue) => ({
    //   ...preValue,
    //   [e.target.name]: e.target.value
    // }))
    let val = JSON.parse(e.target.value);
    console.log(val);
    setUploadVotersDetails((preValue) => ({
      ...preValue,
      [e.target.name]: {
        _id: val._id,
        name: val.name,
      },
    }));
  };

  const onActiveOrDeactiveChange = (elections, e) => {
    const electionsObj = {};
    electionsObj["_id"] = elections._id;
    electionsObj["IsActive"] = elections.IsActive;
    electionsObj["TableName"] = "Elections";
    dispatch(activateDeactivateElections(electionsObj));
  };

  const onEditClickHandler = (elections, value) => {
    setClassRow(elections);
    setElections(elections);
    setIsAddOrEdit(value);
    setShow(true);
  };

  const onDeleteClickHandler = (elections) => {
    setShowDelete(true);
    setDeleteRow(elections);
  };

  const onDeleteClick = () => {
    dispatch(deleteElections({ _id: deleteRow._id }));
    setShowDelete(false);
  };

  const { Elections, isLoading, columnNames } = useSelector((state) => ({
    Elections: state.Elections.elections,
    columnNames: state.Elections.columnNames,
    isLoading: state.Elections.isLoading,
  }));

  // const { uploadVoters, isLoading, columnNames } = useSelector((state) => ({
  //   columnNames: state.uploadVoters.columnNames,
  // }));

  useEffect(() => {
    dispatch(getElections());
    dispatch(getElectionsTableColumnNames());
  }, [dispatch]);

  // useEffect(() => {
  //   setData(Elections)
  // }, [Elections]);

  let dataTest = [
    { electionName: "Election1", circleName: "Circle 2023" },
    { electionName: "Election1", circleName: "Circle 2023" },
    { electionName: "Election1", circleName: "Circle 2023" },
    { electionName: "Election1", circleName: "Circle 2023" },
    { electionName: "Election1", circleName: "Circle 2023" },
  ];
  useEffect(() => {
    console.log("uploadVoters", dataTest);
    setData(dataTest);
  }, []);

  const { Circles } = useSelector((state) => ({
    Circles: state.Circles.circles,
  }));

  // const { UploadVoters } = useSelector((state) => ({
  // 	UploadVoters: state.UploadVoters.uploadVoters,

  // }));

  useEffect(() => {
    dispatch(getElections());
    dispatch(getCircles());
    dispatch(getUploadVoters());
    //dispatch(getCirclesTableColumnNames());
    dispatch(getUploadVotersTableColumnNames());
  }, [dispatch]);

  useEffect(() => {
    setData(Circles);
  }, [Circles]);

  // const updaloadVotersHandlers = (e)=>{
  //   console.log("upload voters import");

  // }

  // useEffect(() => {
  // 	setData(UploadVoters)
  // }, [UploadVoters]);

  const updaloadVotersHandlers = () => {
    console.log("uploading Voters");
  };

  return (
    <React.Fragment>
      <Toaster />
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <BreadCrumb title={t("Upload Voters Component")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <AddButton handleClassesClicks={handleClassesClicks} />
            </Col>
            <Col>
              {/* <SearchTextBox initialData={Elections} setData={setData} /> */}
            </Col>
          </Row>
          <Row>
            <Col>
              {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Spinner
                    style={{
                      height: "3rem",
                      width: "3rem",
                    }}
                    className="me-2"
                  >
                    {" "}
                    Loading...{" "}
                  </Spinner>
                </div>
              ) : (
                <BasicTable
                  data={data}
                  columns={columns(
                    columnNames,
                    i18n,
                    t,
                    onEditClickHandler,
                    onDeleteClickHandler,
                    onActiveOrDeactiveChange,
                    updaloadVotersHandlers,
                  )}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <AddModal
        show={show}
        setShow={setShow}
        onSubmitHandler={onSubmitHandler}
        title={
          isAddOrEdit === "isAdd"
            ? t("Select Elections & Circle")
            : t("Select Elections & Circle")
        }
        modalBody={
          <AddElectionsForm
            onChangeHandler={onChangeHandler}
            labels={labels}
            show={show}
            classRow={classRow}
            isAddOrEdit={isAddOrEdit}
          />
        }
      />
      <DeleteModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        onDeleteClick={onDeleteClick}
      />
    </React.Fragment>
  );
};

export default UploadVoters;
