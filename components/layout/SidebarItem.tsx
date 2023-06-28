import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { signOut } from 'next-auth/react';

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  const router = useRouter();
  const handleClick = useCallback(
    async () => {
      if (onClick) {
        onClick();
      }

      if (href) {
        router.push(href);
      }

      if (label === 'Logout') {
        await signOut(); // Call the signOut function from NextAuth
        router.push('/'); // Redirect to the home page after logout
      }
    },
    [router, onClick, href, label]
  );
  
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div
        className="
          relative
          rounded-full
          h-14
          w-14
          flex
          items-center
          justify-center
          p-4
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
          lg:hidden
        "
      >
        <Icon size={28} color="white" />
        {/* Content inside the first div */}
      </div>
      <div
        className="
          relative
          hidden
          lg:flex
          items-center
          gap-4
          p-4
          rounded-full
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        "
      >
        <div> {/* Add a non-self-closing div tag */}
          <Icon size={24} color="white" />
         
        </div>
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;