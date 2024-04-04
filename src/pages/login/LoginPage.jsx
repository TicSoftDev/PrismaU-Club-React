import React from 'react';
import FormLogin from '../../components/login/FormLogin';
import useLogin from '../../hooks/useLogin';

function LoginPage() {

    const { loading, usuario, visible, toggleVisible, handleChange, handleSubmit } = useLogin();

    return (
        <>
            <FormLogin loading={loading} usuario={usuario} handleChange={handleChange}
                visible={visible} toggleVisible={toggleVisible} handleSubmit={handleSubmit} />
        </>
    );
}

export default LoginPage;