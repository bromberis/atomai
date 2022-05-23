import React, { useState } from "react";
import "./logs.css";

export default function LogsList({ log }) {
  const [extraInfo, setExtraInfo] = useState(false);
  return (
    <div>
      <div></div>
      <p>
        <button className="log-button" onClick={() => setExtraInfo(!extraInfo)}>
          {log.action}
        </button>
      </p>
      <div>
        {extraInfo && (
          <>
            <div className="extraInfoPanel">
              <div className="innerExtraInfoPanel">
                <h5>Papildoma informacija:</h5>

                <p>Vartotojo ID: {log.userID}</p>
                <p>Vartotojo vardas: {log.name}</p>
                <p>Vartotojo el.paštas: {log.email}</p>
                <p>
                  {log.category == "income" || log.category == "expense" ? "Kategorija:" : null} {log.category == "income" && `pajamos/${log.incexpCategory}`}
                  {log.category == "expense" && `išlaidos/${log.incexpCategory}`}
                </p>

                <p>{log.sum && `Suma: ${log.sum}`}</p>
                <p>Data: {log.time}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
