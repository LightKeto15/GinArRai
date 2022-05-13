

export  const getErrorText = (type: string) => {
    switch (type) {
      case 'minLength':
        return 'Password length must greater than or equal to 8 charactesr';
      case 'required':
        return 'This is required.';
        case 'match':
            return "Password doesn't match.";
    
      default:
        return '';
    }
  };