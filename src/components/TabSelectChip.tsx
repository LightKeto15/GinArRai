import {Box} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

interface Props {
  title: string;
  isSelect: boolean;
  onPress: () => void;
}

function TabSelectChip(props: Props) {
  return (
    <Box marginX="3%" flex={1}>
      <TouchableOpacity onPress={props.onPress}>
        <Box
          h="38px"
          _text={{
            fontSize: 18,
            color: props.isSelect ? 'white' : '#1c1c1ead',
            textAlign: 'center',
          }}
          borderWidth={3}
          borderRadius={15}
          borderColor={props.isSelect ? 'primary.100' : '#1c1c1ead'}
          bg={props.isSelect ? '#f4a261' : 'white'}>
          {props.title}
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

export default TabSelectChip;
