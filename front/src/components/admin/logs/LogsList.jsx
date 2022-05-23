import React, { useState } from "react";
import "./logs.css";

export default function LogsList({ log }) {
  const [extraInfo, setExtraInfo] = useState(false);
  return (
    <div>
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
                <p></p>
                <p>Vartotojo ID: {log.userID}</p>
                <p>Vartotojo vardas: {log.name}</p>
                <p>Vartotojo el.pastas: {log.email}</p>
                <p>
                  Kategorija: {log.category == "income" && "pajama"}
                  {log.category == "expense" && "islaida"}
                </p>

                <p>Data: {log.time}</p>
                <p>{log.sum && `Suma: ${log.sum}`}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
