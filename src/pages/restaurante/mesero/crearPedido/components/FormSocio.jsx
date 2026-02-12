import { Label } from "flowbite-react";
import Select from 'react-select';

export default function FormSocio({ socios = [], pedido, hayPedido, handleChangeSelect }) {

    const options = socios?.map((socio) => ({ value: socio.id, label: `${socio.nombre} ${socio.apellidos}` }));

    return (
        <div className="w-full bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="mb-2 block">
                <Label value="Seleccione un socio para el pedido" />
            </div>
            <Select options={options} onChange={(option) => handleChangeSelect("user_id", option.value)}
                placeholder="Escoja un socio..." className="z-10" isDisabled={hayPedido}
                value={options.find(option => option.value === pedido.user_id) || null} />
        </div>
    )
}