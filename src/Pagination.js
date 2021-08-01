import './Pagination.css';

import React from 'react';

function Pagination({ TotalPages, PageNumber, setPageNumber }) {

  if (TotalPages < 2) return null;

  const GenerateButtons = () => {

    const GenerateNumberButton = (num) => { return (
      <button 
        key={num} 
        className={"DefaultButton PageButton" + (num === PageNumber ? " CurrentPageButton" : "")}
        onClick={() => setPageNumber(num)}
      >
        { num }
      </button>
    )};

    const LeftArrow = (
      <button 
        key={"<"} 
        className={"DefaultButton ArrowButton" + (PageNumber === 1 ? " ArrowButtonDisabled" : "")}
        onClick={() => {console.log(PageNumber); setPageNumber(Math.max(PageNumber-1, 1));}}
      >
        {"<"}
      </button>
    );

    const RightArrow = (    
      <button 
        key={">"} 
        className={"DefaultButton ArrowButton" + (PageNumber === TotalPages ? " ArrowButtonDisabled" : "")}
        onClick={() => setPageNumber(Math.min(PageNumber+1, TotalPages))}
      >
        {">"}
      </button>
    );

    const LeftDots = (     
      <button 
        key={"LeftDots"} 
        className={"DefaultButton DotsButton"}
      >
        {"…"}
      </button>
    );

    const RightDots = (     
      <button 
        key={"RightDots"} 
        className={"DefaultButton DotsButton"}
      >
        {"…"}
      </button>
    );
    
    let buttons = [];

    buttons.push(LeftArrow);
    
    if (TotalPages <= 5) {
      for (let i = 1; i <= TotalPages; i++)
        buttons.push(GenerateNumberButton(i));
    } else {
      buttons.push(GenerateNumberButton(1));
      if (PageNumber <= 3) {
        buttons.push(GenerateNumberButton(2));
        buttons.push(GenerateNumberButton(3));
      } else {
        buttons.push(LeftDots);
      }
      if (PageNumber >= TotalPages - 2) {
        buttons.push(GenerateNumberButton(TotalPages-2));
        buttons.push(GenerateNumberButton(TotalPages-1));
      } else {
        if (PageNumber > 3)
          buttons.push(GenerateNumberButton(PageNumber));
        buttons.push(RightDots);
      }
      buttons.push(GenerateNumberButton(TotalPages));
    }
    
    buttons.push(RightArrow);

    return buttons;
  };
  
  return (
      <div 
        className="Pagination"
        style={{ 
          width: 25/7*(Math.min(5,TotalPages)+2)+"%",
          minWidth: 300/7*(Math.min(5,TotalPages)+2)+"px"
        }}
      >
        {GenerateButtons()}
      </div>
  );
}

export default Pagination;
