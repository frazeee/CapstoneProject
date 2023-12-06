import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ReportGeneration = ({ data }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const transformDataForExport = (data) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    
        return data.map(item => ({
            Id: item.id,
            DateRequested: new Date(item.created_at).toLocaleString('en-US', options),
            PetId: item.pet_id,
            PetName: item.Pets.pet_name,
            FirstName: item.first_name,
            LastName: item.last_name,
            AdoptionStatus: item.adoption_status
        }));
    };
    

    const exportToCSV = (apiData, fileName) => {
        const formattedData = transformDataForExport(apiData);
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button className='btn text-light align-self-end me-3 mb-3' style={{width: "175px"}} onClick={(e) => exportToCSV(data, "exported_data")}>Export to Excel</button>
    );
}

export default ReportGeneration;
