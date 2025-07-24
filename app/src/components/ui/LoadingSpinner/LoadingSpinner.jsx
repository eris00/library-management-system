import CircularProgress from '@mui/material/CircularProgress';
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <CircularProgress />
    </div>
  )
}

export default LoadingSpinner