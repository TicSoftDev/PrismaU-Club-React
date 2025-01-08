import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import * as XLSX from 'xlsx';
import { formatearFecha, formatearMoneda } from '../../../../models/FormateadorModel';

export default function PagosCuotasExcel({ data, fileName }) {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = () => {
    const newData = data.map(item => ({
      'Nombre Completo': item.cuota.user.asociado ? item.cuota.user.asociado.Nombre + " " + item.cuota.user.asociado.Apellidos : item.cuota.user.adherente.Nombre + " " + item.cuota.user.adherente.Apellidos,
      'Identificación': item.cuota.user.asociado ? item.cuota.user.asociado.Documento : item.cuota.user.adherente.Documento,
      'Periodo': item.cuota.año,
      'Referencia de pago': item.referencia_pago,
      'Metodo de pago': item.metodo_pago,
      'Monto': formatearMoneda(item.monto),
      'Fecha de pago': formatearFecha(item.fecha_pago),
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
    <button className='inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500 focus:z-10 focus:ring-2'
      onClick={exportToCSV}>
      <SiMicrosoftexcel className='me-2' /> Excel
    </button>
  )
}
