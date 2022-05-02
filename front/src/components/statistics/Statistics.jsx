import React, { useState, useEffect } from "react";
import { getAllUsersData } from "../../api/library/UsersAPI";

function Statistics() {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    getIncome();
  }, []);

  function getIncome() {
    getAllUsersData().then((res) => {
      setIncome(res.data.data.users[0].income);
    });
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  console.log(income.reduce((n, { sum }) => n + sum, 0));

  return <div>statistics</div>;
}

export default Statistics;
