import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import {
  getMyReferedVoters,
  getMyReferedVotersTableColumnNames,
  updateMyReferedVoters,
  deleteMyReferedVoters,
} from "../../../store/actions";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import EditReferVoterModal from "../../../Components/Common/EditReferVoterModal";

const MyReferedVoters = () => {
  const { t, i18n } = useTranslation();
  document.title = t("KW-Elections | My Refered Voters");
  const authUser = JSON.parse(sessionStorage.getItem("auth"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditReferModal, setShowEditReferModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState();
  const [toAddVoter, setToAddVoter] = useState();
  const [detailsByCurrentUser, setDetailsByCurrentUser] = useState();
  const currentUser = authUser?.id;

  const myReferedVotersList = useSelector(
    ({ MyReferedVoters }) => MyReferedVoters?.myReferedVoters
  );
  const columnNames = useSelector(
    ({ MyReferedVoters }) => MyReferedVoters?.columnNames
  );
  const isLoading = useSelector(
    ({ MyReferedVoters }) => MyReferedVoters?.isLoading
  );

  const onEditClickHandler = (referedVoter, value) => {
    setToAddVoter(referedVoter._id);
    const modalDetails = myReferedVotersList?.find(
      (el) => el._id === referedVoter._id
    )?.ReferBy;
    const modaldetail = modalDetails?.find((el) => el?.ReferID === currentUser);
    setDetailsByCurrentUser(modaldetail);
    setShowEditReferModal(true);
  };

  const onDeleteClickHandler = (myReferVoters) => {
    setShowDelete(true);
    setDeleteRow(myReferVoters._id);
  };

  const onDeleteClick = () => {
    const referedBy = JSON.parse(sessionStorage.getItem("auth"))?.id;
    const data = { RFID: referedBy, UserID: deleteRow };
    dispatch(deleteMyReferedVoters(data));
    setShowDelete(false);
  };

  const onSaveReferClick = (referedVoterDetails) => {
    const referedBy = JSON.parse(sessionStorage.getItem("auth"))?.id;
    const data = {
      ...referedVoterDetails,
      UserID: toAddVoter,
      ReferID: referedBy,
    };
    // TODO: dispatch action to add refered voters
    dispatch(updateMyReferedVoters(data));
    setShowEditReferModal(false);
  };

  useEffect(() => {
    dispatch(getMyReferedVoters());
    dispatch(getMyReferedVotersTableColumnNames());
  }, [dispatch]);

  useEffect(() => {
    setData(myReferedVotersList);
  }, [myReferedVotersList]);

  return (
    <React.Fragment>
      <Toaster />
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <BreadCrumb title={t("My Refered Voters")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col>
              <SearchTextBox
                initialData={myReferedVotersList}
                setData={setData}
              />
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
                  )}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <DeleteModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        onDeleteClick={onDeleteClick}
      />
      <EditReferVoterModal
        detailsByCurrentUser={detailsByCurrentUser}
        showEditReferModal={showEditReferModal}
        setShowEditReferModal={setShowEditReferModal}
        onSaveReferClick={onSaveReferClick}
      />
    </React.Fragment>
  );
};

export default MyReferedVoters;
