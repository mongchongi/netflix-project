import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import './Error.css';
import { useState } from 'react';

const Error = () => {
  const [showError, setShowError] = useState(true);

  return (
    <>
      {showError && (
        <div className='error'>
          <button
            className='error__close-button'
            onClick={() => {
              setShowError(false);
            }}
          >
            <CloseIcon sx={{ fontSize: '40px' }} />
          </button>
          <div className='error__content'>
            <ErrorOutlineIcon sx={{ fontSize: '80px', mb: '10px' }} />
            <div>정보를 가져오는 중 오류가 발생했습니다.</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
