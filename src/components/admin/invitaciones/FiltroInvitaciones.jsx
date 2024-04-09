import React from 'react';
import { Label, Select } from 'flowbite-react';
import { FaCalendarAlt } from 'react-icons/fa';


function FiltroInvitaciones({ selectedMonth, setSelectedMonth }) {
    return (
        <div className="w-full">
            <div className="mb-2 block">
                <Label htmlFor="busqueda" value="Filtre aqui por mes" />
            </div>
            <Select
                value={selectedMonth} id='busqueda' icon={FaCalendarAlt}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="mb-6 rounded-lg bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
                <option value={1}>Enero</option>
                <option value={2}>Febrero</option>
                <option value={3}>Marzo</option>
                <option value={4}>Abril</option>
                <option value={5}>Mayo</option>
                <option value={6}>Junio</option>
                <option value={7}>Julio</option>
                <option value={8}>Agosto</option>
                <option value={9}>Septiembre</option>
                <option value={10}>Octubre</option>
                <option value={11}>Noviembre</option>
                <option value={12}>Diciembre</option>
            </Select>
        </div>
    );
}

export default FiltroInvitaciones;