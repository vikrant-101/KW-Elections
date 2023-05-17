import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AddModal from "../../../Components/Common/Modal/AddModal";
import Toaster from "../../../Components/Common/Toaster";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import {
  getCircles,
  getElections,
  getElectionCircle,
  addElectionCircle,
  getUploadVotersTableColumnNames,
  addUploadVoters,
  csvBeingUploaded,
} from "../../../store/actions";
import { columns } from "./DataTableColumns";
import AddElectionCircleForm from "../../../Components/Common/Forms/AddElectionCircleForm";

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
    name: "Circle",
    value: "Circle",
  },
];

const UploadVoters = () => {
  const { t, i18n } = useTranslation();
  document.title = t("KW-Elections | Upload Voters");
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadingCSVfor, setUploadingCSVfor] = useState();

  const uploadVotersList = useSelector(
    ({ UploadVoters }) => UploadVoters?.uploadVoters
  );
  const columnNames = useSelector(
    ({ UploadVoters }) => UploadVoters?.columnNames
  );
  const isLoading = useSelector(({ UploadVoters }) => UploadVoters?.isLoading);
  const beingUploaded = useSelector(({ UploadVoters }) => UploadVoters?.beingUploaded);
  const electionList = useSelector(({ Elections }) => Elections?.elections);
  const circleList = useSelector(({ Circles }) => Circles?.circles);
  const electionCircleList = useSelector(
    ({ UploadVoters }) => UploadVoters?.electionCircle
  );

  // custom file attachment
  const inputRef = useRef(null);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    const convertedFile = await getBase64(file);
    const base64File = convertedFile?.split(",")[1];
    const data = { base64Csv: base64File, TabelID: uploadingCSVfor };
    dispatch(csvBeingUploaded(uploadingCSVfor));
    dispatch(addUploadVoters(data));
  };

  const updaloadVotersHandlers = (electionCircle) => {
    setUploadingCSVfor(electionCircle._id);
    inputRef.current.click();
  };

  const [formData, setFormData] = useState({
    Election: "",
    Circle: "",
  });
  const [filteredCircleList, setFilteredCircleList] = useState([]);

  const onChangeHandler = (e) => {
    if (e.target.name === "Election") {
      const electionObject = JSON.parse(e.target.value);
      setFormData((prev) => ({
        ...prev,
        Election: electionObject["ElectionNameEnglish"],
      }));
      setFilteredCircleList(
        circleList?.filter((circle) => circle.ElectionID === electionObject._id)
      );
    } else {
      setFormData((prev) => ({
        ...prev,
        Circle: e.target.value,
      }));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    dispatch(addElectionCircle(formData));
  };

  useEffect(() => {
    dispatch(getElections());
    dispatch(getCircles());
    dispatch(getElectionCircle());
    dispatch(getUploadVotersTableColumnNames());
  }, [dispatch]);

  useEffect(() => {
    setData(electionCircleList);
  }, [electionCircleList]);

  return (
    <React.Fragment>
      <Toaster />
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <BreadCrumb title={t("Upload Voters")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <AddElectionCircleButton onClick={() => setShowAddModal(true)} />
            </Col>
            <Col>
              <SearchTextBox
                initialData={electionCircleList}
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
                    inputRef,
                    beingUploaded,
                    handleFileInput,
                    updaloadVotersHandlers
                  )}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <AddModal
        show={showAddModal}
        setShow={setShowAddModal}
        onSubmitHandler={onSubmitHandler}
        title={t("Select Elections & Circle")}
        modalBody={
          <AddElectionCircleForm
            formData={formData}
            onChangeHandler={onChangeHandler}
            electionList={electionList}
            circleList={filteredCircleList}
            labels={labels}
          />
        }
      />
    </React.Fragment>
  );
};

export default UploadVoters;

const AddElectionCircleButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary btn-label rounded-pill"
        onClick={onClick}
      >
        <i className="ri-add-circle-fill label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
        {t("Add New")}
      </button>
    </React.Fragment>
  );
};
