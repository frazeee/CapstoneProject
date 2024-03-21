import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const IndividualRequestChart = ({ data, headerText, backgroundColors ,chartOptions, dateRange,  setProcessedData}) => {
  const [individualPetRequestCount, setIndividualPetRequestCount] = useState({});

  useEffect(() => {
    // Count active requests of specific dog and cat within the specified date range
    const countResult = data.reduce((accumulator, currentPet) => {
      const petName = currentPet.Pets.pet_name;
      const petDate = new Date(currentPet.created_at).toISOString(); // Assuming created_at is the property containing the pet's date
      const isWithinDateRange = !dateRange[0] || !dateRange[1] || (petDate >= dateRange[0] && petDate <= dateRange[1]);
  
      if (isWithinDateRange && petName) {
        accumulator[petName] = (accumulator[petName] || 0) + 1;
      }
      return accumulator;
    }, {});
  
    setIndividualPetRequestCount(countResult);
    setProcessedData(countResult)
  }, [data, dateRange]);
  

  const individualPetRequestCountData = {
    labels: Object.keys(individualPetRequestCount),
    datasets: [
      {
        label: "Number of Requests",
        data: Object.values(individualPetRequestCount),
        backgroundColor: backgroundColors,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  console.log(individualPetRequestCountData)

  return (
<>
  <h3 className="text-center mt-3">{headerText}</h3>
  <div className="d-flex justify-content-center my-3">
    <div className="card">
      {individualPetRequestCountData.datasets &&
        individualPetRequestCountData.datasets[0].data.every(value => value === 0) ? (
          <h1 className="m-5">No records to display.</h1>
      ) : (
        <Pie
          data={individualPetRequestCountData}
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

export default IndividualRequestChart;
