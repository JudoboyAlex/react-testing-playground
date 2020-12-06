import React from "react";
import "./WorkOrdersDisplay.css";

const WorkOrdersDisplay = ({
  name,
  deadline,
  description,
  id,
  workerName,
  photo,
  companyName,
  email,
}) => {
  return (
    <ul className="workOrderDetails">
      <div className="workOrderHeader">
        <li>{name}</li>
        <li>{description}</li>
      </div>
      <div className="imageContainer">
        <div>
          <li>
            <img src={photo} alt="worker face"></img>
          </li>
        </div>
        <div className="workerDetails">
          <li>{workerName}</li>
          <li>{companyName}</li>
          <li>{email}</li>
        </div>
      </div>
      <div className="workOrderFooter">
        <li>Id: {id}</li>
        <li>{deadline}</li>
      </div>
    </ul>
  );
};

export default WorkOrdersDisplay;
