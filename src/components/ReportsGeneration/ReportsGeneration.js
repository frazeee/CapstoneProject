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
import "chartjs-plugin-datalabels";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
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

const ReportsGeneration = ({ data, shelterName }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const reportFlatpickrRef = useRef(null);
  const [requestListData, setRequestListData] = useState(data);
  const [processedData, setProcessedData] = useState("");

  const printRef = useRef(null);

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
      datalabels: {
        display: true,
      },
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
  const [tableHead, setTableHead] = useState([["Pet Type", "Count"]]);

  const handleSelectRange = (range) => {
    setSelectedDates(range);
  };

  const handleReportChange = (e) => {
    const selectedReport = e.target.value;
    setActiveReport(selectedReport);

    if (selectedReport === "petTypeCount") {
      setHeaderText("Pet Type Count");
      setTableHead([["Pet Type", "Count"]]);
    } else if (selectedReport === "petMostRequest") {
      setHeaderText("Pet with Most Requests");
      setTableHead([["Pet Name", "Request Count"]]);
    } else if (selectedReport === "adoptionCount") {
      setHeaderText("Adoption Request Count");
      setTableHead([["Month", "Request Count"]]);
    } else if (selectedReport === "statusCount") {
      setHeaderText("Adoption Status Count");
      setTableHead([["Adoption Status", "Requests Count"]]);
    } else {
      setHeaderText("Pet Type Count");
      setTableHead([["Pet Type", "Count"]]);
    }
  };
  


  const generateHeader = (pdf) => {
    pdf.setFontSize(18);
    pdf.setFont("Arial", "bold");
    pdf.text(`${shelterName}`, 110, 15);
    pdf.setFontSize(14);
    pdf.setFont("Arial", "normal");
    pdf.text(`${headerText}`, 200, 22, { align: "right" });
    if (selectedDates.length >= 2) {
      const date1 = new Date(selectedDates[0]).toLocaleDateString("en-US");
      const date2 = new Date(selectedDates[1]).toLocaleDateString("en-US");
      pdf.text(`${date1} - ${date2}`, 200, 30, { align: "right" });
    } else {
      pdf.text(`No Date Selected`, 200, 30, { align: "right" });
    }

    pdf.setLineWidth(0.5);
    pdf.line(5, 35, pdf.internal.pageSize.width - 5, 35);
  };

  const handleExportClick = async () => {
    const chartContainer = printRef.current;

    if (!chartContainer) {
      console.error("Chart container element not found");
      return;
    }

    const pdf = new jsPDF();
    generateHeader(pdf); // Call the header generation function

    const imgData = await html2canvas(chartContainer, { scale: 1 }); // Capture chart as PNG image data

    const desiredWidth = 250;
    const desiredHeight = 150;

    // Center the image
    const imgX = pdf.internal.pageSize.width / 2 - desiredWidth / 2;
    const imgY = 45;
    pdf.addImage(imgData, "PNG", imgX, imgY, desiredWidth, desiredHeight);

    // Updated table position based on image
    const tableStartY = imgY + desiredHeight + 10;

    pdf.autoTable({
      startY: tableStartY,
      head: tableHead,
      body: Object.entries(processedData).map(([key, count]) => [key, count]),
      styles: { fontSize: 10 },
      theme: "grid",
    });

    pdf.save(`${activeReport}.pdf`); // Save PDF with report name
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
      <div ref={printRef}>
        {activeReport === "petTypeCount" && (
          <>
            <PetTypeCountChart
              data={requestListData}
              headerText={headerText}
              backgroundColors={backgroundColors}
              chartOptions={chartOptions}
              dateRange={selectedDates}
              setProcessedData={setProcessedData}
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
              setProcessedData={setProcessedData}
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
              setProcessedData={setProcessedData}
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
              setProcessedData={setProcessedData}
            />
          </>
        )}
      </div>
      <div class="container  d-flex justify-content-end">
        <button className="btn" type="button" onClick={handleExportClick}>
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ReportsGeneration;
