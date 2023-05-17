import React from 'react';
import { Input } from "reactstrap";
import { useTranslation } from 'react-i18next'

const DropDownTextBox = ({ initialData, options, filter="", setData }) => {
  const { t, i18n } = useTranslation()


  const onChangeData = (value) => {
    if (value === "") {
      setData(initialData)
    } else {
        if (filter === "") {
            setData(initialData.filter((item) => {
                return Object.values(item).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
              }))
        } else {
            setData(initialData.filter((item) => {
              return Object.values(item[filter]).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
            }))
        }
    }
  }



 



  return (
    <React.Fragment>
      <Input type="select" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Select')}
        id="dropdown-options"
        onChange={(e) => onChangeData(e.target.value)}
        onBlur={(e) => onChangeData(e.target.value)}>
        <option value='' default>Select</option>
        {
            <React.Fragment>
            {options.map((item, key) => (
                <option value={item.value} key={key}>{item.label}</option>))}
            </React.Fragment>
        }
        </Input>
    </React.Fragment>
  )
}

export default DropDownTextBox;
