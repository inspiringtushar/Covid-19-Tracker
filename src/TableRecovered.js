import React from "react";
import "./Table.css";
import numeral from "numeral";

function TableRecovered({ countries }) {
  return (
    <div className="table">
      {countries.map(({country,recovered}) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(recovered).format()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default TableRecovered;
