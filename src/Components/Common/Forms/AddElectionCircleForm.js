import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Input, Row } from "reactstrap";
// import SelectDropDown from "../Select-DropDown/SelectDropDown";

// ************* MODAL FORM ****************
const AddElectionCircleForm = ({
  labels,
  formData,
  onChangeHandler,
  electionList,
  circleList,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Row>
      {labels?.map((items) => {
        switch (items?.fieldName) {
          case "election-drop-down":
            return (
              <Col key={items?.id} sm={6}>
                <div className="mb-3">
                  <label htmlFor="country" className="col-form-label">
                    {t(items?.labelName)}
                  </label>
                  <select
                    className="form-control"
                    id={items.labelName}
                    defaultValue={formData["election"]}
                    name={items?.name}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="">Choose election</option>
                    {electionList?.map((item) => {
                      return (
                        <option
                          key={item?._id}
                          value={JSON.stringify(item)}
                          name={item?.ElectionNameEnglish}
                        >
                          {i18n?.language === "en"
                            ? item?.ElectionNameEnglish
                            : item?.ElectionNameArabic}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Col>
            );

          case "circle-drop-down":
            return (
              <Col key={items?.id} sm={6}>
                <div className="mb-3">
                  <label htmlFor="country" className="col-form-label">
                    {t(items?.labelName)}
                  </label>
                  <select
                    className="form-control"
                    id={items.labelName}
                    defaultValue={formData["circle"]}
                    name={items?.name}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="">Choose circle</option>
                    {circleList?.map((item) => {
                      return (
                        <option
                          key={item?._id}
                          value={item?.CircleNameEnglish}
                          name={item?.CircleNameEnglish}
                        >
                          {i18n?.language === "en"
                            ? item?.CircleNameEnglish
                            : item?.CircleNameArabic}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Col>
            );

          default:
            return null;
        }
      })}
    </Row>
  );
};

export default AddElectionCircleForm;
