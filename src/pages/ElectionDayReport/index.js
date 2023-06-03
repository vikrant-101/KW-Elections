import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { columns } from "./DataTableColumns";
import { useSelector, useDispatch } from "react-redux";
import {
  getElectionDayReport,
  getElectionDayReportColumnNames,
} from "../../store/actions";
import BasicTable from "./BasicTable";

const ElectionDayReport = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  document.title = t("KW-Elections | Election Day Report");
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const userId = auth?.id;

  const columnNames = useSelector(
    ({ ElectionDayReport }) => ElectionDayReport?.columnNames
  );
  const electionDayReportList = useSelector(
    ({ ElectionDayReport }) => ElectionDayReport?.electionDayReport
  );
  useEffect(() => {
    dispatch(getElectionDayReportColumnNames());
    dispatch(getElectionDayReport({ UserID: userId }));
  }, [dispatch]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(getElectionDayReport({ UserID: userId }));
  //   }, 15000);
  //   return () => clearInterval(interval);
  // }, [dispatch]);

  // const evenIndexData = useMemo(
  //   () => getEvenIndexedElements(electionDayReportList),
  //   [electionDayReportList]
  // );
  // const oddIndexData = useMemo(
  //   () => getOddIndexedElements(electionDayReportList),
  //   [electionDayReportList]
  // );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <BreadCrumb title={t("Election Day Report")} />
            </Col>
          </Row>
          <Row>
           <Col>
            <BasicTable data={electionDayReportList} columns={columns(columnNames, i18n, t)}  />
           </Col>
            {/* <Col sm={6}>
              <BasicTable
                data={evenIndexData}
                columns={columns(columnNames, i18n, t)}
              />
            </Col>
            <Col sm={6}>
              <BasicTable
                data={oddIndexData}
                columns={columns(columnNames, i18n, t)}
              />
            </Col> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ElectionDayReport;

// const getOddIndexedElements = (array) => {
//   const result = [];
//   for (let i = 1; i < array.length; i += 2) {
//     result.push(array[i]);
//   }
//   return result;
// };

// const getEvenIndexedElements = (array) => {
//   return array.filter(function (_, index) {
//     return index % 2 === 0;
//   });
// };
