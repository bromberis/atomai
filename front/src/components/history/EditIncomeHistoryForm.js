import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { findIncomeDataAndUpdate } from "../../api/library/UsersAPI";
import { useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import "./History.css";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { createNewLog } from "../../api/library/logsApi";

function EditIncomeHistoryForm({ username, email, name, category, date, sum, id, userID, editFormStatus, setEditFormStatus, getUsers }) {
  const [userUpdateIncome, setUserUpdateIncome] = useState({
    sum: sum,
    name: name,
    date: date,
    category: category,
  });
  const { userData, updateUserData } = useGlobalUserContext(UserContext);

  function updateIncomeObject(e) {
    e.preventDefault();
    userUpdateIncome[e.target.name] = e.target.value;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    console.log(userUpdateIncome);
    findIncomeDataAndUpdate(userUpdateIncome, userData._id, id).then(() => {
      updateUserData(userData._id);
      createNewLog({
        category: "income",
        type: "edit",
        incexpCategory: category,
        userID: id,
        action: `Vartotojas ${username} koregavo pajamų įrašą. Data: ${new Date()}`,
        time: new Date(),
        sum: sum,
        name: username,
        email: email,
      });
    });
    setEditFormStatus(!editFormStatus);
  }
  return (
    <>
      <td className="custom-td"></td>

      <td className="custom-td" colSpan="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <input className="custom-input" type="date" name="date" id="date-inp" min="2010-01-01" max="2099-01-01" defaultValue={date.slice(0, 10)} onChange={(e) => updateIncomeObject(e)} />
          </div>
          <div className="mb-1">
            <input
              className="custom-input"
              placeholder="Suma"
              type="number"
              name="sum"
              id="sum"
              step="0.01"
              defaultValue={sum}
              {...register("sum", {
                required: true,
                pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,

                maxLength: 10,
              })}
              onChange={(e) => updateIncomeObject(e)}
            />
            {errors.sum && <span className="text-danger fw-light">Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas skaičius.</span>}
          </div>
          <div className="mb-1">
            <select className="custom-input" name="category" id="category" defaultValue={category} {...register("category", { required: true })} onChange={(e) => updateIncomeObject(e)}>
              <option value="Alga">Alga</option>
              <option value="Premija">Premija</option>
              <option value="Dovana">Dovana</option>
              <option value="Loterija">Loterija</option>
              <option value="Išmoka">Išmoka</option>
              <option value="Kita">Kita</option>
            </select>
          </div>
          <div className="mb-1">
            <input
              className=" custom-input"
              placeholder="Pastabos"
              type="text"
              name="name"
              id="name"
              defaultValue={name}
              {...register("name", {
                maxLength: 30,
              })}
              onChange={(e) => updateIncomeObject(e)}
            />
            {errors.name && <span className="text-danger fw-light">Daugiausiai 30 simbolių.</span>}
          </div>
          <div className="text-end me-4">
            <Tooltip title="Patvirtinti">
              <button type="submit" className="btn m-1 custom-button-edit">
                <FaCheck color="#7fbc6e" fontSize="1.5em" />
              </button>
            </Tooltip>
            <Tooltip title="Atšaukti">
              <button type="button" className="btn  m-1 custom-button-tr" onClick={() => setEditFormStatus(!editFormStatus)}>
                <ImCross color="#bc6e7f" fontSize="1.4em" />
              </button>
            </Tooltip>
          </div>
        </form>
      </td>
    </>
  );
}

export default EditIncomeHistoryForm;
