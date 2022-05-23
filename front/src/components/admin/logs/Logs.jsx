import React, { useEffect, useState } from "react";
import { getAllLogs } from "../../../api/library/logsApi";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from "uuid";
import { useGlobalCategoriesContext } from "../../context/CategoriesContext";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(false);

  useEffect(() => {
    getAllLogs().then((res) => {
      setLogs(res.data.data);
      console.log(res.data.data);
    });
  }, []);
  console.log(categoryFilter != undefined);
  console.log(logs);
  let allLogs = logs.map((log) => {
    return <LogsList log={log} key={uuidv4()} />;
  });
  console.log(logs.length);
  let filteredLogs = logs.filter((log) => log.category == categoryFilter);
  let allLogsFiltered = filteredLogs.map((log) => {
    return <LogsList log={log} key={uuidv4()} />;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 ">
          <h2 className="search-title">Ieškoti įvykių pagal kategoriją</h2>
          <form
            onChange={(e) => {
              e.target.options[e.target.selectedIndex].index == 0 ? setCategoryFilter(false) : setCategoryFilter(e.target.options[e.target.selectedIndex].value);
            }}
          >
            <select name="category" id="category">
              <option value="false">--Pasirinkite kategorija--</option>
              <option value="expense">Išlaidos</option>
              <option value="income">Pajamos</option>
              <option value="registration">Registracija</option>
              <option value="login">Prisijungimas</option>
            </select>
          </form>
          <button className="button-reset" onClick={() => setCategoryFilter(false)}>
            Rodyti visus logus
          </button>
        </div>
        <div className="col-5 offset-md-1">
          <h2 className="search-title">Ieškoti pagal el.paštą</h2>
          <div>
            <input type="text" placeholder="el.paštas" />
          </div>
        </div>
        <div>
          <h2>Rasta įrašų: {categoryFilter != false ? allLogsFiltered.length : logs.length}</h2>
        </div>
      </div>
      {categoryFilter == false && allLogs}
      {categoryFilter != undefined && allLogsFiltered}
    </div>
  );
}
