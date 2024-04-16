import {useState} from 'react'
import {PropTypes} from 'prop-types'

export default function InputDisplay(props) {
    const {inputType = 'input', initialValue = '', placeHolder = '', saveMethod = ''} = props;
    const [val, setVal] = useState(initialValue);

    function handleChange(event) {
        setVal(event.target.value);
    }

    function setChange() {
        saveMethod(val);
    }

    switch (inputType) {
        case 'input':
            return(
                <input type='text' placeholder={placeHolder} value={val} onChange={handleChange} onBlur={setChange}/>
            );
        case 'textArea':
            return (
                <textarea type='text' placeholder={placeHolder} value={val} onChange={handleChange} onBlur={setChange} />
            );
            
        default:
            return(
                <h1>{val}</h1>
            )
    }
}

InputDisplay.propTypes = {
    inputType: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    saveMethod: PropTypes.func.isRequired,
}