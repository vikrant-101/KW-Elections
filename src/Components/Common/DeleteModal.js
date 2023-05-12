import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";

const DeleteModal = ({ showDelete,setShowDelete, onDeleteClick }) => {
  const {t} = useTranslation();
  return (
    <Modal isOpen={showDelete}  centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          {/* <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#405189,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon> */}
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{t('Are you sure ?')}</h4>
            <p className="text-muted mx-4 mb-0">
              {t('Are you sure you want to remove this record ?')}
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={()=>setShowDelete(false)}
          >
            {t('Close')}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
            {t('Yes, Delete It!')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  showDelete: PropTypes.any,
};

export default DeleteModal;