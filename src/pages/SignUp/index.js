import React from 'react';
import {Image} from 'react-native';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignUp({navigation}) {
    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon="person-outline"
                        placeholder="Nome completo"
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitaliza="none"
                        placeholder="Digite seu e-mail"
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                    />
                    <SubmitButton onPress={() => {}}>Cadastrar</SubmitButton>
                </Form>
                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já tenho login</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
