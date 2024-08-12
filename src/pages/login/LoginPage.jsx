import React from 'react';
import ContainerLogin from '../../components/login/ContainerLogin';
import FormLogin from '../../components/login/FormLogin';
import LogoLogin from '../../components/login/LogoLogin';
import useLogin from '../../hooks/useLogin';

function LoginPage() {

    const { loading, usuario, visible, toggleVisible, handleChange, handleSubmit } = useLogin();

    return (
        <ContainerLogin>
            <LogoLogin />
            <FormLogin loading={loading} usuario={usuario} handleChange={handleChange}
                visible={visible} toggleVisible={toggleVisible} handleSubmit={handleSubmit} />
        </ContainerLogin>
    );
}

export default LoginPage;