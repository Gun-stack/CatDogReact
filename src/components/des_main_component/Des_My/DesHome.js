import React, { useEffect } from 'react';
import DesStyle from './DesStyle';
import DesReview from './DesReview';
import Home from './Home';

import { useParams,useNavigate } from 'react-router-dom';




function DesHome(props) {
    const navigate = useNavigate();
    const des = props.desInfo;
    useEffect(() => {
        console.log(props);
        // navigate(0);
    }, []    );
    
   
    return (
        <div>
            {des && 
            <div>
            <DesStyle desInfo={des}/>
            <DesReview desInfo={des}/>
            </div>
            }
        </div>  
        
    );
}

export default DesHome;