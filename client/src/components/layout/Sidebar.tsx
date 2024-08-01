import React from 'react';
import { SidebarBody, SidebarItem } from '../ui/SidebarComponent';
import { House, Heart, LogOut, Settings, LifeBuoy } from 'lucide-react';

const Sidebar = () => {
    return (
        <SidebarBody>
            <SidebarItem icon={<House size={20} />} text="Home" active={true} />
            <SidebarItem icon={<Heart size={20} />} text="Favorites" active={false} />
            <SidebarItem icon={<LogOut size={20} />} text="Logout" active={false} />
            <hr className='my-3 border-primary/10' />
            <SidebarItem icon={<Settings size={20} />} text="Settings" active={false} />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={false} />
        </SidebarBody>
    )
}

export default Sidebar