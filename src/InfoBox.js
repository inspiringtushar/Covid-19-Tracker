import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total,active,casesType,...props }) {


  let colorStyle = "";
  if(casesType === "cases"){
    colorStyle="infoBox--Cases"
  }
  else if(casesType === "recovered"){
    colorStyle="infoBox--Recovered"
  }
  else if(casesType === "deaths"){
    colorStyle="infoBox--Deaths"
  }


    return (
    <Card onClick={props.onClick} className = {`infoBox ${active && colorStyle }`} >
      <CardContent>
        <Typography className="infoBox_title" color="primary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">
           {cases}
        </h2>

        <Typography className="infoBox_total" color="textSecondary">
        <b>Total: {total} </b>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
