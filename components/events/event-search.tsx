import React, { useRef } from "react";
import Button from "../ui/button";
import classes from "./event-search.module.css";

function EventsSearch(props: any) {
  //   const yearInputRef = useRef(null);
  const yearInputRef = useRef<any>();
  const monthInputRef = useRef<any>(null);
  function sumbitHandler(event: any) {
    // Preventing page reload
    event.preventDefault();
    const selectedYear = yearInputRef?.current?.value;
    const selectdMonth = monthInputRef?.current?.value;

    props.onSearch(selectedYear, selectdMonth);
  }

  return (
    <form className={classes.form} onSubmit={sumbitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select name="" id="month" ref={monthInputRef}>
            <option value="1">Januar</option>
            <option value="2">Februar</option>
            <option value="3">März</option>
            <option value="4">April</option>
            <option value="5">Mai</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Dezember</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;
