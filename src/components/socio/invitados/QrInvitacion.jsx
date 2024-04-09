import React from 'react';
import QRCode from 'qrcode.react';

function QrInvitacion({ data }) {
    return (
        <div className="flex justify-between items-center">
            <QRCode value={data} size={170} renderAs="svg" />
        </div>
    );
}

export default QrInvitacion;