import React, { useState } from 'react';
import { Button } from 'antd';
import { TAndCPopup } from './index';

const ViewTerms = (props: any) => {
    const { displayType, content } = props;
    const [viewTerms, setViewTerms] = useState(false);

    return(
        <>
            <Button type="link" onClick={() => setViewTerms(true) }>
                {content}
            </Button>
            {viewTerms && <TAndCPopup initialDisplayType={displayType} viewTAndC={viewTerms} />}
        </>
    );
};

export default ViewTerms;
