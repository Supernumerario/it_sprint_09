import { useState } from "react";
import { UserAuth, SavedArticles } from './context';
import Router from './router/router';
import './assets/styles/base.css';



function App() {

  // Get what's in the Local Storage
	function local(item) { return window.localStorage.getItem(item); }
	
  // Define the user state and update with Local Storage data
  const [authData, setAuthData] = useState({
    isAuthenticated: local('isAuthenticated') === 'true' ? true : false,
		firstname: local('firstname') ? local('firstname') : "",
		lastname: local('lastname') ? local('lastname') : "",
		email: local('email') ? local('email') : "avoidEmptyDataLogin",
		password: local('password') ? local('password') : "avoidEmptyDataLogin",
		news: local('news')  === 'true' ? true : false
  });

  // Get local ids, split the string to create an object
  let localIdsNum = []  
  if (local('articlesList')) {
    let localIds = local('articlesList').split(',');
    localIdsNum = localIds.map( id => Number(id));
  }

  // Define the saved articles state and update with Local Storage data
  const [articles, setArticles] = useState({
    list: local('articlesList') ? localIdsNum : [],
  });
  
  return (
    <>
      <UserAuth.Provider value={{authData, setAuthData}}>
        <SavedArticles.Provider value={{articles, setArticles}}>
          <Router />
        </SavedArticles.Provider>   
      </UserAuth.Provider>   
    </>
  );

}

export default App;