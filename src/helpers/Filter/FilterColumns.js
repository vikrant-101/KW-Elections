export const filteredColumns = (columnNames, i18n) => {
  if (i18n.language === "en") {
    return columnNames?.filter((name) => !name.Title.includes('Arabic'))
  } else {
    return columnNames?.filter((name) => !name.Title.includes('English'))
  }
}