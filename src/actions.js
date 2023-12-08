// actions.js

export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
  });
  
  export const setUserStore = (user) => ({
    type: 'SET_USER',
    payload: user,
  });

  export const setAutoLogin = (isAutoLogin) => ({
    type: 'SET_AUTO_LOGIN',
    payload: isAutoLogin,
  });
  export const loginStore = () => ({
    type: 'LOGIN',
  });
  
  export const logoutStore = () => ({
    type: 'LOGOUT',
  });

  export const setReservation = (reservation) => ({
    type: 'SET_RESERVATION',
    payload: reservation,
  });

  export const PetStore = (pet) => ({
    type: 'SET_PET',
    payload: pet,
  });
  
  export const setShop = (shop) => ({
    type: 'SET_SHOP',
    payload: shop,
  });

  export const setDesigner = (designer) => ({
    type: 'SET_DES',
    payload: designer,
  });
