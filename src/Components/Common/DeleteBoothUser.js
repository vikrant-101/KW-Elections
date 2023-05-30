import React from "react";
import { useTranslation } from "react-i18next";

const DeleteBoothUser = ({handleDeleteBoothUsers}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-danger btn-label rounded-pill ml-2"
        onClick={() => handleDeleteBoothUsers()}
      >
        <i className="ri-delete-bin-fill label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
        {t('Delete Booth Users')}
      </button>
    </React.Fragment>
  )
}

export default DeleteBoothUser;