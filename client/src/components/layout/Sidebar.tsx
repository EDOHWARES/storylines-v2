import React from 'react';
import { SidebarBody, SidebarItem } from '../ui/SidebarComponent';
import { House, Heart, LogOut, Settings, LifeBuoy } from 'lucide-react';

const Sidebar = () => {
    return (
        <SidebarBody>
            <SidebarItem icon={<House />} text="Home" active="true" />
            <SidebarItem icon={<Heart />} text="Favorites" active=""  />
            <SidebarItem icon={<LogOut />} text="Logout" active=""  />
            <hr className='my-3' />
            <SidebarItem icon={<Settings />} text="Settings" active=""  />
            <SidebarItem icon={<LifeBuoy />} text="Help" active=""  />
        </SidebarBody>
    )
}

export default Sidebar