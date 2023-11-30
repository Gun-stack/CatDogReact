import DesHeader from './DesHeader';
import UserHeader from './UserHeader';

function Header() {

    {/* user 인지 des 인지 구분해서 화면 보여주기 */}
    const isUser = true;

    return (
        <>
        {isUser ? <UserHeader/> : <DesHeader/>}
        </>
    );
}

export default Header;
