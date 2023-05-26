import { filteredColumns } from "../../../helpers/Filter/FilterColumns";

export const columns = (columnNames, i18n, t, addReferVoterHandler) => {
  const checkStyle = {
    fontSize: "18px",
    color: "green",
  };

  const crossStyle = {
    fontSize: "18px",
    color: "red",
  };

  let user =  JSON.parse(sessionStorage.getItem('auth'));

  return filteredColumns(columnNames, i18n)?.map((column) => {
    let col;
    switch (column?.FieldName) {   //VotersStatus
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

      case "VotersStatus":
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
                {cell.VotersStatus ? (
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
            let alreadyRefered = false;
            cell?.ReferBy?.forEach((voter) => {
              if (voter?.ReferID === user.id) {
                alreadyRefered = true;
              }
            })
            return (
              <>
                {!alreadyRefered ? (
                  <span className="badge badge-soft-success"
                    onClick={() => addReferVoterHandler(cell, "add")}
                  >
                    <i
                      style={{ fontSize: "18px", cursor: "pointer" }}
                      className="ri-add-circle-line"
                      title="Refer this voter"
                    ></i>
                  </span>

                ) : (
                  <span className="badge badge-soft-primary"
                    onClick={() => addReferVoterHandler(cell, "edit")}
                  >
                    <i
                      style={{ fontSize: "18px", cursor: "pointer" }}
                      className="ri-eye-line"
                    ></i>
                  </span>

                )}
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
