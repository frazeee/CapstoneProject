import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import flatpickr from "flatpickr";
import AdoptionCountChart from "./AdoptionCountChart";
import IndividualRequestChart from "./IndividualRequestChart";
import AdoptionStatusCountChart from "./StatusCountChart";
import PetTypeCountChart from "./PetTypeCountChart";
import DateRangePicker from "../../utils/DateRangePicker";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportsGeneration = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const reportFlatpickrRef = useRef(null);
  const [requestListData, setRequestListData] = useState(data);

  useEffect(() => {
    if (!reportFlatpickrRef.current) {
      console.error("flatpickrRef is null or undefined");
      return;
    }

    const flatpickrInstance = flatpickr(reportFlatpickrRef.current, {
      mode: "range",
      enableTime: false,
      dateFormat: "m/d/Y", // Adjust the format as needed
      onClose: (selectedDates) => {
        if (selectedDates.length > 0) {
          const formattedStartDate = selectedDates[0].toISOString();
          const formattedEndDate =
            selectedDates.length > 1 ? selectedDates[1].toISOString() : null;
          setSelectedDate([formattedStartDate, formattedEndDate]);
        }
      },
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      font: {
        size: 24, // Adjust the font size as needed
      },
    },
    legend: {
      labels: {
        font: {
          size: 20, // Adjust the font size as needed
        },
      },
    },
  };
  const backgroundColors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
    "rgba(0, 128, 0, 0.7)",
    "rgba(128, 0, 128, 0.7)",
    "rgba(255, 0, 0, 0.7)",
    "rgba(0, 255, 0, 0.7)",
    "rgba(0, 0, 255, 0.7)",
    "rgba(128, 128, 0, 0.7)",
    "rgba(255, 128, 0, 0.7)",
    "rgba(128, 0, 255, 0.7)",
    "rgba(0, 128, 255, 0.7)",
    "rgba(255, 128, 128, 0.7)",
    "rgba(128, 255, 0, 0.7)",
    "rgba(0, 128, 128, 0.7)",
  ];

  const [selectedDates, setSelectedDates] = useState([]);
  const [activeReport, setActiveReport] = useState("petTypeCount");
  const [headerText, setHeaderText] = useState(
    `Number of Pets by Type Across All Requests`
  );

  const handleSelectRange = (range) => {
    setSelectedDates(range);
  };

  const handleReportChange = (e) => {
    const selectedReport = e.target.value;
    setActiveReport(selectedReport);

    if (selectedReport === "petTypeCount") {
      setHeaderText("Pet Type Count");
    } else if (selectedReport === "petMostRequest") {
      setHeaderText("Pet with Most Requests");
    } else if (selectedReport === "adoptionCount") {
      setHeaderText("Adoption Request Count");
    } else if (selectedReport === "statusCount") {
      setHeaderText("Adoption Status Count");
    } else {
      setHeaderText("Pet Type Count");
    }
  };

  return (
    <div>
      <h1 className="text-center">REPORTS AND STATISTICS</h1>
      <hr />
      <div className="d-flex">
        <div className="form-floating mt-5 w-25">
          <select
            class="form-select w-100"
            id="report-type"
            aria-label="Select Chart Options"
            onChange={handleReportChange}
          >
            <option value="petTypeCount">Pet Type Request Count</option>
            <option value="petMostRequest">Pets with Most Requests</option>
            <option value="adoptionCount">Adoption Requests</option>
            <option value="statusCount">Status Count</option>
          </select>
          <label for="report-type">Report Type: </label>
        </div>
        <div
          className="form-floating mt-5 w-25 ms-2
        "
        >
          <DateRangePicker onSelect={handleSelectRange} />
        </div>
      </div>

      {activeReport === "petTypeCount" && (
        <>
          <PetTypeCountChart
            data={requestListData}
            headerText={headerText}
            backgroundColors={backgroundColors}
            chartOptions={chartOptions}
            dateRange={selectedDates}
          />
        </>
      )}
      {activeReport === "petMostRequest" && (
        <>
          <IndividualRequestChart
            data={requestListData}
            headerText={headerText}
            backgroundColors={backgroundColors}
            chartOptions={chartOptions}
            dateRange={selectedDates}
          />
        </>
      )}
      {activeReport === "adoptionCount" && (
        <>
          <AdoptionCountChart
            data={requestListData}
            headerText={headerText}
            backgroundColors={backgroundColors}
            chartOptions={chartOptions}
            dateRange={selectedDates}
          />
        </>
      )}
      {activeReport === "statusCount" && (
        <>
          <AdoptionStatusCountChart
            data={requestListData}
            headerText={headerText}
            backgroundColors={backgroundColors}
            chartOptions={chartOptions}
            dateRange={selectedDates}
          />
        </>
      )}
    </div>
  );
};

export default ReportsGeneration;
