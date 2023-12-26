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

  export const setReservationList = (reservationList) => ({
    type: 'SET_RESV_LIST',
    payload: reservationList,
  });

  export const PetStore = (pet) => ({
    type: 'SET_PET',
    payload: pet,
  });
  export const PetListStore = (petList) => ({
    type: 'SET_PET_LIST',
    payload: petList,
  });
  
  export const setShop = (shop) => ({
    type: 'SET_SHOP',
    payload: shop,
  });

  export const setShopList = (shopList) => ({
    type: 'SET_SHOP_LIST',
    payload: shopList,
  });

  export const setDesigner = (designer) => ({
    type: 'SET_DES',
    payload: designer,
  });

  export const setDesignerList = (designerList) => ({
    type: 'SET_DES_LIST',
    payload: designerList,
  });

  export const setReview = (review) => ({
    type: 'SET_REVIEW',
    payload: review,
  });

export const setLatitude =  (latitude) => ({
    type: 'SET_LATITUDE',
    payload: latitude,
  });

  export const setLongitude =  (longitude) => ({
    type: 'SET_LONGITUDE',
    payload: longitude,
  });

  export const reservCheck = (reservCheck) => ({
    type: 'SET_RESV_CHECK',
    payload: reservCheck,
  });
