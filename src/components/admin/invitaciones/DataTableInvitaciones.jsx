import { useState } from 'react';
import { Badge, Modal, Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { formatearFechaHora } from '../../../models/FormateadorModel';
import TableSkeleton from '../../../utilities/skeletons/TableSkeleton';
import { RouteBack } from '../../../models/RutasModel';

function DataTableInvitaciones({ data, loading }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpenImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage(null);
    };

    const columns = [
        {
            name: "N°",
            cell: (_row, i) => i + 1,
            width: '60px',
        },
        {
            name: "Fecha",
            cell: row => formatearFechaHora(row.created_at),
            width: '210px',
        },
        {
            name: "Estado",
            cell: row => (
                <Badge color={row.Status ? "green" : "yellow"}>
                    {row.Status ? "Entró" : "No Entró"}
                </Badge>
            ),
            width: '120px',
        },
        {
            name: "Nombre Completo",
            cell: row => `${row.Nombre ?? ''} ${row.Apellidos ?? ''}`,
            width: '250px',
        },
        {
            name: "Identificación",
            cell: row => row.Documento,
            width: '150px',
        },
        {
            name: "Imagen Doc.",
            cell: row => {
                const imageUrl = row.Imagen || row.imagen || row.image_url;

                if (!imageUrl) {
                    return (
                        <span className="text-xs font-medium text-gray-400">
                            Sin imagen
                        </span>
                    );
                }

                return (
                    <button
                        type="button"
                        onClick={() => handleOpenImage(imageUrl)}
                        className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-sm transition hover:border-green-500 hover:bg-green-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500 dark:hover:bg-gray-700"
                    >
                        <img
                            src={`${RouteBack}${imageUrl}`}
                            alt="Documento de identificación"
                            className="h-10 w-14 rounded-md object-cover ring-1 ring-gray-200 dark:ring-gray-600"
                        />

                        <span className="text-xs font-semibold text-green-700 group-hover:underline dark:text-green-400">
                            Ver
                        </span>
                    </button>
                );
            },
            width: '160px',
        },
        {
            name: "Invitado por",
            cell: row => {
                if (row.user?.asociado) {
                    return `${row.user.asociado.Nombre ?? ''} ${row.user.asociado.Apellidos ?? ''}`;
                }

                if (row.user?.adherente) {
                    return `${row.user.adherente.Nombre ?? ''} ${row.user.adherente.Apellidos ?? ''}`;
                }

                return 'Sin información';
            },
            width: '310px',
        },
        {
            name: "Rol",
            cell: row => row.user?.asociado ? "Asociado" : "Adherente",
            sortable: true,
            width: '120px',
        },
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
        },
        rows: {
            style: {
                minHeight: '64px',
            },
        },
    };

    return (
        <>
            <div className="w-full rounded-lg border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800">
                <DataTable
                    columns={columns}
                    data={data}
                    defaultSortFieldId={1}
                    pagination
                    progressPending={loading}
                    progressComponent={<TableSkeleton />}
                    noDataComponent={
                        <div className="my-20 flex justify-center font-bold text-gray-500">
                            No hay ninguna invitación
                        </div>
                    }
                    customStyles={customStyles}
                />
            </div>

            <Modal show={openModal} size="4xl" popup onClose={handleCloseModal}>
                <Modal.Header />

                <Modal.Body>
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Documento de identificación
                        </h3>

                        {selectedImage ? (
                            <div className="flex max-h-[75vh] w-full justify-center overflow-auto rounded-xl bg-gray-100 p-3 dark:bg-gray-900">
                                <img
                                    src={`${RouteBack}${selectedImage}`}
                                    alt="Documento de identificación ampliado"
                                    className="max-h-[70vh] max-w-full rounded-lg object-contain"
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No hay imagen disponible.
                            </p>
                        )}

                        <div className="flex justify-end">
                            <Button color="gray" onClick={handleCloseModal}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DataTableInvitaciones;