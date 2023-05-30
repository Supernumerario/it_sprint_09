import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Feed, Articles, SignIn, LogIn, Error404 } from '../pages';
import { useContext } from 'react';
import { UserAuth } from '../context/UserAuth/UserAuth';
import GuardedRoute from './guardedRoute';



function Router() {

  const { authData } = useContext(UserAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={process.env.PUBLIC_URL}>

          <Route path="" element={<Home />} />
          <Route exact path="/" element={<GuardedRoute auth={authData.isAuthenticated}/>}>
            <Route exact path="feed/" element={<Feed />} />
          </Route>
          <Route exact path="/" element={<GuardedRoute auth={authData.isAuthenticated}/>}>
            <Route exact path="articles" element={<Articles />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<LogIn />} />
          <Route path="*" element={<Error404 />} />

        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default Router;