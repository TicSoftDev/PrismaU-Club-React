import React from 'react';
import MenuOpciones from '../../../components/admin/pagos/MenuOpciones';
import TituloPage from '../../../utilities/helpers/TituloPage';

export default function PagosPage() {

  const titulo = "Pagos";

  return (
    <>
      <TituloPage titulo={titulo} />
      <MenuOpciones />
    </>
  )
}
