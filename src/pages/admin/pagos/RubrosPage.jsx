import React from 'react';
import FormRubros from '../../../components/admin/rubros/FormRubros';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useRubros from '../../../hooks/useRubros';
import { rubrosColumn } from '../../../models/columns/RubrosColumn';
import DataTableComponent from '../../../utilities/dataTable/DataTableComponent';
import TituloPage from '../../../utilities/helpers/TituloPage';
import VentanaModal from '../../../utilities/modals/VentanaModal';

export default function RubrosPage() {

  const { titulo, rubros, rubro, openModal, loading, tituloModal,
    handleChange, handleSubmit, toggleModal, cargarRubro, handleUpdate, handleDelete
  } = useRubros();
  const handler = rubro.id ? handleUpdate : handleSubmit;
  const columns = rubrosColumn(cargarRubro, handleDelete);

  return (
    <>
      <TituloPage titulo={titulo} />
      <div className='w-full mt-7'>
        <MenuSencillo noBuscar={true} toggleModal={toggleModal} />
        <DataTableComponent data={rubros} columns={columns} loading={loading} />
        <VentanaModal size={'7xl'} titulo={tituloModal} openModal={openModal} cerrarModal={toggleModal}
          hanleSubmit={handler} loading={loading}>
          <FormRubros handleChange={handleChange} rubro={rubro} />
        </VentanaModal>
      </div>
    </>
  )
}
