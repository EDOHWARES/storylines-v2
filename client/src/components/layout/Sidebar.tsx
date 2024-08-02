import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarBody, SidebarItem } from '../ui/SidebarComponent';
import { House, Heart, LogOut, Settings, LifeBuoy } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    return (
        <SidebarBody>
            <Link to="/home">
                <SidebarItem icon={<House size={20} />} text="Home" active={location.pathname === '/home'} />
            </Link>
            <Link to="/favorites">
                <SidebarItem icon={<Heart size={20} />} text="Favorites" active={location.pathname === '/favorites'} />
            </Link>
            <SidebarItem icon={<LogOut size={20} />} text="Logout" active={false} />
            <hr className='my-3 border-primary/10' />
            <Link to="/settings">
                <SidebarItem icon={<Settings size={20} />} text="Settings" active={location.pathname === '/settings'} />
            </Link>
            <Link to="/help">
                <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={location.pathname === '/help'} />
            </Link>
        </SidebarBody>
    )
}

export default Sidebar;