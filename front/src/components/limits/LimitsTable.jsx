import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import { findLimitAndDelete } from "../../api/library/UsersAPI";
import { useGlobalUserContext } from "../context/UserContext";
import { useGlobalLimitsContext } from "../context/LimitsContext";
import { useGlobalExpensesContext } from "../context/ExpensesContext";
import UpdateLimits from "./UpdateLimits";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Limits.css";

function LimitsTable(props) {
  const { limit, category, subID } = props;
  const { userData } = useGlobalUserContext();
  const { refreshLimitsData } = useGlobalLimitsContext();
  const { expensesThisMonthByCategory } = useGlobalExpensesContext();
  const [isEditing, setIsEditing] = useState(false);

  const filteredByCurrentCategory = expensesThisMonthByCategory.filter((expItem) => expItem.category === category);

  const allExpensesCurrentMonthByCategory = filteredByCurrentCategory.reduce((n, { sum }) => n + sum, 0);

  return (
    <>
      <div className="row limits-table text-center mt-3 py-1 justify-content-center ">
        <div className="col-3 col-lg-2 cell">{category}</div>

        {isEditing === false && <div className="col-4 col-lg-4 cell cell-limit">{"Limitas: " + limit} </div>}

        {isEditing && (
          <div className="col-4 col-lg-4 cell cell-limit ">
            <UpdateLimits subID={subID} category={category} limit={limit} setIsEditing={setIsEditing} />
          </div>
        )}

        <div className="col-5 col-lg-4 cell">
          {" "}
          <Tooltip title="Redaguoti">
            <button className="btn m-1 custom-button-edit" onClick={() => setIsEditing(!isEditing)}>
              <BsPencil color="#3a3845" fontSize="1.5em" />
            </button>
          </Tooltip>
          <Tooltip title="Ištrinti">
            <button
              className="btn  m-1 custom-button-tr"
              onClick={() =>
                swal({
                  title: "Ar tikrai norite ištrinti?",
                  icon: "warning",
                  buttons: ["Atšaukti", "Gerai"],
                }).then((isConfirm) => {
                  if (isConfirm) {
                    findLimitAndDelete(userData._id, subID).then(() => {
                      refreshLimitsData(userData._id);
                    });
                  }
                })
              }
            >
              <BsTrash color="#bc6e7f" fontSize="1.5em" />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-10">
          {" "}
          <ProgressBar animated striped now={allExpensesCurrentMonthByCategory} min={0} max={limit} label={`${allExpensesCurrentMonthByCategory}`} className="custom-progress-bar" />{" "}
        </div>
      </div>
    </>
  );
}

export default LimitsTable;
