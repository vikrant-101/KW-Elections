import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import AddButton from "../../../Components/Common/AddButton";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import AddCirclesForm from "../../../Components/Common/Forms/AddCirclesForm";
import AddUsersForm from "../../../Components/Common/Forms/AddUsersForm";
import AddModal from "../../../Components/Common/Modal/AddModal";
import SearchTextBox from "../../../Components/Common/SearchTextBox";
import Toaster from "../../../Components/Common/Toaster";
import { BasicTable } from "../../Tables/DataTables/datatableCom";
import { columns } from "./DataTableColumns";
import {
  activateDeactivateUsers,
  addUsers,
  deleteUsers,
  updateUsers,
  getUsers,
  getUsersTableColumnNames
} from "../../../store/users/actions";
import { getCandidates } from "../../../store/candidates/actions";
import { getRoles } from "../../../store/actions";

const labels = [
  {
    id: 1,
    labelName: "Full Name Arabic",
    fieldName: "text-box",
    name: "FullNameArabic",
    value: "FullNameArabic",
  },
  {
    id: 3,
    labelName: "Role",
    fieldName: "role-drop-down",
    name: "RoleID",
    value: "RoleID",
  },
  {
    id: 4,
    labelName: "Mobile Number",
    fieldName: "mobile-number",
    name: "MobileNumber",
    value: "MobileNumber",
  },
];

const AddUsers = () => {
  const { t, i18n } = useTranslation();
  document.title = t("KW-Elections | Create Add Users");
  const dispatch = useDispatch();
  const auth = JSON.parse(sessionStorage.getItem('auth'))
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteRow, setDeleteRow] = useState();
  const [users, setUsers] = useState();
  const [classRow, setClassRow] = useState();
  const [isAddOrEdit, setIsAddOrEdit] = useState("isAdd");

  const handleClassesClicks = (value) => {
    setShow(true);
    setIsAddOrEdit(value);
    setClassRow({});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const usersObj = {};
    const currentDate = new Date();
    isAddOrEdit === "isEdit" && (usersObj["_id"] = users["_id"]);
    isAddOrEdit === "isEdit" && (usersObj["IsDelete"] = users["IsDelete"]);
    isAddOrEdit === "isEdit" && (usersObj["IsActive"] = users["IsActive"]);
    usersObj["FullNameEnglish"] = users.FullNameArabic;
    usersObj["FullNameArabic"] = users.FullNameArabic;
    if (users?.MobileNumber.includes('+965')) {
      usersObj["MobileNumber"] = users.MobileNumber;
    } else {
      usersObj["MobileNumber"] = '+965' + users.MobileNumber;
    }
    usersObj["IsDelete"] = false;
    usersObj["IsActive"] = true;
    usersObj["RoleID"] = +users.RoleID;
    if(auth.RoleID === 2) {
      usersObj["CandidateID"] = JSON.parse(sessionStorage.getItem("auth"))["id"];
      usersObj["CreatedBy"] = auth.id;
    } else {
      usersObj["CandidateID"] = JSON.parse(sessionStorage.getItem("auth"))["id"];
      usersObj["CreatedBy"] = auth?.CandidateID;
    }
    
    usersObj["CreatedDate"] = currentDate.toISOString().slice(0, 10);
    usersObj["ModifiedDate"] = currentDate.toISOString().slice(0, 10);
    isAddOrEdit === "isAdd"
      ? dispatch(addUsers(usersObj))
      : dispatch(updateUsers(usersObj));
    setShow(false);
  };

  const onChangeHandler = (e) => {
    setUsers((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onActiveOrDeactiveChange = (users, e) => {
    const usersObj = {};
    usersObj["_id"] = users._id;
    usersObj["IsActive"] = users.IsActive;
    usersObj["TableName"] = "Users";
    dispatch(activateDeactivateUsers(usersObj));
  };

  const onEditClickHandler = (users, value) => {
    setClassRow(users);
    setUsers(users);
    setIsAddOrEdit(value);
    setShow(true);
  };

  const onDeleteClickHandler = (users) => {
    setShowDelete(true);
    setDeleteRow(users);
  };

  const onDeleteClick = () => {
    dispatch(deleteUsers({ _id: deleteRow._id }));
    setShowDelete(false);
  };

  const { Users, isLoading, columnNames } = useSelector((state) => ({
    Users: state.Users.users,
    columnNames: state.Users.columnNames,
    isLoading: state.Users.isLoading,
  }));

  useEffect(() => {
    dispatch(getUsers({_id: auth['id']}));
    dispatch(getUsersTableColumnNames());
    dispatch(getCandidates())
    dispatch(getRoles({RoleID: auth['RoleID']}))
  }, [dispatch]);

  useEffect(() => {
    setData(Users);
  }, [Users]);
  return (
    <React.Fragment>
      <Toaster />
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <BreadCrumb title={t("Add Users")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <AddButton handleClassesClicks={handleClassesClicks} />
            </Col>
            <Col>
              <SearchTextBox initialData={Users} setData={setData} />
            </Col>
          </Row>
          <Row>
            <Col>
              {isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner style={{
                  height: '3rem',
                  width: '3rem',
                }} className='me-2'> Loading... </Spinner>
              </div> : (
                <BasicTable
                  data={data}
                  columns={columns(
                    columnNames,
                    i18n,
                    t,
                    onEditClickHandler,
                    onDeleteClickHandler,
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
        title={isAddOrEdit === "isAdd" ? t("Add New Users") : t("Edit Users")}
        modalBody={
          <AddUsersForm
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

export default AddUsers;
