import React, { useState, useEffect } from "react";
import { Pie, Chart } from "react-chartjs-2";

const PetTypeCountChart = ({
  data,
  headerText,
  backgroundColors = ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"], // Default colors
  chartOptions = {}, // Allow customization through props
  dateRange,
  setProcessedData
}) => {
  const [petTypeCount, setPetTypeCount] = useState({ dog: 0, cat: 0 });

  useEffect(() => {
    const isDateRangeValid = dateRange && dateRange.length === 2; // Check for valid date range

    // Filter data based on date range or use all data
    const filteredData = isDateRangeValid
      ? data.filter((currentPet) => {
          const petDate = new Date(currentPet.created_at).toISOString(); // Assuming created_at holds pet date
          return petDate >= dateRange[0] && petDate <= dateRange[1];
        })
      : data;

    // Count pet occurrences using reduce
    const countResult = filteredData.reduce(
      (accumulator, currentPet) => {
        const petType = currentPet.Pets?.pet_type?.toLowerCase(); // Handle missing or case-insensitive pet_type
        if (petType === "dog") {
          accumulator.dog += 1;
        } else if (petType === "cat") {
          accumulator.cat += 1;
        }
        return accumulator;
      },
      { dog: 0, cat: 0 }
    );

    // Update petTypeCount with the count result
    setPetTypeCount(countResult);
    setProcessedData(countResult)
  }, [data, dateRange]);

  const hasData = petTypeCount.dog > 0 || petTypeCount.cat > 0; // Check for any data to display

  const petTypeCountData = {
    labels: ["Dogs", "Cats"],
    datasets: [
      {
        label: "Number of Requests",
        data: [petTypeCount.dog, petTypeCount.cat],
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) => `${color.replace(/0.7/, 1)}`), // Adjust border color for better visibility
        borderWidth: 1,

      },
    ],
  };

  return (
    <>
      <h3 className="text-center mt-3">{headerText}</h3>
      <div className="d-flex justify-content-center my-3">
        <div className="card">
          {hasData ? (
            <Pie data={petTypeCountData} width={700} height={700} options={chartOptions} />
          ) : (
            <h1 className="m-5">No records to display.</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default PetTypeCountChart;
