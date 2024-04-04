import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaCalendarAlt, FaCity, FaEnvelope, FaEye, FaIdCard, FaKeyboard, FaMapMarkerAlt, FaMercury, FaPhoneAlt, FaSortNumericUp, FaSuitcase, FaUserGraduate, FaUserTag, FaUserTie } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';
import useAsociados from '../../../hooks/useAsociados';

function FormMotivo({ handleChangeEstado }) {

    return (
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="motivo">Motivo</label>
                <textarea className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="motivo_help" id="motivo"
                    type="text" name='Motivo' onChange={handleChangeEstado} placeholder='Escriba el motivo por el cual le va a cambiar el estado' />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="motivo_help">*Requerido.</p>
            </div>
        </div>
    );
}

export default FormMotivo;