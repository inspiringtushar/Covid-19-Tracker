import React from "react";
import "./Table.css";
import numeral from "numeral";

function TableCases({ countries }) {
  return (
    <div className="table">
      {countries.map(({country,active}) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(active).format()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default TableCases;
