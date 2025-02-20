export const initialState = {
  username: '',
  firstName: '',
  token: '',
  isOTPVerified: false,
  isLoading: false,
  error: null,
};

export const userReducer = (state, action) => {
  const {username, firstName, error, token} = action;
  switch (action.type) {
    case 'LOGIN_START':
      return {...state, isLoading: true, error: null};
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        username: username,
        firstName: firstName,
        token: token,
      };
    case 'LOGIN_FAILED':
      return {...state, error: error, isLoading: false};
    case 'LOGOUT':
      return {
        ...state,
        username: '',
        firstName: '',
        error: null,
        isOTPVerified: false,
        isLoading: false,
        token: '',
      };
    case 'OTO_VERIFIED':
      return {
        ...state,
        isOTPVerified: true,
      };
    default:
      return state;
  }
};
