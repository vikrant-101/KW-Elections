import React from 'react';
import { Input } from "reactstrap";
import { useTranslation } from 'react-i18next'

const SearchTextBox = ({ initialData, currentData=[], filter="", setData, id="search-options" }) => {
  const { t, i18n } = useTranslation()
  const onChangeData = (value) => {
    if (value === "" && currentData.length === 0) {
      setData(initialData)
    } else if (value === "" && currentData.length > 0) {
      setData(currentData)
    } else {
      // setData(initialData.filter((item) => {
      //   return Object.values(item).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      // }))
      if (filter !== "" && currentData.length > 0) {
        setData(currentData.filter((item) => {
            return Object.values(item[filter]).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
          }))
      } else  if (filter === "" && currentData.length > 0) {
        setData(currentData.filter((item) => {
            return Object.values(item).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
          }))
      } else  if (filter !== "" && currentData.length === 0) {
        setData(initialData.filter((item) => {
            return Object.values(item).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
          }))
      } else {
          setData(initialData.filter((item) => {
            return Object.values(item).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
          }))
      }
    }
  }



 



  return (
    <React.Fragment>
      <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
        id={id}
        onChange={(e) => onChangeData(e.target.value)} />
    </React.Fragment>
  )
}

export default SearchTextBox;
