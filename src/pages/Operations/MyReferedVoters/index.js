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
import {
  activateDeactivateCircles,
  addCircles,
  deleteCircles,
  getReferVoters,
  getReferVotersTableColumnNames,
  getElections,
  updateCircles,
  addReferVoters,
} from "../../../store/actions";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import ReferVoterModal from "../../../Components/Common/ReferVoterModal";
// import { getReferVoters } from "../../../helpers/fakebackend_helper";

const labels = [
  {
    id: 1,
    labelName: "Elections",
    fieldName: "election-drop-down",
    name: "ElectionID",
    value: "ElectionID",
  },
  {
    id: 2,
    labelName: "Circle Name English",
    fieldName: "text-box",
    name: "CircleNameEnglish",
    value: "CircleNameEnglish",
  },
  {
    id: 3,
    labelName: "Circle Name Arabic",
    fieldName: "text-box",
    name: "CircleNameArabic",
    value: "CircleNameArabic",
  },
];

const MyReferedVoters = () => {
  const { t, i18n } = useTranslation();
  document.title = t("KW-Elections | My Refered Voters");
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState();
  const [toAddVoter, setToAddVoter] = useState();
  const [referVoters, setReferVoters] = useState();
  const [classRow, setClassRow] = useState();
  const [isAddOrEdit, setIsAddOrEdit] = useState("isAdd");

  const handleClassesClicks = (value) => {
    setShow(true);
    setIsAddOrEdit(value);
    setClassRow({});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const circlesObj = {};
    const currentDate = new Date();
    isAddOrEdit === "isEdit" && (circlesObj["_id"] = referVoters["_id"]);
    isAddOrEdit === "isEdit" && (circlesObj["IsDelete"] = referVoters["IsDelete"]);
    isAddOrEdit === "isEdit" && (circlesObj["IsActive"] = referVoters["IsActive"]);
    circlesObj["CircleNameEnglish"] = referVoters.CircleNameEnglish;
    circlesObj["CircleNameArabic"] = referVoters.CircleNameArabic;
    circlesObj["ElectionID"] = referVoters.ElectionID;
    circlesObj["IsDelete"] = false;
    circlesObj["IsActive"] = true;
    circlesObj["CreatedBy"] = "AIgUO3mOWDarAIk8mXWs4IVwBLK2";
    circlesObj["ModifiedBy"] = "AIgUO3mOWDarAIk8mXWs4IVwBLK2";
    circlesObj["CreatedDate"] = currentDate.toISOString().slice(0, 10);
    circlesObj["ModifiedDate"] = currentDate.toISOString().slice(0, 10);
    isAddOrEdit === "isAdd"
      ? dispatch(addCircles(circlesObj))
      : dispatch(updateCircles(circlesObj));
    setShow(false);
  };

  const onChangeHandler = (e) => {
    setReferVoters((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onActiveOrDeactiveChange = (referVoters, e) => {
    const circlesObj = {};
    circlesObj["_id"] = referVoters._id;
    circlesObj["IsActive"] = referVoters.IsActive;
    circlesObj["TableName"] = "Circles";
    dispatch(activateDeactivateCircles(circlesObj));
  };

  const onEditClickHandler = (referVoters, value) => {
    setClassRow(referVoters);
    setReferVoters(referVoters);
    setIsAddOrEdit(value);
    setShow(true);
  };

  const onDeleteClickHandler = (referVoters) => {
    setShowDelete(true);
    setDeleteRow(referVoters);
  };

  const addReferVoterHandler = (referVoter) => {
    console.log('referVoters: ', referVoter);
    console.log("refering");
    setToAddVoter(referVoter._id)
    setShowReferModal(true);
  };

  const onDeleteClick = () => {
    dispatch(deleteCircles({ _id: deleteRow._id }));
    setShowDelete(false);
  };

  const onSaveReferClick = (referedVoterDetails) => {
    const referedBy = JSON.parse(sessionStorage.getItem("auth"))?.id;
    console.log('referedBy: ', referedBy);
    const data = {...referedVoterDetails, ReferedVoterId: toAddVoter, ReferedBy: referedBy }
    // TODO: dispatch action to add refered voters
    dispatch(addReferVoters(data))
    setShowReferModal(false)
  }

  // const { Circles, isLoading, columnNames } = useSelector((state) => ({
  //   Circles: state.Circles.circles,
  //   columnNames: state.Circles.columnNames,
  //   isLoading: state.Circles.isLoading,
  // }));

  const referVotersList = useSelector(({ ReferVoters }) => ReferVoters?.referVoters);
  const columnNames = useSelector(({ ReferVoters }) => ReferVoters?.columnNames);
  const isLoading = useSelector(({ ReferVoters }) => ReferVoters?.isLoading);
  console.log('referVotersList: ', referVotersList);
  console.log('columnNames: ', columnNames);

  useEffect(() => {
    // dispatch(getElections());
    dispatch(getReferVoters());
    dispatch(getReferVotersTableColumnNames());
  }, [dispatch]);

  useEffect(() => {
    setData(referVotersList);
  }, [referVotersList]);

  return (
    <React.Fragment>
      <Toaster />
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <BreadCrumb title={t("Refer Voters")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              {/* <AddButton handleClassesClicks={handleClassesClicks} /> */}
            </Col>
            <Col>
              <SearchTextBox initialData={referVotersList} setData={setData} />
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
                    addReferVoterHandler,
                    onActiveOrDeactiveChange
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
          isAddOrEdit === "isAdd" ? t("Add New Circles") : t("Edit Circles")
        }
        modalBody={
          <AddCirclesForm
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
      <ReferVoterModal
        showReferModal={showReferModal}
        setShowReferModal={setShowReferModal}
        onSaveReferClick={onSaveReferClick}
      />
    </React.Fragment>
  )
}

export default MyReferedVoters;