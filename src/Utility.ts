
export  const getErrorText = (type: string) => {
  //console.log(type)
    switch (type) {
      case 'minLength':
        return 'Password should contain at least 8 character';
      case 'required':
        return 'This is required.';
        case 'match':
            return "Password doesn't match.";
    
      default:
        return '';
    }
  };