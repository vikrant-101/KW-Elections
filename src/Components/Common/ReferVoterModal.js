import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const ReferVoterModal = ({
  showReferModal,
  setShowReferModal,
  onSaveReferClick,
}) => {
  const { t } = useTranslation();
  const [referedVoterDetails, setReferedVoterDetails] = useState({MobileNo: null, Comment: ""})

  const handleVoterDetailChange = (e) => {
    setReferedVoterDetails((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  return (
    <Modal isOpen={showReferModal} centered={true}>
      <ModalHeader>Refer Voter</ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row className="my-3">
          <Col sm={4}>
            <div className="mb-3">
              <label htmlFor="phone-number" className="col-form-label">
                Phone number:
              </label>
            </div>
          </Col>
          <Col xs={8}>
            <div className="lang-change-wrap">
              <Input
                type="number"
                name="MobileNo"
                className="form-control"
                onChange={handleVoterDetailChange}
                id="phone-number"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <div className="mb-3">
              <label htmlFor="comment" className="col-form-label">
                Comment:
              </label>
            </div>
          </Col>
          <Col xs={8}>
            <div className="lang-change-wrap">
              <Input
                type="textarea"
                name="Comment"
                className="form-control"
                onChange={handleVoterDetailChange}
                id="commentr"
              />
            </div>
          </Col>
        </Row>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={() => setShowReferModal(false)}
          >
            {t("Close")}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="refer-voter"
            onClick={() => onSaveReferClick(referedVoterDetails)}
          >
            {t("Add")}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

ReferVoterModal.propTypes = {
  onCloseClick: PropTypes.func,
  onSaveReferClick: PropTypes.func,
  showReferModal: PropTypes.any,
};

export default ReferVoterModal;
