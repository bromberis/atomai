import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <div>
      <nav>
        <Link to="/incexp">Incomes/Expenses</Link>
        <div>
          <Link to="/history">Istorija</Link>
        </div>
      </nav>{" "}
    </div>
  );
}
