import React from 'react';


const MyComponent = () => {
    const handleClick = (e) => {
        e.preventDefault();
        modalAlert.classList.toggle('hidden');
    };

    return (
        <div>
            <button id="submit-btn" onClick={handleClick}>Submit</button>
            <button id="cancleBtn" onClick={handleClick}>Cancel</button>
            <div id="modalAlert">Modal Alert</div>
        </div>
    );
};

export default MyComponent;
cancleBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    modalAlert.classList.toggle('hidden');
})