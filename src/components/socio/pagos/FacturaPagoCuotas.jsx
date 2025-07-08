import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { Badge, Button, Card, Table, Timeline } from "flowbite-react";
import React from "react";
import {
    HiOutlineClock, HiOutlineDocumentText, HiOutlineDownload, HiOutlineGlobe, HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone
} from "react-icons/hi";
import imagen from "../../../assets/img/imagen";
import { formatearMoneda } from "../../../models/FormateadorModel";
import { RouteBack } from "../../../models/RutasModel";
import FacturaCuotasPDF from "../../admin/pagos/facturas/FacturaCuotasPDF";

export default function FacturaPagoCuotas({ pago, user }) {
    const zonaHoraria = "America/Bogota";
    const zoneDate = toZonedTime(pago.updated_at, zonaHoraria);
    const fecha = format(zoneDate, "dd MMMM yyyy", { locale: es });

    const handleOpenPdfInNewTab = async () => {
        const blob = await pdf(<FacturaCuotasPDF pago={pago} user={user} />).toBlob();
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="min-h-screen">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4">
                    <div className="flex items-center space-x-4">
                        <HiOutlineDocumentText className="w-6 h-6 text-blue-600" />
                        <div>
                            <h2 className="text-sm font-medium text-gray-900">
                                Factura #{pago.id}
                            </h2>
                            <p className="text-xs text-gray-500">{fecha}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-x-2">
                        <Button size="sm" color="gray" pill onClick={handleOpenPdfInNewTab}>
                            <HiOutlineDownload className="w-4 h-4 mr-2" />
                            Descargar
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                    <Card className="mb-6">
                        <div className="border-b border-gray-200 pb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <img src={imagen.logoClub} alt="Logo" className="w-12 h-12 object-contain" />
                                        </div>
                                        <div>
                                            <h1 className="text-sm sm:text-2xl font-bold text-gray-900">
                                                CORPORACIÓN CLUB SINCELEJO
                                            </h1>
                                            <p className="sm:text-sm text-xs text-gray-500">
                                                NIT: 800.007.089 - 9
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        {[
                                            {
                                                icon: HiOutlineLocationMarker,
                                                label: "Dirección",
                                                value: "CALLE 38 NO 34 184",
                                            },
                                            {
                                                icon: HiOutlinePhone,
                                                label: "Teléfono",
                                                value: "3135335145 - 2804889",
                                            },
                                            {
                                                icon: HiOutlineMail,
                                                label: "Email",
                                                value: "info@clubsincelejo.com",
                                            },
                                            {
                                                icon: HiOutlineGlobe,
                                                label: "Ciudad",
                                                value: "SINCELEJO - COLOMBIA",
                                            },
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <item.icon className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-gray-600">{item.label}</p>
                                                    <p className="font-medium text-gray-900 text-xs sm:text-sm">
                                                        {item.value}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right mb-4 md:mb-0">
                                    <div className="inline-block rounded-lg bg-blue-50 px-4 py-2 mb-6">
                                        <div className="text-xs text-blue-600 font-medium">
                                            FACTURA N°
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {pago.id}
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1 text-sm">
                                        <div>
                                            <span className="text-gray-500">Fecha de Emisión:</span>
                                            <span className="ml-2 font-medium">{fecha}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-2 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Información del Cliente
                            </h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Nombre Completo
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {user.Nombre} {user.Apellidos}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Documento</p>
                                        <p className="font-medium text-gray-900">
                                            {user.Documento}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                                        <p className="font-medium text-gray-900">{user.Telefono}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Dirección</p>
                                        <p className="font-medium text-gray-900">
                                            {user.Direccion || "No registrada"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Detalle de Pagos
                            </h2>
                            <div className="overflow-x-auto">
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell className="bg-gray-50">
                                            Referencia
                                        </Table.HeadCell>
                                        <Table.HeadCell className="bg-gray-50">
                                            Método
                                        </Table.HeadCell>
                                        <Table.HeadCell className="bg-gray-50">
                                            Fecha
                                        </Table.HeadCell>
                                        <Table.HeadCell className="bg-gray-50 text-right">
                                            Monto
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {pago.pago.map((pagoItem) => {
                                            const pagoDate = toZonedTime(
                                                pagoItem.fecha_pago,
                                                zonaHoraria
                                            );
                                            const fechaPago = format(pagoDate, "dd MMMM yyyy", {
                                                locale: es,
                                            });
                                            return (
                                                <Table.Row key={pagoItem.id} className="bg-white">
                                                    <Table.Cell className="font-medium">
                                                        {pagoItem.referencia_pago}
                                                    </Table.Cell>
                                                    <Table.Cell>{pagoItem.metodo_pago}</Table.Cell>
                                                    <Table.Cell>{fechaPago}</Table.Cell>
                                                    <Table.Cell className="text-right font-medium">
                                                        {formatearMoneda(pagoItem.monto)}
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-4 space-y-6">
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Resumen de Pago
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-gray-600">Abonado</span>
                                <span className="font-medium">{formatearMoneda(pago.total_pagos)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-gray-600">Restante</span>
                                <span className="font-medium">{formatearMoneda(pago.restante)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-md sm:text-2xl font-bold text-blue-600">
                                    {formatearMoneda(pago.valor)}
                                </span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Estado del Pago
                            </h3>
                            <Badge color="success">
                                {pago.estado ? "Pagado" : "Pendiente"}
                            </Badge>
                        </div>
                        <Timeline>
                            {pago.pago.map((pagoItem) => {
                                const pagoDate = toZonedTime(pagoItem.fecha_pago, zonaHoraria);
                                const fechaPago = format(pagoDate, "dd MMM yyyy", {
                                    locale: es,
                                });
                                return (
                                    <Timeline.Item key={pagoItem.id}>
                                        <Timeline.Point icon={HiOutlineClock} />
                                        <Timeline.Content>
                                            <Timeline.Time>{fechaPago}</Timeline.Time>
                                            <Timeline.Title className="text-sm">
                                                Pago procesado - {formatearMoneda(pagoItem.monto)}
                                            </Timeline.Title>
                                            <Timeline.Body className="text-xs text-gray-500">
                                                {pagoItem.metodo_pago}
                                            </Timeline.Body>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                );
                            })}
                        </Timeline>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Soporte
                        </h3>
                        {
                            pago.pago.map((pago) => (
                                pago.soporte
                                    ? <img src={RouteBack + pago.soporte} alt="soporte" key={pago.id} className="mb-2 max-h-80 object-contain border rounded" />
                                    : <p key={pago.id} className="text-sm text-gray-500">El pago se realizó con el metodo de pago: {pago.metodo_pago}</p>
                            ))
                        }
                    </Card>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                <p className="mt-1">
                    © {new Date().getFullYear()} Corporación Club Sincelejo - Todos los
                    derechos reservados
                </p>
            </div>
        </div>
    );
}
