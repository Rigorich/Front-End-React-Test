import './MainPage.css';

import React, { useState, useEffect } from 'react';
import AccountPage from './AccountPage';
import InitialPage from './InitialPage';
import NotFoundPage from './NotFoundPage';

function MainPage() {
  const [CurrentUserData, setCurrentUserData] = useState();

  useEffect(() => {
    if (CurrentUserData)
      document.title = CurrentUserData.login + " | GitHub";
    else  
      document.title = "Rigorich React Test";
  }, [CurrentUserData]);

  return (
    <div className="MainPage">
      <header className="Header">
        <div className="MainLogo"> </div>
        <input className="SearchUserForm" 
          type="text" 
          onKeyPress={
            (event) => {
              if (event.key === 'Enter')
              {
                const q = event.target.value;
                if (!q) {
                  setCurrentUserData(undefined);
                  return;
                }
                fetch(
                  `https://api.github.com/users/${q}`)
                  .then((response) => {
                    if (response.status === 404) return null;
                    if (response.status === 403) return null;
                    return response.json();
                  })
                  .then((data) => {
                    setCurrentUserData(data);
                  });
              }
            }
          }
        />
      </header>
      <div className="PageContent">
          {CurrentUserData ?
          <AccountPage UserData={CurrentUserData}></AccountPage> :
          (CurrentUserData === null ?
            <NotFoundPage></NotFoundPage> :
            <InitialPage></InitialPage>)}
      </div>
    </div>
  );
}

export default MainPage;
