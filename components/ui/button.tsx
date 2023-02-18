import React from "react";
import Link from "next/link";
import classes from "./button.module.css";

function Button(props: any) {
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
}

export default Button;
