import React, { Fragment } from "react";
import MainHeader from "./main-header";

function Layout(props: any) {
  return (
    <Fragment>
      <MainHeader></MainHeader>
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
