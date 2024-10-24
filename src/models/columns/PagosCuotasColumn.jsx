import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { formatearMoneda } from "../FormateadorModel";

export const PagosCuotasColumn = () => {

    const zonaHoraria = 'America/Bogota';

    return [
        {
            name: "Nombre socio",
            selector: row => row.cuota.user.asociado ? row.cuota.user.asociado.Nombre + " " + row.cuota.user.asociado.Apellidos : row.cuota.user.adherente.Nombre + " " + row.cuota.user.adherente.Apellidos,
            width: '300px',
        },
        {
            name: "Perido",
            selector: row => row.cuota.año
        },
        {
            name: "Referencia de pago",
            selector: row => row.referencia_pago,
            width: '180px',
        },
        {
            name: "Metodo de pago",
            selector: row => row.metodo_pago,
            width: '150px',
        },
        {
            name: "Monto",
            selector: row => formatearMoneda(row.monto),
        },
        {
            name: "Fecha de pago",
            selector: row => {
                const zonedDate = toZonedTime(row.fecha_pago, zonaHoraria);
                return format(zonedDate, 'dd/MM/yyyy', { locale: es });
            },
            width: '150px',
        },
    ];
};