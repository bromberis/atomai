import React, { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import UpdateCategory from "./UpdateCategory";
import Tooltip from "@mui/material/Tooltip";
import { deleteExpCategory } from "../../api/library/CategoriesAPI";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";

function CategoryTable(props) {
  const { refreshCategoriesData } = useGlobalCategoriesContext();
  const [isEditing, setIsEditing] = useState(false);
  const { category, id } = props;

  return (
    <tr>
      {isEditing === false && (
        <td className="custom-table-td-admin">{category}</td>
      )}
      {isEditing === true && (
        <td className="custom-table-td-admin">
          <UpdateCategory
            setIsEditing={setIsEditing}
            id={id}
            category={category}
          />
        </td>
      )}
      <td className="custom-table-td-admin">
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
                  deleteExpCategory(id).then(() => {
                    refreshCategoriesData(id);
                  });
                }
              })
            }
          >
            <BsTrash color="#bc6e7f" fontSize="1.5em" />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
}

export default CategoryTable;
