import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, RouteBack } from '../../../models/RutasModel';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';

function DataTableUsersEncuestas({ data, loading }) {

    const navigate = useNavigate();

    const columns = [
        {
            name: "N°",
            cell: (row, i) => i + 1,
            width: '100px',
        },
        {
            name: "Nombre completo",
            cell: row => (
                <div className="flex items-center space-x-3 w-full">
                    <div className="shrink-0">
                        {
                            row.imagen ?
                                <img className="w-10 h-10 rounded-full object-cover" src={RouteBack + row.user_info.imagen} alt="Imagen del" /> :
                                row.Sexo == "Femenino" ?
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png" alt="Imagen predeterminada de mujer" />
                                    : <img className="w-10 h-10 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Imagen predeterminada de hombre" />
                        }
                    </div>
                    <div className="flex-grow">
                        <div className="text-base font-semibold whitespace-normal">{row.user_info.Nombre + " " + row.user_info.Apellidos}</div>
                    </div>
                </div>
            ),
            style: {
                padding: '10px'
            }
        },
        {
            name: "Fecha de respuesta",
            cell: row => format(new Date(row.fecha_respuesta), "dd 'de' MMMM 'de' yyyy", { locale: es }),
        },
        {
            cell: row => <button onClick={() => navigate(PrivateRoutes.RESPUESTAS_ENCUESTA, { state: { encuesta: row } })} className='text-blue-700 font-semibold hover:underline' title='Preguntas' > Ver Respuestas </button>,
            width: '200px',
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#379861',
                color: '#FFF',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            },
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg shadow w-full dark:border-gray-700 dark:bg-gray-800">
            <DataTable
                columns={columns}
                data={data}
                defaultSortFieldId={1}
                pagination
                progressPending={loading}
                progressComponent={<TableSkeleton />}
                noDataComponent={<div className='flex justify-center font-bold my-20 text-gray-500'>No hay nada en el historial</div>}
                customStyles={customStyles}
            />
        </div>
    );
}

export default DataTableUsersEncuestas