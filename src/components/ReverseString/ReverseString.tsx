import { ChangeEvent, useState } from 'react';


export default function ReverseString() {
    const [sourceString, setSourceString] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        setSourceString(newValue);
    }

    function getReverseString() {
        return sourceString.split('').reverse().join('');
    }

    return (
        <>
            <h2>Reverse string</h2>
            <label>
                <input
                    type="text"
                    value={sourceString}
                    data-testid="sourceString"
                    onChange={handleChange}
                />
            </label>&nbsp;
            <label>
                <input
                    type="text"
                    value={getReverseString()}
                    data-testid="reverseString"
                    readOnly={true}
                />
            </label>
        </>
    )
}
