import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

type Props = {
    text: string,
    onPress: ()=>void
}
export function TileButton  ( {text,onPress}:Props)
{
    return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: '#e76f51',
            borderRadius: 8,
            height: 48,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View
            style={{
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>{text}</Text>
          </View>
        </TouchableOpacity>
      )
}