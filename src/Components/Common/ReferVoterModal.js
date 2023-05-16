import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useSelector } from "react-redux";

const ReferVoterModal = ({
  showReferModal,
  setShowReferModal,
  onSaveReferClick,
}) => {
  const { t } = useTranslation();

  const [referedVoterDetails, setReferedVoterDetails] = useState({});

  const handleVoterDetailChange = (e) => {
    setReferedVoterDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onCloseHandle = () => {
    setReferedVoterDetails({});
    setShowReferModal(false)
  }
  const isInValidNumber =
    (referedVoterDetails?.MobileNo?.length < 8 &&
      referedVoterDetails?.MobileNo?.length > 0) ||
    referedVoterDetails?.MobileNo?.length > 8;
  return (
    <Modal isOpen={showReferModal} centered={true}>
      <ModalHeader>Refer Voter</ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row className="my-3">
          <Col sm={4}>
            <div className="mb-3">
              <label htmlFor="phone-number" className="col-form-label">
                {t("Mobile Number")}
              </label>
            </div>
          </Col>
          <Col xs={8}>
            <div className="lang-change-wrap">
              <Input
                type="number"
                name="MobileNo"
                className="form-control"
                invalid={isInValidNumber}
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
                {t("Comment")}
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
                id="comment"
              />
            </div>
          </Col>
        </Row>

        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseHandle}
          >
            {t("Close")}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            disabled={isInValidNumber}
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
