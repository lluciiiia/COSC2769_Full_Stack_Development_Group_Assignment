
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import an arrow icon from react-icons

export default function ReturnNavbar() {
  return (
    <div>
      <nav className=' left-0 right-0 top-0 flex items-center bg-black p-4'>
        <Link to='/' className='flex items-center text-white'>
          <FaArrowLeft className='mr-2' /> 
          <span className='font-bold text-lg hover:underline'>Return</span>
        </Link>
      </nav>
    </div>
  );
}
