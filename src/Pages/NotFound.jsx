import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='hero'>
      <div className='tex-center hero-content'>
        <Link to='/' className='btn btn-sm rounded-btn'>
          <FaHome className='mr-2' />
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
