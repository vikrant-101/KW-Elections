import { Modal, Button, ModalHeader } from "reactstrap";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import i18n from "../../../i18n";

const AddModal = ({ show, setShow, modalBody, showButton, title, onSubmitHandler, validationError, formArray, isAddOrEdit, duplicateTutor, defaultRoles, saveBtn }) => {
    const [isValid, setIsValid] = useState(validationError);

    return (
        // {/********************* MODAL *****************/}
        <Modal
            size="xl"
            isOpen={show}
            toggle={() => {
                setShow(false)
            }}
        >

            {/********************* MODAL HEADER *****************/}
            <ModalHeader id="myExtraLargeModalLabel" toggle={() => {
                setShow(false)
            }}>
                {title}
            </ModalHeader>


            {/* ********************* MODAL BODY ***************** */}
            <form onSubmit={(e) => onSubmitHandler(e)} encType="multipart/form-data">
                <div className="modal-body">
                    {modalBody}
                </div>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setShow(false)}><i className="ri-close-line me-1 align-middle"></i> {i18n.t('Close')}</Link>
                    {
                        (isAddOrEdit !== 'isAcademic' && isAddOrEdit !== 'payments' && isAddOrEdit !==  'ViewSessions' && !saveBtn) && <Button
                            type="submit"
                            disabled={isAddOrEdit !== 'addRoles' && formArray?.length === 0 ? true : false || duplicateTutor ? true : false || defaultRoles ? true : false} color="primary">< i className="ri-save-3-fill align-bottom me-2"></i>{i18n.t('Save changes')}</Button>
                    }

                    {
                        (isAddOrEdit !== 'isAcademic' && isAddOrEdit === 'payments' && !saveBtn) && <Button
                            type="submit"
                            color="primary">< i className="ri-save-3-fill align-bottom me-2"></i>{i18n.t('Save payment')}</Button>
                    }
                    {
                       (isAddOrEdit !== 'isAcademic' && isAddOrEdit !== 'payments' && isAddOrEdit !==  'ViewSessions' && saveBtn) && <Button
                       type="submit"
                       disabled={showButton} color="primary">< i className="ri-save-3-fill align-bottom me-2"></i>{i18n.t('Save changes')}</Button> 
                    }
                    
                </div>
            </form>
        </Modal>
    );
};

AddModal.propTypes = {
    onSubmitHandler: PropTypes.func,
    show: PropTypes.bool,
};

export default AddModal;
