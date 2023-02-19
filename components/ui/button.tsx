import React from "react";
import Link from "next/link";
import classes from "./button.module.css";

function Button(props: any) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={props.on}>
        {props.children}
      </button>
    );
  }
}

export default Button;
