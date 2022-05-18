import React, { useState } from "react";
import UsersUpdate from "./UsersUpdate";
import { BsTrash, BsPencil } from "react-icons/bs";

export default function UsersTable({ name, email, id }) {
  console.log(id);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing == false && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-3"> {name}</div>
              <div className="col-3">{email}</div>
              <div className="col-3">
                {" "}
                <button onClick={() => setIsEditing(!isEditing)}>Redaguoti</button>
              </div>
              <div className="col-3">
                {" "}
                <button>Istrinti</button>
              </div>
            </div>
          </div>
        </>
      )}

      {isEditing == true && (
        <>
          <div className="container ">
            <div className="row">
              <div className="col-10">
                <UsersUpdate name={name} email={email} id={id} />
              </div>
              <div className="col-2 d-flex ">
                {" "}
                <button className="mb-2 mt-2" onClick={() => setIsEditing(!isEditing)}>
                  <BsPencil color="#3a3845" fontSize="1.5em" />
                </button>
                <button className="mb-2 mt-2">
                  <BsTrash color="#bc6e7f" fontSize="1.5em" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {isEditing == true && <UsersUpdate name={name} email={email} />}
      <button onClick={() => setIsEditing(!isEditing)}>Redaguoti</button>
      <button>Istrinti</button> */}
    </>
  );
}
