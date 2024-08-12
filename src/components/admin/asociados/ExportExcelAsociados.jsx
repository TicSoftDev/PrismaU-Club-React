import React from 'react';
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from 'xlsx';


const ExportExcelAsociados = ({ data, fileName }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        const newData = data.map(item => ({
            'Nombre Completo': item.Nombre + ' ' + item.Apellidos,
            'Identificación': item.TipoDocumento + ' ' + item.Documento,
            'Fecha Nacimiento': item.FechaNacimiento,
            'Lugar Nacimiento': item.LugarNacimiento,
            'Email': item.Correo,
            'Telefono': item.Telefono,
            'Sexo': item.Sexo,
            'Dirección Residencia': item.DireccionResidencia,
            'Ciudad Residencia': item.CiudadResidencia,
            'Tiempo Residencia': item.TiempoResidencia,
            'Estado Civil': item.EstadoCivil,
            'Profesion': item.Profesion,
            'Trabajo': item.Trabajo,
            'Cargo': item.Cargo,
            'Tiempo Servicios': item.TiempoServicio,
            'Telefono Trabajo': item.TelOficina,
            'Dirección Trabajo': item.DireccionOficina,
            'Ciudad Trabajo': item.CiudadOficina,
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
        <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500 focus:z-10 focus:ring-2' onClick={exportToCSV}>
            <SiMicrosoftexcel className='me-2' /> Excel
        </button>
    );
};

export default ExportExcelAsociados;
