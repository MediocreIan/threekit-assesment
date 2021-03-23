import React, {useState, useEffect} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect'


const Display = ({savedData}) => {
    const [data, setData] = useState(savedData);
    console.log(savedData)

    useDeepCompareEffect(() => {setData(savedData)}, [savedData]);
    return (
        <div>
            {Object.keys(savedData)}
            tgest
        </div>
    );
}

export default Display;
