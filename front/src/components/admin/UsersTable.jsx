import React, { useState } from "react";
import UsersUpdateForm from "./UsersUpdateForm";
import { BsTrash, BsPencil } from "react-icons/bs";
import { deleteUserById } from "../../api/library/UsersAPI";
import swal from "sweetalert";

export default function UsersTable({ name, email, id, reset, setUsers, searchUsers }) {
  function deleteUser() {
    swal({
      title: "Ar tikrai norite ištrinti šį vartotoją?",
      icon: "warning",
      buttons: ["Atšaukti", "Gerai"],
    }).then((isConfirm) => {
      if (isConfirm) {
        deleteUserById(id);
        reset();
        setUsers({});
      }
    });
  }
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <>
        <div className="container mt-4">
          <div className="row">
            <div className="col-4"> {name}</div>
            <div className="col-4">{email}</div>
            <div className="col-4">
              {" "}
              <button className="pr-4" onClick={() => setIsEditing(!isEditing)}>
                <BsPencil color="#3a3845" fontSize="1.5em" />
              </button>
              <button onClick={() => deleteUser()}>
                <BsTrash className="ml-4" color="#bc6e7f" fontSize="1.5em" />
              </button>
            </div>
          </div>
        </div>
      </>

      {isEditing == true && <UsersUpdateForm name={name} email={email} setIsEditing={setIsEditing} searchUsers={searchUsers} id={id} />}
    </>
  );
}
