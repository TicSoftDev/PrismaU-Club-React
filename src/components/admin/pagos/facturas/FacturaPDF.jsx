import { Document, Page, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import React from 'react';
import { styles } from '../../../../assets/styles/factura';
import { formatearMoneda } from '../../../../models/FormateadorModel';

export default function FacturaPDF({ pago, user }) {

    const zonaHoraria = 'America/Bogota';
    const zoneDate = toZonedTime(pago.updated_at, zonaHoraria);
    const fecha = format(zoneDate, 'dd MMM yyyy', { locale: es }).toUpperCase();
    const zonedDate2 = toZonedTime(pago.fecha, zonaHoraria);
    const month = format(zonedDate2, 'MMMM yyyy', { locale: es }).toUpperCase();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>CORPORACION CLUB SINCELEJO</Text>
                    <Text>NIT: 800.007.089-9</Text>
                    <Text>CALLE 38 NO 34 184</Text>
                    <Text>SINCELEJO - COLOMBIA</Text>
                    <Text>Tel: 3135335145 - 2804889</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>RECIBO DE CAJA - SOSTENIMIENTO</Text>
                        <Text style={styles.value}>R-{pago.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha Comprobante</Text>
                        <Text style={styles.value}>{fecha}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCellTitle, styles.col1]}>Nombre</Text>
                        <Text style={[styles.tableCellValue, styles.col2]}> {user.Nombre} {user.Apellidos}</Text>
                        <Text style={[styles.tableCellTitle, styles.col1]}>NIT</Text>
                        <Text style={[styles.tableCellValue, styles.col3]}> {user.Documento}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCellTitle, styles.col1]}>Dirección</Text>
                        <Text style={[styles.tableCellValue, styles.col2]}>{user.Direccion || "No registrada"}</Text>
                        <Text style={[styles.tableCellTitle, styles.col1]}>Teléfono</Text>
                        <Text style={[styles.tableCellValue, styles.col3]}>{user.Telefono}</Text>
                    </View>
                </View>

                {/* Tabla de detalles */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCell, styles.col1]}>Referencia</Text>
                    <Text style={[styles.tableCell, styles.col2]}>Descripción</Text>
                    <Text style={[styles.tableCell, styles.col1]}>Metodo</Text>
                    <Text style={[styles.tableCell, styles.col1]}>Valor</Text>
                </View>

                {
                    pago.pago.map((pago) => (
                        <View style={styles.tableRow} key={pago.id}>
                            <Text style={[styles.tableCell, styles.col1, styles.padding]}>{pago.referencia_pago}</Text>
                            <Text style={[styles.tableCell, styles.col2, styles.padding]}>PAGO FACTURA {month}</Text>
                            <Text style={[styles.tableCell, styles.col1, styles.padding]}>{pago.metodo_pago}</Text>
                            <Text style={[styles.tableCell, styles.col1, styles.padding]}>{formatearMoneda(pago.monto)}</Text>
                        </View>
                    ))
                }

                {/* Total */}
                <View style={styles.row}>
                    <Text style={[styles.label, { marginTop: 8 }]}>Total</Text>
                    <Text style={[styles.value, { marginTop: 8 }]}>{formatearMoneda(pago.valor)}</Text>
                </View>
            </Page>
        </Document>
    )
}
