import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

export default function SearchBar(props) {
    const { searchFunction, userSelectionFunction, userSuggestionList } = props;
    const [searchInput, setSearchInput] = useState("");
    const [userSuggestions, setUserSuggestions] = useState(userSuggestionList);
    
    useEffect(() => {
        setUserSuggestions(userSuggestionList);
    }, [userSuggestionList])

    function handleChange(event) {
        const newValue = event.target.value;
        if(newValue.length > 0 || (newValue.length < searchInput.length && newValue.length !== 0)) {
            searchFunction(newValue);
        }
        if(newValue.length < searchInput.length && newValue.length === 0) {
            setUserSuggestions([]);
        }
        setSearchInput(newValue);
    }

    function selectUserSuggestion(event) {
        const userSelection = event.target.id;
        setSearchInput("");
        setUserSuggestions([]);
        userSelectionFunction(userSelection);
    }

    return (
        <div>
            <input onChange={handleChange} type="text" value={searchInput} placeholder='Search username' />
            <ul>
                {userSuggestions.map(userSuggestion => {
                    return <li key={userSuggestion.id} id={userSuggestion.id} onClick={selectUserSuggestion}>{userSuggestion.username}</li>
                })}
            </ul>
        </div>
    )
}

SearchBar.propTypes = {
    searchFunction: PropTypes.func,
    userSelectionFunction: PropTypes.func,
    userSuggestionList: PropTypes.array,
}