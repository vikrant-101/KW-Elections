import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import {
  getReferVoters,
  getReferVotersTableColumnNames,
  addReferVoters,
  updateMyReferedVoters,
} from "../../../store/actions";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import ReferVoterModal from "../../../Components/Common/ReferVoterModal";
import EditReferVoterModal from "../../../Components/Common/EditReferVoterModal";
// import { getReferVoters } from "../../../helpers/fakebackend_helper";

const ReferVoters = () => {
  const { t, i18n } = useTranslation();
  document.title = t("KW-Elections | Refer Voters");
  const authUser = JSON.parse(sessionStorage.getItem("auth"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showReferModal, setShowReferModal] = useState(false);
  const [showEditReferModal, setShowEditReferModal] = useState(false);
  const [toAddVoter, setToAddVoter] = useState();
  const [isAddOrEdit, setIsAddOrEdit] = useState();
  const [detailsByCurrentUser, setDetailsByCurrentUser] = useState();

  const currentUser = authUser?.id;

  const referVotersList = useSelector(
    ({ ReferVoters }) => ReferVoters?.referVoters
  );
  const columnNames = useSelector(
    ({ ReferVoters }) => ReferVoters?.columnNames
  );
  const isLoading = useSelector(({ ReferVoters }) => ReferVoters?.isLoading);

  const addReferVoterHandler = (referVoter, mode) => {
    setIsAddOrEdit(mode);
    setToAddVoter(referVoter._id);
    if (mode === "edit") {
      const modalDetails = referVotersList?.find(
        (el) => el._id === referVoter._id
      )?.ReferBy;
      const modaldetail = modalDetails?.find(
        (el) => el?.ReferID === currentUser
      );
      setDetailsByCurrentUser(modaldetail);
      setShowEditReferModal(true);
    } else setShowReferModal(true);
  };

  const onSaveReferClick = (referedVoterDetails) => {
    const data = {
      ...referedVoterDetails,
      UserID: toAddVoter,
      ReferID: currentUser,
    };
    if (isAddOrEdit === "add") {
      dispatch(addReferVoters(data));
      setShowReferModal(false);
    } else {
      dispatch(updateMyReferedVoters(data));
      setShowEditReferModal(false);
    }
  };

  let user = sessionStorage.getItem('auth')
  user = JSON.parse(user)
  
  useEffect(() => {
    dispatch(getReferVoters({userID: user.id}));
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
            <Col></Col>
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
                  columns={columns(columnNames, i18n, t, addReferVoterHandler)}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <ReferVoterModal
        showReferModal={showReferModal}
        setShowReferModal={setShowReferModal}
        onSaveReferClick={onSaveReferClick}
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

export default ReferVoters;
