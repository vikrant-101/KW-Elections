import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";


const ElectionDayReport = () => {
  const {i18n, t} = useTranslation();
  document.title = t('KW-Elections | Election Day Report')
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h1>Election Day Report Component</h1>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ElectionDayReport;