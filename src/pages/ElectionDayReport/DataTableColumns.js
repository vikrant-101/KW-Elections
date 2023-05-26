import { Button } from "reactstrap";
import { filteredColumns } from "../../helpers/Filter/FilterColumns";

export const columns = (columnNames, i18n, t) => {
  return filteredColumns(columnNames, i18n)?.map((column) => {
    let col;
    switch (column?.FieldName) {
      case "Refered":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return<>{cell.count}</>
          },
        });
      case "Voted":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return<>{cell.CountVoted}</>
          },
        });
      case "NotVoted":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return<>{cell.CountNotVoted}</>
          },
        });
        case "SMS":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return<><Button>Send SMS</Button></>
          },
        });

      default:
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          selector: (row) => {
            return ["CreatedDate", "ModifiedDate"].includes(column?.Title)
              ? new Date(row[column?.Title]).toDateString()
              : row[column?.Title];
          },
          sortable: true,
          wrap: true,
        });
    }
  });
};
