import React, {useState, useMemo} from 'react';
import {DatePickerIOS} from 'react-native';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Picker, DateButton, DateText} from './styles';

export default function DateInput({date, onChange}) {
    const [opened, setOpened] = useState(false);

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM 'de' yyyyy"),
        [date],
    );

    return (
        <Container>
            <DateButton onPress={() => setOpened(!opened)}>
                <Icon name="event" size={20} color="#fff" />
                <DateText>{dateFormatted}</DateText>
            </DateButton>
            {opened && (
                <Picker>
                    <DatePickerIOS
                        date={date}
                        onDateChange={onChange}
                        minimumDate={new Date()}
                        minuteInterval={60}
                        locale="pt"
                        mode="date"
                    />
                </Picker>
            )}
        </Container>
    );
}
