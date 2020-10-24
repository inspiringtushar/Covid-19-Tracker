import React from "react";
import "./Table.css";
import numeral from "numeral";

function TableContinent({ continents }) {
  return (
    <div className="table">
      {continents.map(({continent,cases}) => (
        <tr>
          <td>{continent}</td>
          <td>
            <strong>{numeral(cases).format()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default TableContinent;
