import { HiOutlineShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AutoScroll } from '../utils';
import { BiLogIn } from 'react-icons/bi';

interface NavBarProps {
    cartCount?: number;
}

const NavBar: React.FC<NavBarProps> = props => {

    const renderCartIncicator = (): JSX.Element | null => {
        if(props.cartCount && props.cartCount !== 0) {
            return (
                <span className="badge border-stone-500 badge-sm indicator-item">{props.cartCount}</span>
            )
        } else return null;
    }

    const hideDropdown = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.currentTarget.blur();
    }

    return (
        <div className="navbar z-10 sticky top-0 glass bg-gray-100 shadow-lg">
            <AutoScroll/>
            <div className="navbar-start">
                {/* mobile */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu z-10 menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-30">
                        <li><Link to='/' onClick={hideDropdown}>Strona Główna</Link></li>
                        <li><Link to='/sklep' onClick={hideDropdown}>Sklep</Link></li>
                        {/* <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li> */}
                        <li><Link to='/o_nas'>O nas</Link></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-2xl">
                    <img 
                        src="/images/icon_logo.png" 
                        alt="Strona Główna"
                        className="w-6 h-6"
                    />
                    GiT
                </Link>
            </div>
            {/* desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl justify-around">
                    <li><Link to='/' onClick={hideDropdown}>Strona Główna</Link></li>
                    <li><Link to='/sklep' onClick={hideDropdown}>Sklep</Link></li>
                    {/* <li tabIndex={0}>
                        <details>
                        <summary>Sklep</summary>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </details>
                    </li> */}
                    <li><Link to='/o_nas'>O nas</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/logowanie'>
                    <button className='btn'>
                        <BiLogIn className="w-5 h-5"/>
                        <span className='hidden xl:lg:md:block'>ZALOGUJ SIĘ</span>
                    </button>
                </Link>
                <Link to='/koszyk' className="btn">
                    <div className="indicator">
                        <HiOutlineShoppingCart className="w-5 h-5"/>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg> */}
                        {renderCartIncicator()}
                    </div>
                </Link>
            </div>


            {/* <div className="dropdown dropdown-end navbar-end w-10">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="badge badge-sm indicator-item">8</span>
                    </div>
                </label>
                <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow navbar-end">
                    <div className="card-body">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default NavBar;