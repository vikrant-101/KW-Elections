import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Input, Row } from "reactstrap";
// import SelectDropDown from "../Select-DropDown/SelectDropDown";

// ************* MODAL FORM ****************
const AddElectionsForm = ({
  onChangeHandler,
  labels,
  classRow,
  isAddOrEdit,
  show,
}) => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({
    ScreenID: null,
    ScreenNameEnglish: "",
    ScreenNameArabic: "",
    LabelNameEnglish: "",
    LabelNameArabic: "",
    LabelKey: "",
  });
  const [lang, setLang] = useState();

  const electionList = useSelector(({ Elections }) => Elections?.elections);
  const circleList = useSelector(({ Circles }) => Circles?.circles);

  useEffect(() => {
    setFormData(classRow);
  }, [classRow]);

  useEffect(() => {
    if (show) {
      setLang("");
    }
  }, [show]);

  return (
    <Row>
      {labels?.map((items) => {
        console.log("items: ", items);
        switch (items?.fieldName) {
          case "election-drop-down":
            return (
              <Col key={items?.id} sm={6}>
                <div className="mb-3">
                  <label htmlFor="country" className="col-form-label">
                    {items?.labelName}
                  </label>
                  <select
                    className="form-control"
                    id={items.labelName}
                    defaultValue={classRow[items?.value]}
                    name={items?.name}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="">Choose election</option>
                    {electionList?.map((item) => {
                      return (
                        <option
                          key={item?._id}
                          value={JSON.stringify(item)}
                          name={
                            i18n?.language === "en"
                              ? item?.ElectionNameEnglish
                              : item?.ElectionNameArabic
                          }
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
                    {items?.labelName}
                  </label>
                  <select
                    className="form-control"
                    id={items.labelName}
                    defaultValue={classRow[items?.value]}
                    name={items?.name}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="">Choose circle</option>
                    {circleList?.map((item) => {
                      return (
                        <option
                          key={item?._id}
                          value={JSON.stringify(item)}
                          name={
                            i18n?.language === "en"
                              ? item?.ElectionNameEnglish
                              : item?.ElectionNameArabic
                          }
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

          case "text-box":
            return (
              <Col key={items?.id} sm={6}>
                <div className="mb-3">
                  <label htmlFor={items?.labelName} className="col-form-label">
                    {items?.labelName}
                  </label>

                  <div className="lang-change-wrap">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder={items.labelName}
                      defaultValue={formData[items?.value]}
                      name={items?.name}
                      disabled={
                        items?.name === "LabelKey" && isAddOrEdit === "isEdit"
                          ? true
                          : false
                      }
                      onChange={(e) => onChangeHandler(e)}
                      id={items?.labelName}
                      required
                    />
                  </div>
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

export default AddElectionsForm;
