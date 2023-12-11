// reducers.js

import { combineReducers } from 'redux';


const initialTokenState = localStorage.getItem('token') || '';

const tokenReducer = (state = initialTokenState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.payload);
      return action.payload;
    default:
      return state;
  }
};

const initialState = { isLoggedIn: false,   };
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
      console.log(state);
      return {
          ...state,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        console.log(state);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('resv');
        localStorage.removeItem('pet');
        localStorage.removeItem('shop');
        localStorage.removeItem('des');
        localStorage.removeItem('resvList');
        
        localStorage.clear();
        sessionStorage.clear();

        return {
          ...state,
          isLoggedIn: false,

        };
      // 다른 액션들 처리...
      default:
        return state;
    }
  };





const initialUserState = JSON.parse(localStorage.getItem('user')) || { id: '', email: '', name: '', num:'',nickname:'',roles:'',tel:'',kid:'',password:'',provider:'',providerId:'' };


const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

const isAutoLoginReducer = (state = false, action) => {
    switch (action.type) {
      case 'SET_AUTO_LOGIN':
        return action.payload;
      default:
        return state;
    }
  };

  const initialReservationState = JSON.parse(localStorage.getItem('resv')) || [];
  
  const  reservationReducer = (state = initialReservationState, action) => {
    switch (action.type) {
      case 'SET_RESERVATION':
      // 새로운 예약 정보의 num이 이미 존재하는지 확인
      const isNumExist = state.some(reservation => reservation.num === action.payload.num);
      // 존재하지 않으면 추가
      return isNumExist ? state : action.payload ;

      default:
        return state;
    }
  };

  const initialPetState = JSON.parse(localStorage.getItem('pet')) || [];
  const petReducer = (state = initialPetState, action) => {
    switch (action.type) {
      case 'SET_PET':
        return action.payload;
      default:
        return state;
    }
  }

const initialShopState = 
JSON.parse(localStorage.getItem('shop')) || [  ];

const shopReducer = (state = initialShopState, action) => {
  switch (action.type) {
    case 'SET_SHOP':
      return action.payload;
    default:
      return state;
  }
}

const initialDesignerState = JSON.parse(localStorage.getItem('des')) || [];
const designerReducer = (state = initialDesignerState, action) => {
  switch (action.type) {
    case 'SET_DES':
      return action.payload;
    default:
      return state;
  }
}

const initialResvListState = JSON.parse(localStorage.getItem('resvList')) || [];
const resvListReducer = (state = initialResvListState, action) => {
  switch (action.type) {
    case 'SET_RESV_LIST':
      return action.payload;
    default:
      return state;
  }
}

const initialReviewState = JSON.parse(localStorage.getItem('review')) || [];
const reviewReducer = (state = initialReviewState, action) => {
  switch (action.type) {
    case 'SET_REVIEW':
      return action.payload;
    default:
      return state;
  }
}





const rootReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    isAutoLogin: isAutoLoginReducer,
    auth: authReducer,
    resv: reservationReducer,
    pet: petReducer,
    shop: shopReducer,
    des: designerReducer,
    resvList : resvListReducer,
    review : reviewReducer,

});

export default rootReducer;
