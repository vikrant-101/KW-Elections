import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";
import OtpInput from 'react-otp-input';

const OtpModal = ({ showDelete, setShowDelete, onOTPVerify,otp,setOtp }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={showDelete} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <div className="mt-4 pt-2 fs-15 opt-container">
            <h4 className="w-full mb-3">{t('Verify OTP')}</h4>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              className="opt-wrap"
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={() => setShowDelete(false)}
          >
            {t('Close')}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onOTPVerify}
          >
            {t('verify')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};



export default OtpModal;