import './RepositoryElement.css';

import React from 'react';

function RepositoryElement({RepositoryObject}) {
  return (
    <div className="RepositoryElement">
      <div className="RepositoryElementContent">
        <a 
            className="RepositoryName"
            href={RepositoryObject.html_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
        >
          {RepositoryObject.name}
        </a>
        <div className="RepositoryDescription">
          {RepositoryObject.description}
        </div>
      </div>
    </div>
  );
}

export default RepositoryElement;
