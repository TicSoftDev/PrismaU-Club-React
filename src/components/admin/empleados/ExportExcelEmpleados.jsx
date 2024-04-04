import React from 'react';
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from "react-icons/si";


const ExportExcelEmpleados = ({ data, fileName }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        const newData = data.map(item => ({
            'Nombre Completo': item.empleado.Nombre + ' ' + item.empleado.Apellidos,
            'Identificación': item.empleado.TipoDocumento + ' ' + item.empleado.Documento,
            'Fecha Nacimiento': item.empleado.FechaNacimiento,
            'Lugar Nacimiento': item.empleado.LugarNacimiento,
            'Email': item.empleado.Correo,
            'Telefono': item.empleado.Telefono,
            'Sexo': item.empleado.Sexo,
            'Dirección Residencia': item.empleado.DireccionResidencia,
            'Ciudad Residencia': item.empleado.CiudadResidencia,
            'Tiempo Residencia': item.empleado.TiempoResidencia,
            'Estado Civil': item.empleado.EstadoCivil,
            'Cargo': item.empleado.Cargo,
        }));
        const ws = XLSX.utils.json_to_sheet(newData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: fileType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.setAttribute('download', fileName + fileExtension);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    return (
        <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 ' onClick={exportToCSV}>
            <SiMicrosoftexcel className='me-2' /> Excel
        </button>
    );
};

export default ExportExcelEmpleados;
