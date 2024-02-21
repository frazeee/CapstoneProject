import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const AdoptionStatusCountChart = ({ data, headerText, backgroundColors,  chartOptions, dateRange }) => {
  const [adoptionStatusCount, setAdoptionStatusCount] = useState({});

  useEffect(() => {
    // Possible adoption statuses
    const possibleStatuses = [
      "For Verification",
      "For Interview",
      "Interview Done",
      "Approved",
      "Rejected",
    ]; // Add all possible statuses
  
    // Initialize counts for all possible statuses
    const initialCounts = possibleStatuses.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});
  
    // Count occurrences of adoption statuses within the specified date range
    const countOccurrencesByStatus = data.reduce(
      (accumulator, currentPet) => {
        const status = currentPet.adoption_status || "Other"; // Use 'Other' for records without a status
        const petDate = new Date(currentPet.created_at).toISOString(); // Assuming created_at is the property containing the pet's date
        const isWithinDateRange = !dateRange[0] || !dateRange[1] || (petDate >= dateRange[0] && petDate <= dateRange[1]);
  
        if (isWithinDateRange) {
          // Increment the count for the corresponding status
          accumulator[status] += 1;
        }
        return accumulator;
      },
      { ...initialCounts }
    );
  
    setAdoptionStatusCount(countOccurrencesByStatus);
  }, [data, dateRange]);
  

  const adoptionStatusCountData = {
    labels: Object.keys(adoptionStatusCount),
    datasets: [
      {
        label: "Status Count",
        data: Object.values(adoptionStatusCount),
        borderColor: "rgba(0, 0, 0, 0.2)",
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
  <h3 className="text-center mt-3">{headerText}</h3>
  <div className="d-flex justify-content-center my-3">
    <div className="card">
      {adoptionStatusCountData.datasets &&
        adoptionStatusCountData.datasets.length > 0 &&
        adoptionStatusCountData.datasets[0].data &&
        adoptionStatusCountData.datasets[0].data.length > 0 &&
        adoptionStatusCountData.datasets[0].data.every(value => value === 0) ? (
          <h1 className="m-5">No records to display.</h1>
      ) : (
        <Bar
          data={adoptionStatusCountData}
          width={700}
          height={700}
          options={chartOptions}
        />
      )}
    </div>
  </div>
</>

  );
};

export default AdoptionStatusCountChart;
