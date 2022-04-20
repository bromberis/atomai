import React, { useEffect, useState } from "react";
import Testas from "./Testas";

export default function Testas2() {
  const [user, setUser] = useState({});
  const user2 = {
    _id: "625aa4c1355fc77ad2a6981a",
    name: "Atomas Jonas",
    email: "atomas@gmail.com",
    password: "123",
    balance: 0,
    limit: [
      {
        _id: "625aa4c1355fc77ad2a6981b",
        category: "transport",
        limit: 200,
      },
    ],
    income: [
      {
        _id: "625aa4c1355fc77ad2a6981c",
        date: "2022-04-10T00:00:00.000Z",
        sum: 1500,
        name: "alga",
      },
      {
        _id: "625aa4c1355fc77ad2a6981d",
        date: "2022-04-05T00:00:00.000Z",
        sum: 2000,
        name: "alga",
      },
      {
        _id: "625e51e9dfc8bf172cfc738d",
        sum: 324324,
        date: "2022-04-19T00:00:00.000Z",
      },
      {
        _id: "625e53bc658c702554fafdcb",
        sum: 99999,
        category: "wage",
        date: "2022-04-19T00:00:00.000Z",
      },
    ],
    expenses: [
      {
        _id: "625aa4c1355fc77ad2a6981e",
        date: "2022-04-14T00:00:00.000Z",
        sum: 100,
        name: "pica",
        date_created: "2022-04-12T00:00:00.000Z",
        category: "pramogos",
      },
      {
        _id: "625aa4c1355fc77ad2a6981f",
        date: "2022-04-03T00:00:00.000Z",
        sum: 50,
        name: "mokesčiai",
        date_created: "2022-04-11T00:00:00.000Z",
        category: "pramogos",
      },
    ],
  };
  useEffect(() => getUser(), []);
  const [loading, setLoading] = useState(true);
  let newData2;
  const getUser = () => {
    fetch(`http://localhost:3005/api/v1/users/625aa4c1355fc77ad2a6981a`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.users);

        setUser(result.data.users);
        console.log(user);
        // mapping();
        setLoading(false);
        result.data.users.income.forEach((data) => console.log(data.sum));
        let newData = result.data.users.income.map((data) => {
          return <Testas date={data.date} id={data._id} />;
        });
        console.log(newData);
        newData2 = newData;
        console.log(newData2);
      })
      .catch((error) => console.log(error));
  };

  function mapping() {
    let test = user.income.map((data) => {
      return <Testas date={data.date} sum={data.sum} />;
    });
    console.log(test);
    return test;
  }

  console.log(newData2);
  return <div>{!loading && newData2}</div>;
}
