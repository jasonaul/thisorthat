import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";
import { TbArrowMergeBoth } from "react-icons/tb"


const SidebarLogo = () => {
    const router = useRouter();
    return (
        <div 
        onClick={() => router.push('/')}
        className="
        rounded-full 
        h-14 
        w-14 
        p-4
        flex
        items-center
        justify-center
        hover:bg-blue-300
        hover:bg-opacity-10
        cursor-pointer
        transition
        ">
            <TbArrowMergeBoth size={28} color="white" />
        </div>
    )
}

export default SidebarLogo