import React from "react";

import { AppBar, Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5">Travel Advisor</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
