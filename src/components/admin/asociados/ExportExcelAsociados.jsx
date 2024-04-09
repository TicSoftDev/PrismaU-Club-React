import React from 'react';
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from "react-icons/si";


const ExportExcelAsociados = ({ data, fileName }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        const newData = data.map(item => ({
            'Nombre Completo': item.personal.Nombre + ' ' + item.personal.Apellidos,
            'Identificación': item.personal.TipoDocumento + ' ' + item.personal.Documento,
            'Fecha Nacimiento': item.personal.FechaNacimiento,
            'Lugar Nacimiento': item.personal.LugarNacimiento,
            'Email': item.personal.Correo,
            'Telefono': item.personal.Telefono,
            'Sexo': item.personal.Sexo,
            'Dirección Residencia': item.personal.DireccionResidencia,
            'Ciudad Residencia': item.personal.CiudadResidencia,
            'Tiempo Residencia': item.personal.TiempoResidencia,
            'Estado Civil': item.personal.EstadoCivil,
            'Profesion': item.personal.Profesion,
            'Trabajo': item.personal.Trabajo,
            'Cargo': item.personal.Cargo,
            'Tiempo Servicios': item.personal.TiempoServicio,
            'Telefono Trabajo': item.personal.TelOficina,
            'Dirección Trabajo': item.personal.DireccionOficina,
            'Ciudad Trabajo': item.personal.CiudadOficina,
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
        <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-orange-500 hover:bg-white hover:text-orange-500 focus:z-10 focus:ring-2' onClick={exportToCSV}>
            <SiMicrosoftexcel className='me-2' /> Excel
        </button>
    );
};

export default ExportExcelAsociados;
