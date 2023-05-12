import React from 'react';
import { Input } from "reactstrap";
import { useTranslation } from 'react-i18next'

const SearchTextBox = ({ initialData, setData }) => {
  const { t, i18n } = useTranslation()
  const onChangeData = (value) => {
    if (value === "") {
      setData(initialData)
    } else {
      setData(initialData.filter((item) => {
        return Object.values(item).map((entry) => entry?.toString().toLowerCase()).find((v) => v?.substring(0, value?.length) === (value?.toString().toLowerCase()));
      }))
    }
  }



 



  return (
    <React.Fragment>
      <Input type="text" className={i18n.language === 'ar' ? 'form-control float-start mw-400' : 'form-control float-end mw-400'} placeholder={t('Search') + '...'}
        id="search-options"
        onChange={(e) => onChangeData(e.target.value)} />
    </React.Fragment>
  )
}

export default SearchTextBox;
