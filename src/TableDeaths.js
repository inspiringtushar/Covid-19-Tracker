import React from "react";
import "./Table.css";
import numeral from "numeral";

function TableDeaths({ countries }) {
  return (
    <div className="table">
      {countries.map(({country,deaths}) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(deaths).format()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default TableDeaths;
