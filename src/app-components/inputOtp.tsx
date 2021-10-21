import React, { useState } from 'react';
import { Input } from 'antd';

const InputOtp = (props: any) => {
    const { setInput } = props;

    const [inputOtp, setInputOtp] = useState({ digit1: '', digit2: '', digit3: '', digit4: '' });
    var prevSpace = 0;

    const setFocusToNext = (event: any) => {
        const firstDigit = event.target.className.includes("1");
        const lastDigit = event.target.className.includes("4");

        (event.keyCode === 8 && !firstDigit && prevSpace++);

        if (prevSpace >= 1) {
            prevSpace = 0;
            event.target.previousSibling.focus();
        }

        (event.target.value.length === 1 && !lastDigit && event.target.nextSibling.focus());
        const otp = `${inputOtp.digit1}${inputOtp.digit2}${inputOtp.digit3}${inputOtp.digit4}`;
        setInput(otp);
    };

    const inputStyle = {
        width: "2.5em",
        height: "2.5em",
        margin: "0.5em",
    };

    return (
        <>
            <Input
                className="custom-input digit1"
                disabled={false}
                maxLength={1}
                onChange={(event: any) => setInputOtp({ ...inputOtp, digit1: event.target.value })}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit1}
                style={inputStyle}
            />
            <Input
                className="custom-input digit2"
                disabled={(inputOtp.digit1 === '')}
                maxLength={1}
                onChange={(event: any) => setInputOtp({ ...inputOtp, digit2: event.target.value })}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit2}
                style={inputStyle}
            />
            <Input
                className="custom-input digit3"
                disabled={(inputOtp.digit2 === '')}
                maxLength={1}
                onChange={(event: any) => setInputOtp({ ...inputOtp, digit3: event.target.value })}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit3}
                style={inputStyle}
            />
            <Input
                className="custom-input digit4"
                disabled={(inputOtp.digit3 === '')}
                maxLength={1}
                onChange={(event: any) => setInputOtp({ ...inputOtp, digit4: event.target.value })}
                onKeyUp={setFocusToNext}
                type="text"
                value={inputOtp.digit4}
                style={inputStyle}
            />
        </>
    );
};

export default InputOtp;
