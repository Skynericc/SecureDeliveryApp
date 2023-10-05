import { useNavigate } from 'react-router-dom';

function Header({onLogout}) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
      onLogout();
      navigate('/login'); 
    };
    return (
        <div className='header'>
        <table width='100%'>
          <tr>
            <td align='left'>
              <span className='header-span'>Welcome to Jumia France</span>
            </td>
            <td align='right' width='100px'>
              <button className='header-button'onClick={handleLogoutClick}>Logout</button>
            </td>
            <td align='right' width='70px'>
              <button className='header-button'>Help</button>
            </td>
          </tr>
        </table>
      </div>
    );
}

export default Header;