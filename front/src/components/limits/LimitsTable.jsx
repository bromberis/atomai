import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";

function LimitsTable(props) {
  const { limit, category } = props;

  return (
    <div className="row limits-table text-center mt-3py-1 justify-content-center ">
      <div className="col-3 col-lg-2 cell">{category}</div>
      <div className="col-3 col-lg-2 cell">{limit}</div>
      <div className="col-2 cell">
        {" "}
        <Tooltip title="Redaguoti">
          <button
            className="btn m-1 custom-button-edit"
            // onClick={() => setEditFormStatus(!editFormStatus)}
          >
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
                  //   if (type === "income") {
                  //     // findIncomeAndDelete(userID, id).then(() =>
                  //     //   updateUserData(userID)
                  //     // );
                  //   } else if (type === "expenses") {
                  //     // findExpensesAndDelete(userID, id).then(() =>
                  //     //   updateUserData(userID)
                  //     // );
                  //   }
                }
              })
            }
          >
            <BsTrash color="#bc6e7f" fontSize="1.5em" />
          </button>
        </Tooltip>
      </div>
      <div className="col-4 cell"></div>
    </div>
  );
}

export default LimitsTable;
