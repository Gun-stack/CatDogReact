import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import UserJoin from './components/login_Join/UserJoin';
import UserLogin from './components/login_Join/UserLogin';
import DesLogin from './components/login_Join/DesLogin';
import DesJoin from './components/login_Join/DesJoin';
import Main from './components/user_main_components/Main';


import Around from './components/Around/Around';
import UserMy from './components/user_main_components/User_My/UserMy';
import FindId from './components/login_Join/FindId';
import FindPassword from './components/login_Join/FindPassword';
import UserGalleryView from './components/gallery/UserGalleryView';
import DesGalleryView from './components/gallery/DesGalleryView';
import GalleryList from './components/gallery/GalleryList';

import ShopMain from './components/shop/ShopMain';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './persist-store';
import Error404 from './components/error/Error404';
import { useState } from 'react';
import Loding from './components/tools/Loding';
import Oauth from './components/Oauth';
import DesMy from './components/des_main_component/Des_My/DesMy';
import ShopReg from './components/des_main_component/Des_My/ShopReg';
import DistanceCalculator from './components/tools/DistanceCalculator';

export const persistor = persistStore(store);

function App() {

  return (
  <>
 
    <Provider store={store}>
      <PersistGate loading={<Loding/>} persistor={persistor}>

    <Routes>
      {/** Index (리액트 서버 틀자마자 바로 나오는것)*/}
      <Route path='/' element={<Index/>}/>

      {/** User관련 라우터 */}
      <Route path='/main' element={<Main/>}/>
      <Route path='/userjoin' element={<UserJoin/>}/>
      <Route path='/userlogin/*' element={<UserLogin/>}/>
      <Route path="/oauth/redirect/:token" element={<Oauth/>} />
      <Route path='/findid' element={<FindId/>}/>
      <Route path='/findpassword' element={<FindPassword/>}/>
      
      {/* usermy /petreg, /usermodi, /reservation */}
      <Route path='/usermy/*' element={<UserMy/>}/>

      <Route path='/around/*' element={<Around/>}/>

      {/** Des 관련 라우터 */}
      <Route path='/deslogin' element={<DesLogin/>}/>
      <Route path='/deslogin' element={<DesLogin/>}/>
      <Route path='/desjoin' element={<DesJoin/>}/>

      {/* desmy */}
      <Route path='/desmy/*' element={<DesMy/>}/>
      
      {/* 갤러리 관련 라우터 */}
      
      <Route path='/gallery/*' element={<GalleryList/>}/>
      
      {/* 예약관련 라우터 */} 
      
      <Route path='/shop/:shopnum/*' element={<ShopMain/>}/>
      <Route path='/shopreg/:desnum' element={<ShopReg/>}/>
      
      <Route path='/*' element={<Error404/>}/>

      </Routes>

      </PersistGate>
    </Provider>

  </>
  );
}

export default App;
