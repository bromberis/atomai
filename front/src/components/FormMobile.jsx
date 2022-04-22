import React from "react";

export default function IncomeMobile() {
  return (
    <div>
      <div>income</div>
      <div>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" id="sum" name="sum" placeholder="Suma" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="date" name="date" defaultValue={new Date().toISOString().substr(0, 10)} />
          </div>
          <div className="form-group">
            <select className="form-control" name="category" id="category">
              <option value="none">Kategorija 🔽</option>
              <option value="wage">Alga</option>
              <option value="prize">Prizas</option>
              <option value="etc">Kita</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="name" id="name" placeholder="Pavadinimas" />
          </div>
          <div>
            <button className="btn btn-success">Prideti</button>
          </div>
        </form>
      </div>
    </div>
  );
}
