import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import { findLimitAndDelete } from "../../api/library/UsersAPI";
import { useGlobalUserContext } from "../context/UserContext";
import { useGlobalLimitsContext } from "../context/LimitsContext";
import UpdateLimits from "./UpdateLimits";

function LimitsTable(props) {
  const { limit, category, subID } = props;
  const { userData } = useGlobalUserContext();
  const { refreshLimitsData, findLimitAndUpdate } = useGlobalLimitsContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="row limits-table text-center mt-3 py-1 justify-content-center ">
        <div className="col-3 col-lg-2 cell">{category}</div>

        {isEditing === false && (
          <div className="col-4 col-lg-2 cell cell-limit">{limit} </div>
        )}

        {isEditing && (
          <div className="col-4 col-lg-2 cell cell-limit ">
            <UpdateLimits
              subID={subID}
              category={category}
              limit={limit}
              setIsEditing={setIsEditing}
            />
          </div>
        )}

        <div className="col-5 col-lg-2 cell">
          {" "}
          <Tooltip title="Redaguoti">
            <button
              className="btn m-1 custom-button-edit"
              onClick={() => setIsEditing(!isEditing)}
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
        <div className="col-lg-4 col-12 cell p-lg-0 p-4">
          ČIA BUS PROGRESS BAR AT-54
        </div>
      </div>
      <div className="row"></div>
    </>
  );
}

export default LimitsTable;
