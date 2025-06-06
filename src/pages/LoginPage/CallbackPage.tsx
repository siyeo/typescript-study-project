// pages/CallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/'); // 바로 홈으로
  }, [navigate]);

  return null;
};

export default CallbackPage;