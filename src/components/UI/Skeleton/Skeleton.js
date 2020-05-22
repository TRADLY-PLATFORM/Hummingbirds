import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const skeleton = ( props ) => {
     return (<SkeletonTheme color="#c0ecdf" highlightColor="#444">             
                    <Skeleton count={(props.count) ? props.count : 1} />              
               </SkeletonTheme>
            );
}



export default React.memo(skeleton);