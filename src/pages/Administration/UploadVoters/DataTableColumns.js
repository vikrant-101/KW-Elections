import { filteredColumns } from "../../../helpers/Filter/FilterColumns";

export const columns = (
  columnNames,
  i18n,
  t,
  inputRef,
  handleFileInput,
  updaloadVotersHandlers
) => {
  return filteredColumns(columnNames, i18n)?.map((column) => {
    let col;
    switch (column?.FieldName) {
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
            const alreadyRefered = cell?.ReferBy?.length > 0;
            return (
              <>
                <input
                  style={{ display: "none" }}
                  multiple
                  ref={inputRef}
                  type="file"
                  onChange={handleFileInput}
                />
                <button
                  className="btn btn-primary rounded-pill"
                  data-test="election"
                  onClick={() => updaloadVotersHandlers(cell)}
                >
                  {/* {i18n.language === "ar" ? "تحميل الناخبين" : "Upload voters"} */}
                  {cell.CSVUploaded ? t("Update Voters") : t("Upload voters")}
                </button>
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
