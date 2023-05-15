import React from "react";
import { useTranslation } from "react-i18next";

const AddpdfButton = ({handleClassesClicks}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary btn-label rounded-pill"
        onClick={() => handleClassesClicks()}
      >
        <i className="ri-add-circle-fill label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
        {t('Print Pdf')}
      </button>
    </React.Fragment>
  )
}

export default AddpdfButton;