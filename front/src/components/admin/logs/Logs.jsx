import React, { useEffect, useState } from "react";
import { getAllLogs } from "../../../api/library/logsApi";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from "uuid";
import { useGlobalCategoriesContext } from "../../context/CategoriesContext";

export default function Logs() {
  const { expensesCategories } = useGlobalCategoriesContext();
  const [logs, setLogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(false);

  useEffect(() => {
    getAllLogs().then((res) => {
      setLogs(res.data.data);
      console.log(res.data.data);
    });
  }, []);
  console.log(logs);
  let allLogs = logs.map((log) => {
    return <LogsList action={log.action} key={uuidv4()} />;
  });

  let filteredLogs = logs.filter((log) => log.category == categoryFilter);
  let allLogsFiltered = filteredLogs.map((log) => {
    return <LogsList action={log.action} key={uuidv4()} />;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h3>ieskoti zurnalo ivykiu pagal kategorija</h3>
          <form
            onChange={(e) => {
              e.target.options[e.target.selectedIndex].index == 0 ? setCategoryFilter(false) : setCategoryFilter(e.target.options[e.target.selectedIndex].value);
            }}
          >
            <select name="category" id="category">
              <option value="false">--Pasirinkite kategorija--</option>
              <option value="expense">islaida</option>
              <option value="income">income</option>
              <option value="registration">Registracija</option>
              <option value="login">Prisijungimas</option>
            </select>
          </form>
          <button onClick={() => setCategoryFilter(false)}>Rodyti visus logus</button>
        </div>
      </div>
      {categoryFilter == false && allLogs}
      {categoryFilter != undefined && allLogsFiltered}
    </div>
  );
}
