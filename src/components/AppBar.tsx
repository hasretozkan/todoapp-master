import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Basit AppBar ve Fixed modda
export default class AppBarComponent extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            color="secondary"
            style={{ fontWeight: "bold" }}
            variant="h6"
          >
            To Do Web App
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
