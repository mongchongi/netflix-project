import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import './Error.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Error = ({ message = '정보를 가져오는 중 오류가 발생했습니다.' }) => {
  const [showError, setShowError] = useState(true);

  const navigate = useNavigate();

  const handleClose = () => {
    if (message === '검색 결과가 없습니다.') {
      navigate(-1);
    }

    setShowError(false);
  };

  return (
    <>
      {showError && (
        <div className='error'>
          <button className='error__close-button' onClick={handleClose}>
            <CloseIcon sx={{ fontSize: '40px' }} />
          </button>
          <div className='error__content'>
            <ErrorOutlineIcon sx={{ fontSize: '80px', mb: '10px' }} />
            <div>{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
