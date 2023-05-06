import React from "react";
import { Icon } from "../CustomIcon";

import "./styles.scss";

function CustomerVisitRecordFilterMobile(props) {
  return (
    <div className="CustomerVisitRecordFilterMobile-page">
      <div className="CustomerVisitRecordFilterMobile-back">
        <Icon iconName="arrowBackIcon" />
      </div>
      <div className="CustomerVisitRecordFilterMobile-menu"></div>
      <div className="CustomerVisitRecordFilterMobile-action">
        <div className="CustomerVisitRecordFilterMobile-filter"></div>
        <div className="CustomerVisitRecordFilterMobile-more"></div>
      </div>
    </div>
  );
}

export default CustomerVisitRecordFilterMobile;
