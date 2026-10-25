import React from 'react';
import {TextInput } from 'react-native';

import { styles } from './BatTextInputStyles';

interface BatTextInputProps{
  pass:string
}

export function BatTextInput(props : BatTextInputProps) {
  return (
      <TextInput
        style={styles.inputer}
        placeholder='Sua senha aparecerá aqui'
        accessibilityLabel='Senha gerada'
        editable={false}
        selectTextOnFocus
        value={props.pass}
      />
  );
}
