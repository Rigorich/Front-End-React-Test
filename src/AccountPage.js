import './AccountPage.css';

import React, { useState, useEffect } from 'react';
import RepositoryElement from './RepositoryElement';
import Pagination from './Pagination';

function AccountPage({ UserData }) {
  
  const [Repositories, setRepositories] = useState(undefined);
  const [PageNumber, setPageNumber] = useState(1);
  const RepsPerPage = 4;

  const FetchAllRepositories = () => {

    let DownloadableRepos = [];

    const rep_count = +UserData.public_repos;

    const UrlOfPageN = (num) => 
      UserData.repos_url+"?per_page=100&page="+num;

    const LoadPageAndCheckForAnotherOne = (num) => {
      if (num > Math.ceil(rep_count/100)) {
        setRepositories(DownloadableRepos);
        return;
      };
      fetch(
        UrlOfPageN(num))
        .then((response) => {
          if (response.status === 404) return null;
          return response.json();
        })
        .then((data) => {
          if (!data) {
            setRepositories(null);
            return;
          }
          DownloadableRepos = DownloadableRepos.concat(data);
          //setRepositories(DownloadableRepos);
          console.log(DownloadableRepos);
          LoadPageAndCheckForAnotherOne(num + 1)
        });
    };

    LoadPageAndCheckForAnotherOne(1);
    setPageNumber(1);
  };

  useEffect(() => {
    setRepositories(null);
    FetchAllRepositories();
  }, [UserData]);

  const GenerateRepositoryElements = (page, count) => {
    const left_bound = (page - 1) * count;
    const reps = Repositories.slice(left_bound, left_bound + count);
    const rep_elems = reps.map((rep) => 
      <RepositoryElement 
        RepositoryObject={rep}
        key={rep.full_name}
      >
      </RepositoryElement>
    );
    return rep_elems;
  };


  return (
      <div className="AccountPage">
        <div className="AccountProfileInfo">
          <div 
            className="AccountAvatar"
            style={{ 
              backgroundImage: `url("${UserData.avatar_url}")` 
            }}
          >
          </div>
          <div className="AccountName">
            {UserData.name}
          </div>
          <a 
            className="AccountNickname"
            href={UserData.html_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {UserData.login}
          </a>
          <div className="AccountFollows">
            
          </div>
        </div>
        
        <div className="RepositoriesAndPagination">
          <div className="RepositoriesLabel">Repositories: {UserData.public_repos}</div>
          <div className="Repositories">
            {
            Repositories ? ( 
              Repositories.length ?
              GenerateRepositoryElements(PageNumber, RepsPerPage) :
              <div className="UserNoRepositories"></div>
            ) : 
            <div className="AwaitingRepositories"></div>
            }
          </div>
          { Repositories && Repositories.length ?
            <Pagination 
              TotalPages={Math.ceil(Repositories.length/RepsPerPage)}
              PageNumber={PageNumber}
              setPageNumber={setPageNumber}
            >
            </Pagination> 
          : null }
        </div>
      </div>
  );
}

export default AccountPage;
