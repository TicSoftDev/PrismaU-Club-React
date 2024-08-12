import QRCode from 'qrcode.react';
import React from 'react';

function QrInvitacion({ data }) {

    return (
        <div className="flex justify-between items-center">
            <QRCode value={data} size={170} renderAs="svg" />
        </div>
    );
}

export default QrInvitacion;