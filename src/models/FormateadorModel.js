import { format, isValid, parse, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";

const zonaHoraria = "America/Bogota";

const hasTimeZoneInfo = (s) => /([zZ]|[+-]\d{2}:\d{2})$/.test(s);

const isDateOnlyString = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);

const isTimeOnlyString = (s) =>
    /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(s);

const isMidnightUTC = (d) =>
    d.getUTCHours() === 0 &&
    d.getUTCMinutes() === 0 &&
    d.getUTCSeconds() === 0 &&
    d.getUTCMilliseconds() === 0;

const rebuildLocalFromUTCDateParts = (d) => {
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const day = d.getUTCDate();

    return new Date(y, m, day);
};

const truncateExtraMilliseconds = (valor) => {
    return valor.replace(/(\.\d{3})\d+([zZ]|[+-]\d{2}:\d{2})$/i, "$1$2");
};

const normalizeToDisplayDate = (valor) => {
    if (!valor) return null;

    if (valor instanceof Date) {
        if (!isValid(valor)) return null;

        if (isMidnightUTC(valor)) {
            return rebuildLocalFromUTCDateParts(valor);
        }

        return toZonedTime(valor, zonaHoraria);
    }

    if (typeof valor === "number") {
        const d = new Date(valor);

        if (!isValid(d)) return null;

        return toZonedTime(d, zonaHoraria);
    }

    if (typeof valor === "string") {
        const value = valor.trim();

        if (!value) return null;

        if (isDateOnlyString(value)) {
            const d = parse(value, "yyyy-MM-dd", new Date());

            return isValid(d) ? d : null;
        }

        if (isTimeOnlyString(value)) {
            const pattern = value.length === 5 ? "HH:mm" : "HH:mm:ss";
            const d = parse(value, pattern, new Date());

            return isValid(d) ? d : null;
        }

        if (hasTimeZoneInfo(value)) {
            const safe = truncateExtraMilliseconds(value);
            const d = parseISO(safe);

            if (!isValid(d)) return null;

            if (isMidnightUTC(d)) {
                return rebuildLocalFromUTCDateParts(d);
            }

            return toZonedTime(d, zonaHoraria);
        }

        const d = parseISO(value);

        return isValid(d) ? d : null;
    }

    return null;
};

export const formatearFechaMes = (valor) => {
    const d = normalizeToDisplayDate(valor);
    if (!d) return "";

    const month = format(d, "MMMM yyyy", { locale: es });

    return month.charAt(0).toUpperCase() + month.slice(1);
};

export const formatearFecha = (valor) => {
    const d = normalizeToDisplayDate(valor);
    if (!d) return "";

    return format(d, "dd/MM/yyyy", { locale: es });
};

export const formatearFechaString = (valor) => {
    const d = normalizeToDisplayDate(valor);
    if (!d) return "";

    return format(d, "dd MMMM yyyy", { locale: es });
};

export const formatearFechaHora = (valor) => {
    const d = normalizeToDisplayDate(valor);
    if (!d) return "";

    return format(d, "dd/MM/yyyy - hh:mm a", { locale: es });
};

export const formatearHora = (valor) => {
    const d = normalizeToDisplayDate(valor);
    if (!d) return "";

    return format(d, "hh:mm a", { locale: es });
};

export const formatearHoraDate = (valor) => {
    const d = normalizeToDisplayDate(valor);
    if (!d) return "";

    return format(d, "hh:mm a", { locale: es });
};

export const fechaHoy = () => {
    return formatInTimeZone(new Date(), zonaHoraria, "yyyy-MM-dd");
};

export const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(valor ?? 0);
};

export const normalizeText = (text) => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

export const traslateRol = (rol) => {
    rol = parseInt(rol, 10);

    if (rol === 0) return "Super Admin";
    if (rol === 1) return "Admin";
    if (rol === 2) return "Asociado";
    if (rol === 3) return "Adherente";
    if (rol === 4) return "Empleado";
    if (rol === 5) return "Familiar";
    if (rol === 6) return "Portero";
    if (rol === 7) return "Administrativo";
    if (rol === 8) return "Gerente Restaurante";
    if (rol === 9) return "Cocinero Restaurante";
    if (rol === 10) return "Mesero Restaurante";

    return "Desconocido";
};