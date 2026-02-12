import { Label, Textarea, TextInput } from 'flowbite-react'

export default function FormDetalle({ item, handleChange }) {
    return (
        <>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label value="Cantidad" htmlFor="cantidad" />
                </div>
                <TextInput onChange={handleChange} name='cantidad' placeholder='ingrese cantidad para este plato'
                    value={item.cantidad ?? ""} id='cantidad' type='number' />
            </div>
            <div className="w-full">
                <div className="mb-2 block">
                    <Label value="Observaciones" htmlFor="observaciones" />
                </div>
                <Textarea onChange={handleChange} name='observaciones' placeholder='ingrese observaciones para este plato'
                    value={item.observaciones ?? ""} id='observaciones' />
            </div>
        </>
    )
}
