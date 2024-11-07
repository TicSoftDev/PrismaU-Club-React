import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import * as XLSX from 'xlsx';
import { formatearFecha, formatearFechaMes, formatearMoneda } from '../../../../models/FormateadorModel';

export default function PagosExcel({ data, fileName }) {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = () => {
    const newData = data.map(item => ({
      'Nombre Completo': item.mensualidad.user.asociado ? item.mensualidad.user.asociado.Nombre + " " + item.mensualidad.user.asociado.Apellidos : item.mensualidad.user.adherente.Nombre + " " + item.mensualidad.user.adherente.Apellidos,
      'Identificación': item.mensualidad.user.asociado ? item.mensualidad.user.asociado.Documento : item.mensualidad.user.adherente.Documento,
      'Periodo': formatearFechaMes(item.mensualidad.fecha),
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
