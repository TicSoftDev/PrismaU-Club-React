import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { formatearMoneda } from "../FormateadorModel";

export const PagosColumn = () => {

    const zonaHoraria = 'America/Bogota';

    return [
        {
            name: "Nombre socio",
            selector: row => row.mensualidad.user.asociado ? row.mensualidad.user.asociado.Nombre + " " + row.mensualidad.user.asociado.Apellidos : row.mensualidad.user.adherente.Nombre + " " + row.mensualidad.user.adherente.Apellidos,
            width: '320px',
        },
        {
            name: "Periodo",
            selector: row => {
                const zonedDate = toZonedTime(row.mensualidad.fecha, zonaHoraria);
                const month = format(zonedDate, 'MMMM yyyy', { locale: es });
                return month.charAt(0).toUpperCase() + month.slice(1);
            },
        },
        {
            name: "Referencia de pago",
            selector: row => row.referencia_pago,
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
            }
        },
    ];
};