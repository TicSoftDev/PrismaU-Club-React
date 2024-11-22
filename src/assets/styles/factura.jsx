import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 10,
    },
    section: {
        marginTop: 15,
        marginBottom: 8,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 10,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 4,
        marginTop: 8,
        marginBottom: 15,
    },
    tableCell: {
        fontSize: 10,
        paddingHorizontal: 4,
        flex: 1,
        textAlign: 'center',
    },
    padding: {
        paddingVertical: 4,
    },
    table: {
        display: 'flex',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableCellTitle: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        fontSize: 8,
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    tableCellValue: {
        padding: 8,
        fontSize: 8,
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
    },
    col1: { flex: 1 },
    col2: { flex: 3 },
    col3: { flex: 2 },
    colFull: { flex: 5 },
});