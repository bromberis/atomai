import React from "react";

export default function UsersTable({ name, email }) {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{email}</td>
      </tr>
    </>
  );
}
