import React from 'react';
import { View, Button } from 'react-native';
import { Auth } from 'aws-amplify';

const SettingsScreens = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
      <Button onPress={()=> Auth.signOut()} title='Sair' />
    </View>
  );
};

export default SettingsScreens;
