import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";

const AdoptionCountChart = ({
  data,
  headerText,
  backgroundColors,
  chartOptions,
  dateRange,
}) => {

  const [monthlyCounts, setMonthlyCounts] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const counts = {};
  
      // Convert date range to moment objects if available
      let startDate, endDate;
      if (dateRange && dateRange.length === 2) {
        startDate = moment(dateRange[0]);
        endDate = moment(dateRange[1]);
      }
  
      // Loop through data to populate counts
      data.forEach((record) => {
        const createdAt = moment(record.created_at);
        const monthYear = createdAt.format("YYYY-MM");
  
        // Check if the record is within the date range, if date range is available
        if (!startDate || !endDate || (createdAt.isSameOrAfter(startDate) && createdAt.isSameOrBefore(endDate))) {
          counts[monthYear] = (counts[monthYear] || 0) + 1;
        }
      });
  
      // Fill in missing months with zero counts
      if (startDate && endDate) {
        const currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate)) {
          const monthYear = currentDate.format("YYYY-MM");
          if (!counts[monthYear]) {
            counts[monthYear] = 0;
          }
          currentDate.add(1, "month");
        }
      }
  
      // Sort the counts by date
      const sortedCounts = Object.entries(counts).sort(
        (a, b) => moment(a[0]).valueOf() - moment(b[0]).valueOf()
      );
  
      const labels = sortedCounts.map(([monthYear]) => monthYear);
      const countValues = sortedCounts.map(([_, count]) => count);
  
      setMonthlyCounts({
        labels,
        datasets: [
          {
            label: "Adoption Count",
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
            hoverBorderColor: "rgba(75, 192, 192, 1)",
            data: countValues,
          },
        ],
      });
    }
  }, [data, dateRange]);
  
  
  


  return (
    <>
      <h3 className="text-center mt-3">{headerText}</h3>
      <div className="d-flex justify-content-center my-3">
        <div className="card">
          {monthlyCounts && (
            <Bar
              data={monthlyCounts}
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

export default AdoptionCountChart;
