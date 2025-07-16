import { useOutletContext } from 'react-router-dom';

/**
 * Custom hook for accessing dashboard header context
 * (setHeaderData, headerData, ...)
 */
const useHeaderData = () => {
  return useOutletContext();
};

export default useHeaderData