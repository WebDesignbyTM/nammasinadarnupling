import React, {useState} from 'react';

const useSearchForm = (callback) => {
  const [input, setInput] = useState({});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  }
  const handleInputChange = (event) => {
    event.persist();
    setInput(input => ({...input, [event.target.name]: event.target.value}));
  }
  return {
    handleSubmit,
    handleInputChange,
    input
  };
}
export default useSearchForm;
