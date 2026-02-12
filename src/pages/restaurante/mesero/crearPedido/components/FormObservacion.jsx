import { Label, Textarea } from 'flowbite-react'

export default function FormObservacion({ observaciones, handleChange }) {
    return (
        <div className="w-full">
            <div className="mb-2 block">
                <Label value="Observaciones" htmlFor="observaciones" />
            </div>
            <Textarea onChange={handleChange} name='observaciones' placeholder='ingrese observaciones para este plato'
                value={observaciones} id='observaciones' />
        </div>
    )
}
