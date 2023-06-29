import { BsBellFill, BsHouseFill} from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut} from 'react-icons/bi'
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarThisorThatButton from './SidebarThisorThatButton'
import useCurrentUser from '@/hooks/useCurrentUser';

const Sidebar = () => {
    const {data: currentUser} = useCurrentUser();
const items = [
    {
        label: 'Home',
        href: '/',
        icon: BsHouseFill
    },
    {
        label: 'Notifications',
        href: '/notifications',
        icon: BsBellFill,
        auth: true
    },
    {
        label: 'Profiile',
        href: '/users/123',
        icon: FaUser,
        auth: true 
    }
];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
                <SidebarLogo />
                {items.map((item) => (
                    <SidebarItem 
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        auth={item.auth}
                    />
                ))}
                {currentUser && (
                    <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
                )}
                
                <SidebarThisorThatButton />
            </div>
        </div>
    </div>
  );
}

export default Sidebar