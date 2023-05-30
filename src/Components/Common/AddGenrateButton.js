import React from "react";
import { useTranslation } from "react-i18next";

const AddGenrateButton = ({handleClassesClicks}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-success btn-label rounded-pill"
        onClick={() => handleClassesClicks('isAdd')}
      >
        <i className="ri-task-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
        {t('Generate')}
      </button>
    </React.Fragment>
  )
}

export default AddGenrateButton;