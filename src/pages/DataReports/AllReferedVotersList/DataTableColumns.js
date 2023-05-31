import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { filteredColumns } from "../../../helpers/Filter/FilterColumns";



export const columns = (columnNames, i18n, t, onActiveOrDeactiveChange, onViewSessionsHistory) => {
  const user = JSON.parse(sessionStorage.getItem('auth'));

  return filteredColumns(columnNames, i18n)?.map((column) => {
    let col;
    switch (column?.FieldName) {
      case 'Active':
        return col = {
          name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              //   onChange={(e) => onActiveOrDeactiveChange(cell, e)}
                  disabled={true}
                checked={cell?.VotersStatus} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
            </div>

          },
        }

      case 'Action':
        return col = {
          name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
          sortable: false,
          wrap: true,
          cell: (cell) => {
           if(cell.Action === '') {
            return(null)
           } else {
            return (
              <UncontrolledDropdown className="dropdown d-inline-block">
                <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button">
                  <i className="ri-more-fill align-middle"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem href="#!" onClick={() => onViewSessionsHistory(cell, 'ViewSessions')}><i className="ri-eye-fill align-bottom me-2 text-muted"></i>{t('Sessions History')}</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            );
           }
          },
        }

      case 'ReferBy':
        return col = {
            name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
            selector: row => {
                let ReferByList = row[column?.Title].reduce((ReferBy, value, index) => {
                  if (value.ReferName  !== null && value.LinkID === user.LinkID) {
                    if (index === 0) {
                      return ReferBy + value.ReferName;
                    }
                    return ReferBy + " " + value.ReferName;
                  } 
                  return ReferBy;
                }, "")
                // return  row[column?.Title][0].ReferID
                return ReferByList;
            },
            sortable: true,
            wrap: true
        }

      case 'Boolean':
        return col = {
          name: <span className='font-weight-bold fs-13'>{i18n.language === 'ar' ? column?.ValueAr : column?.ValueEn}</span>,
          selector: row => {
              let status = row[column?.Title] ? t("Yes") : t("No");
            return  t(status)
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