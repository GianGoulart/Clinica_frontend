import React from "react";
import { withStyles, CircularProgress } from "@material-ui/core";
import LoadingStyle from "./LoadingStyle";

const Loading = ({ classes }) => {
	return (
		<div className={classes.circularProgressWrapper}>
			<CircularProgress className={classes.circularProgress} />
		</div>
	);
};

export default withStyles(LoadingStyle)(Loading);
