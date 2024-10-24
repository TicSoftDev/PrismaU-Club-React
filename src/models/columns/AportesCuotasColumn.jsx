import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { formatearMoneda } from "../FormateadorModel";

export const AportesCuotasColumn = () => {

    const zonaHoraria = 'America/Bogota';

    return [
        {
            name: "Referencia de pago",
            selector: row => row.referencia_pago,
        },
        {
            name: "Metodo de pago",
            selector: row => row.metodo_pago,
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