import React, { useState } from "react";
import UsersUpdateForm from "./UsersUpdateForm";
import { BsTrash, BsPencil } from "react-icons/bs";

export default function UsersTable({ name, email, id }) {
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
              <button>
                <BsTrash className="ml-4" color="#bc6e7f" fontSize="1.5em" />
              </button>
            </div>
          </div>
        </div>
      </>

      {isEditing == true && <UsersUpdateForm name={name} email={email} id={id} />}
    </>
  );
}
