import { Label, TextInput } from 'flowbite-react';
import { FaKey } from 'react-icons/fa';

function FormClave({ usuario, hanleChange }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="Clave" value="Ingrese la nueva clave" />
                    </div>
                    <TextInput id="Clave" type="text" icon={FaKey} onChange={hanleChange}
                        value={usuario.password} name='password' placeholder="Ingrese la clave nueva..." required />
                </div>
            </div>
        </>
    );
}

export default FormClave;