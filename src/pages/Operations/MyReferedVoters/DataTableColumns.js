import { filteredColumns } from "../../../helpers/Filter/FilterColumns";

export const columns = (
  columnNames,
  i18n,
  t,
  onEditClickHandler,
  onDeleteClickHandler
) => {
  const checkStyle = {
    fontSize: "18px",
    color: "green",
  };

  const crossStyle = {
    fontSize: "18px",
    color: "red",
  };

  return filteredColumns(columnNames, i18n)?.map((column) => {
    let col;
    switch (column?.FieldName) {
      case "DateOfBirth":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          selector: (cell) => {
            const dateOfBirth = new Date(cell?.DateOfBirth);
            const dobMonth = ("0" + (dateOfBirth?.getMonth() + 1)).slice(-2);
            const formatedDOB = `${dateOfBirth?.getFullYear()} - ${dobMonth} - ${dateOfBirth?.getDate()}`;
            return <>{formatedDOB}</>;
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
            return (
              <>
                {cell.VoterStatus ? (
                  <i
                    style={checkStyle}
                    className="ri-check-fill"
                    title="Voted"
                  ></i>
                ) : (
                  <i
                    style={crossStyle}
                    className="ri-close-fill"
                    title="Not Voted"
                  ></i>
                )}
              </>
            );
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
              <>
                <i
                  onClick={() => onEditClickHandler(cell)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  className="ri-edit-box-fill"
                  title="Edit"
                ></i>
                <i
                  onClick={() => onDeleteClickHandler(cell)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  className="ri-delete-bin-fill"
                  title="Undo Refer"
                ></i>
              </>
            );
          },
        });

      case "MobileNumber":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          cell: (cell) => {
            const alreadyRefered = cell?.ReferBy?.length > 0;
            return (
              <>
                {alreadyRefered &&
                  cell?.ReferBy?.map(
                    (el, index) =>
                      el?.MobileNo !== null && <p key={index}>{el?.MobileNo}</p>
                  )}
              </>
            );
          },
        });

      case "Comments":
        return (col = {
          name: (
            <span className="font-weight-bold fs-13">
              {i18n.language === "ar" ? column?.ValueAr : column?.ValueEn}
            </span>
          ),
          sortable: false,
          wrap: true,
          cell: (cell) => {
            const alreadyRefered = cell?.ReferBy?.length > 0;
            return (
              <>
                {alreadyRefered &&
                  cell?.ReferBy?.map(
                    (el, index) =>
                      el?.Comment !== "" && <p key={index}>{el?.Comment}</p>
                  )}
              </>
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
