import React, { useState } from 'react';
import { Input } from 'antd';

import './customComponent.scss';

const InputOtp = (props: any) => {
    const { setInput } = props;

    const [inputOtp, setInputOtp] = useState ({digit1: '', digit2: '', digit3: '', digit4: ''});
    var prevSpace = 0;
    
    const setFocusToNext = (event: any) => {
        const firstDigit = event.target.className.includes("1");
        const lastDigit = event.target.className.includes("4");

        (event.keyCode === 8 && !firstDigit && prevSpace ++);
        
        if(prevSpace === 2) {
            prevSpace = 0;
            event.target.previousSibling.focus();
        }

        (event.target.value.length === 1 && !lastDigit && event.target.nextSibling.focus());
        const otp = `${inputOtp.digit1}${inputOtp.digit2}${inputOtp.digit3}${inputOtp.digit4}`;
        setInput(otp);
    };

    return (
        <>
            <Input
                className="custom-otp-input-digits custom-input digit1"
                disabled={false}
                maxLength={1}
                onChange={(event: any) => setInputOtp({...inputOtp, digit1: event.target.value})}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit1}
            />
            <Input
                className="custom-otp-input-digits custom-input"
                disabled={(inputOtp.digit1 === '')? true : false}
                maxLength={1}
                onChange={(event: any) => setInputOtp({...inputOtp, digit2: event.target.value})}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit2}
            />
            <Input
                className="custom-otp-input-digits custom-input"
                disabled={(inputOtp.digit2 === '')? true : false}
                maxLength={1}
                onChange={(event: any) => setInputOtp({...inputOtp, digit3: event.target.value})}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit3}
            />
            <Input
                className="custom-otp-input-digits custom-input  digit4"
                disabled={(inputOtp.digit3 === '')? true : false}
                maxLength={1}
                onChange={(event: any) => setInputOtp({...inputOtp, digit4: event.target.value})}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit4}
            />
        </>
    );
};

export default InputOtp;
