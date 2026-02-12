import { Label, Select, Textarea, TextInput } from "flowbite-react";

export default function FormPagarPedido({ venta, handleChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Metodo de pago" htmlFor="metodo" />
        </div>
        <Select onChange={handleChange} name='metodo_pago' value={venta.metodo_pago ?? ""} id='metodo'>
          <option disabled value=''>Seleccione un metodo de pago</option>
          <option value='EFECTIVO'>Efectivo</option>
          <option value='TRANSFERENCIA'>Transferencia</option>
          <option value='TARJETA DE CREDITO'>Tarjeta de credito</option>
          <option value='TARJETA DE DEBITO'>Tarjeta debito</option>
          <option value='PAYPAL'>Paypal</option>
          <option value='OTRO'>Otro</option>
        </Select>
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Referencia de pago" htmlFor="referencia" />
        </div>
        <TextInput onChange={handleChange} name='referencia_pago' placeholder='ingrese la  referencia de esta venta'
          value={venta.referencia_pago ?? ""} id='referencia' />
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label value="Observaciones" htmlFor="observaciones" />
        </div>
        <Textarea onChange={handleChange} name='observacion' placeholder='ingrese observaciones para esta venta'
          value={venta.observacion ?? ""} id='observaciones' />
      </div>
    </div>
  )
}
