import {Alert} from 'react-native';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import api from '~/services/api';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
    try {
        const {email, password} = payload;
        const response = yield call(api.post, '/sessions', {
            email,
            password,
        });
        const {toke, user} = response.data;
        if (user.provider) {
            Alert.alert('Error', 'não permitido login de prestador');
            return;
        }
        api.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(signInSuccess(token, user));
    } catch (error) {
        Alert.alert('Error', 'Falha na autenticação, verifique seus dados.');
        yield put(signFailure());
    }
}

export function* signUp({payload}) {
    try {
        const {name, email, password} = payload;
        yield call(api.post, '/users', {
            name,
            email,
            password,
            provider: true,
        });
        Alert.alert('Sucesso', 'Cadastro efetuado com sucesso!');
    } catch (error) {
        Alert.alert('Error', 'Falha ao cadastrar, verifique seus dados!');
        yield put(signFailure());
    }
}

export function setToken({payload}) {
    if (!payload) return;
    const {token} = payload.auth;
    if (toke) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {}

export default all([
    takeLatest('persist/REHYDRATE', 'setToken'),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
