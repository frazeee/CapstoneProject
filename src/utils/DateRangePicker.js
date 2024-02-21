import React, { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const DateRangePicker = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState([]);

  const flatpickrRef = useRef(null);

  const onCloseHandler = (selectedDates) => {
    if (selectedDates.length > 0) {
      const formattedStartDate = selectedDates[0].toISOString();
      const formattedEndDate =
        selectedDates.length > 1 ? selectedDates[1].toISOString() : null;
      setSelectedDate([formattedStartDate, formattedEndDate]);
      onSelect([formattedStartDate, formattedEndDate]);
    }
  };

  const handleClearSelection = () =>{
    onSelect("")
    flatpickrRef.current.flatpickr.clear();
  }

  return (
    <>
      <div className="d-flex form-floating ms-2 w-100">
        <Flatpickr
          className="form-select"
          ref={flatpickrRef}
          options={{
            mode: "range",
            enableTime: false,
            dateFormat: "m/d/Y",
            onClose: onCloseHandler,
          }}
        />
        <label>Date Range:</label>
        <button className="btn" onClick={handleClearSelection}>Clear</button>
      </div>
      
    </>
  );
};

export default DateRangePicker;
