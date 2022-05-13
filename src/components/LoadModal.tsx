import React from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';

export function LoadModel({visible}: {visible: boolean}) {
  return (
    <Modal onRequestClose={() => null} visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(50, 51, 51,.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{borderRadius: 5, backgroundColor: 'white', padding: 25}}>
          <ActivityIndicator size="large" color={'#e76f51'} />
          <Text style={{fontSize: 25, fontWeight: '500'}}>Loading</Text>
        </View>
      </View>
    </Modal>
  );
}
