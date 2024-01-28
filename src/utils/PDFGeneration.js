import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "jspdf-invoice-template";
import BPUAdoptLogo from "../images/BPUADOPT_LOGO_BLACK.png";


const PDFGeneration = ({ data, shelterName }) => {
  const generateHeader = (pdf) => {
    pdf.setFontSize(18);
    pdf.setFont("Arial", "bold");
    pdf.text(`${shelterName}`, 110, 15);
    pdf.setFontSize(14);
    pdf.setFont("Arial", "normal");
    pdf.text("Adoptions History", 200, 20, { align: "right" });
    pdf.text("Condition", 200, 25, { align: "right" });
    pdf.setLineWidth(0.5);
    pdf.line(5, 35, pdf.internal.pageSize.width - 5, 35);
    pdf.addImage(BPUAdoptLogo, "PNG", 5, -8, 50, 50);
  };

  const generateReport = (data) => {
    const pdf = new jsPDF();

    generateHeader(pdf);

    let transformedData = []
    Object.values(data).forEach((record) => {
      let formattedDate = new Date(record.created_at).toLocaleString('en-US');
      transformedData.push([record.first_name + " " + record.last_name, record.Pets.pet_name, record.adoption_status, formattedDate]);
    });

    pdf.autoTable({
      startY: 45,
      head: [
        [
          "Adopter Name",
          "Pet Name",
          "Adoption Status",
          "Date Created",
          "Date Approved",
        ],
      ],
      styles: { halign: "center" },
      body: transformedData,
    });

    pdf.save("Report.pdf");
  };

  return (
      <button className='btn text-light align-self-end me-3 mb-3' style={{width: "175px"}} onClick={(e) =>  generateReport(data)}>Export Data</button>
  );
};

export default PDFGeneration;
