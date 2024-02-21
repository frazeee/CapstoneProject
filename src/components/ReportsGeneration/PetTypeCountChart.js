import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const PetTypeCountChart = ({
  data,
  headerText,
  backgroundColors,
  chartOptions,
  dateRange,
}) => {
  const [petTypeCount, setPetTypeCount] = useState({ dog: 0, cat: 0 });
  console.log(dateRange);
  useEffect(() => {
    // Check if dateRange is valid (both start and end dates are provided)
    const isDateRangeValid = dateRange[0] && dateRange[1];

    // Filter data based on the date range if it's valid, otherwise, use all data
    const filteredData = isDateRangeValid
      ? data.filter((currentPet) => {
          const petDate = new Date(currentPet.created_at).toISOString(); // Assuming created_at is the property containing the pet's date
          return petDate >= dateRange[0] && petDate <= dateRange[1];
        })
      : data;

    // Count occurrences of dog and cat in filtered data
    const countResult = filteredData.reduce(
      (accumulator, currentPet) => {
        const petType = currentPet.Pets.pet_type;
        if (petType === "Dog") {
          accumulator.dog += 1;
        } else if (petType === "Cat") {
          accumulator.cat += 1;
        }
        return accumulator;
      },
      { dog: 0, cat: 0 }
    );

    // Update petTypeCount with the count result
    setPetTypeCount(countResult);
  }, [data, dateRange]);

  const petTypeCountData = {
    labels: ["Dogs", "Cats"],
    datasets: [
      {
        label: "Number of Requests",
        data: [petTypeCount.dog, petTypeCount.cat],
        backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  console.log();

  return (
    <>
  <h3 className="text-center mt-3">{headerText}</h3>
  <div className="d-flex justify-content-center my-3">
    <div className="card">
      {petTypeCountData.datasets[0].data.every((value) => value !== 0) ? (
        <Pie
          data={petTypeCountData}
          width={700}
          height={700}
          options={chartOptions} // You may need to define chartOptions
        />
      ) : (
        <h1 className="m-5">No records to display.</h1>
      )}
    </div>
  </div>
</>

  );
};

export default PetTypeCountChart;
