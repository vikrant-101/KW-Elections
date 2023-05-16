import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
  } from "reactstrap";
  import { filteredColumns } from "../../../helpers/Filter/FilterColumns";
  
  
  
  export const columns = (columnNames, i18n, t, onActiveOrDeactiveChange, onViewSessionsHistory) => {
    return filteredColumns(columnNames, i18n)?.map((column) => {
      let col;
      switch (column?.FieldName) {

        case 'Boolean':
          return col = {
            name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
            selector: row => {
                let status = row[column?.Title] ? "Yes" : "No";
              return  t(status)
            },
            sortable: true,
            wrap: true
          }
        
        case 'NormalSubString':
          return col = {
            name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
            selector: row => {
              return row[column?.Title].slice(0, 10)
            },
            sortable: true,
            wrap: true
          }
  
        default:
          return col = {
            name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
            selector: row => {
              return ['PaymentDate'].includes(column?.Title) && row[column?.Title] !== '' ? new Date(row[column?.Title]).toDateString() : column?.Title === 'AccountApproval' && row[column?.Title] !== '' ? <Button className="btn btn-success btn-sm" title="Click to approve account"><i className="ri-account-circle-fill align-bottom me-2"></i>{t(' Approval')}</Button>
                : column?.Title === 'TotalPayments' || column?.Title === 'PricePerHour' ? row[column?.Title] + ' KD' : row[column?.Title]
            },
            sortable: true,
            wrap: true
          }
      }
    })
  }