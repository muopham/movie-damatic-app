import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const Handle = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(Handle);
  }, [value, delay]);

  return debounceValue;
}

useDebounce.propTypes = {
  value: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

export default useDebounce;
