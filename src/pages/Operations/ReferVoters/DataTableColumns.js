import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { filteredColumns } from "../../../helpers/Filter/FilterColumns";
import TickButton from "../../../Components/Common/TickButton";
import CrossButton from "../../../Components/Common/CrossButton";

export const columns = (
  columnNames,
  i18n,
  t,
  onEditClickHandler,
  addReferVoterHandler,
  onActiveOrDeactiveChange
) => {
  return filteredColumns(columnNames, i18n)?.map((column) => {
    let col;
    switch (column?.FieldName) {
      case "Active":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return (
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={(e) => onActiveOrDeactiveChange(cell, e)}
                  checked={cell?.IsActive}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            );
          },
        });

      case "VoterStatus":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            return <>{cell.VoterStatus ? <TickButton /> : <CrossButton />}</>;
          },
        });

      case "Action":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          cell: (cell) => {
            return (
              <Button onClick={() => addReferVoterHandler(cell)}>Add</Button>
            );
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
