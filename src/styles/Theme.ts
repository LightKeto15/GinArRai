import {extendTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#e76f51',
      600: '#e76f51',
    },
  },
  components: {
    Button: {
      defaultProps: {
        bg: '#e76f51',
        
      },
    },
    Input :{
        defaultProps:{
            variant:"outline",
            fontSize: 18,
        
        }
    },
  },
});
