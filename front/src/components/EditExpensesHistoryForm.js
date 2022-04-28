import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { findExpensesDataAndUpdate } from "../api/library/UsersAPI";
import "./History.css";
import { useForm } from "react-hook-form";

function EditExpensesHistoryForm({
  getUsers,
  name,
  category,
  date,
  sum,
  id,
  userID,
  editFormStatus,
  setEditFormStatus,
}) {
  const [userUpdateExpenses, setUserUpdateExpenses] = useState({
    sum: sum,
    name: name,
    date: date,
    category: category,
  });

  function updateExpensesObject(e) {
    e.preventDefault();
    userUpdateExpenses[e.target.name] = e.target.value;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    findExpensesDataAndUpdate(userUpdateExpenses, userID, id).then(() =>
      getUsers()
    );
    setEditFormStatus(!editFormStatus);
  }

  return (
    <>
      <td className="custom-td"></td>

      <td className="custom-td" colspan="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <input
              className="custom-input"
              type="date"
              name="date"
              id="date-inp"
              min="2010-01-01"
              max="2099-01-01"
              defaultValue={date.slice(0, 10)}
              onChange={(e) => updateExpensesObject(e)}
            />
          </div>
          <div className="mb-1">
            <input
              className="custom-input "
              placeholder="Suma"
              type="number"
              name="sum"
              id="sum"
              step="0.01"
              defaultValue={sum}
              {...register("sum", {
                required: true,
                pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
                // min: 1,
                maxLength: 10,
              })}
              onChange={(e) => updateExpensesObject(e)}
            />
            {errors.sum && (
              <span className="text-danger fw-light">
                Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas
                skaičius.
              </span>
            )}
          </div>
          <div className="mb-1">
            <select
              className="custom-input"
              name="category"
              id="category"
              {...register("category", { required: true })}
              onChange={(e) => updateExpensesObject(e)}
            >
              <option value="Maistas">Maistas</option>
              <option value="Mokesčiai">Mokesčiai</option>
              <option value="Rūbai">Rūbai</option>
              <option value="Transportas">Transportas</option>
              <option value="Pramogos">Pramogos</option>
              <option value="Kita">Kita</option>
            </select>
          </div>
          <div className="mb-1">
            <input
              className="custom-input"
              placeholder="Pastabos"
              type="text"
              name="name"
              id="name"
              defaultValue={name}
              {...register("name", {
                // pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ .+-]*$/i,
                maxLength: 40,
              })}
              onChange={(e) => updateExpensesObject(e)}
            />
            {errors.name && (
              <span className="text-danger fw-light">
                Daugiausiai 40 simbolių.
              </span>
            )}
          </div>
          <div className="text-end me-4">
            <button type="submit" className="btn m-1 custom-button-edit ">
              <FaCheck color="#7fbc6e" fontSize="1.5em" />
            </button>

            <button
              type="button"
              className="btn  m-1 custom-button-tr"
              onClick={() => setEditFormStatus(!editFormStatus)}
            >
              <ImCross color="#bc6e7f" fontSize="1.4em" />
            </button>
          </div>
        </form>
      </td>
    </>
  );
}

export default EditExpensesHistoryForm;

// Add user income
// exports.createUserIncome = async (req, res) => {
//   console.log(req.params.id);
//   console.log(req.params.subId);
//   try {
//     const updated = await Users.findOneAndUpdate(
//       { _id: req.params.id },
//       { $push: { income: req.body } },
//       {
//         new: true,
//       }
//     );
//     console.log(updated);
//     res.status(200).json({
//       status: "success",
//       data: {
//         tour: updated,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
