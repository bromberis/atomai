import React, { useEffect, useState } from "react";
import { getAllLogs } from "../../../api/library/logsApi";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

export default function Logs() {
  const [pageNumber, setPageNumber] = useState(0);
  const logsPerPage = 10;
  const pagesVisited = pageNumber * logsPerPage;
  const [logs, setLogs] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState(false);
  const [emailFilter, setEmailFilter] = useState(false);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getAllLogs().then((res) => {
      setLogs(res.data.data);
    });
  }, []);

  const allDisplayLogs = logs
    .filter((log) => {
      if (categoryFilter && emailFilter) {
        return log.category == categoryFilter && log.email.includes(emailFilter);
      } else if (categoryFilter) {
        return log.category == categoryFilter;
      } else if (emailFilter) {
        return log.email.includes(emailFilter);
      } else {
        return log;
      }
    })
    .slice(pagesVisited, pagesVisited + logsPerPage)

    .map((log) => {
      return <LogsList log={log} key={uuidv4()} />;
    });
  //   const displayLogs = allDisplayLogs.slice(pagesVisited, pagesVisited + logsPerPage);
  console.log(logs);
  console.log(allDisplayLogs);
  console.log(pagesVisited);
  const pageCount = Math.ceil(logs.length / logsPerPage);

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 ">
          <h2 className="search-title">Ieškoti pagal kategoriją</h2>
          <form
            onChange={(e) => {
              {
                {
                  e.target.options[e.target.selectedIndex].index == 0 ? setCategoryFilter(false) : setCategoryFilter(e.target.options[e.target.selectedIndex].value);
                }
              }
            }}
          >
            <select name="category" id="category">
              <option value="false">--Pasirinkite kategoriją--</option>
              <option value="expense">Išlaidos</option>
              <option value="income">Pajamos</option>
              <option value="registration">Registracija</option>
              <option value="login">Prisijungimas</option>
            </select>
          </form>
          <button
            className="button-reset"
            onClick={() => {
              setCategoryFilter(false);
              setEmailFilter(false);
              // Reset forms
              document.forms[0].reset();
              document.forms[1].reset();
              // Hides all extraInfo panels that may have been opened
              document.querySelectorAll(`.extraInfoPanel`).forEach((item) => item.classList.add("d-none"));
            }}
          >
            Rodyti visus logus
          </button>
        </div>
        <div className="col-5 offset-md-1">
          <form onChange={(e) => setEmailFilter(e.target.value)}>
            <h2 className="search-title">Ieškoti pagal el.paštą</h2>
            <div>
              <input type="text" placeholder="El.paštas" />
            </div>
          </form>
        </div>
      </div>

      <div>
        {allDisplayLogs}
        <div className="row">
          <div className="navigation-pagination col-12">
            {" "}
            <ReactPaginate
              // onClick={()=>}
              //   initialPage="test"

              previousLabel="Atgal"
              nextLabel={"Pirmyn"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              nextLinkClassName={"previuosButtons"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
