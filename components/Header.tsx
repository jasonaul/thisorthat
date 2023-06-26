import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";


//The useCallback hook is a hook provided by React that is used to store a function. It helps optimize the performance of functional components by preventing unnecessary re-creation of the function on each render.


interface HeaderProps {
    label: string;
    showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({label, showBackArrow}) => {
    const router = useRouter();

    const handleBack = useCallback(() => {
        router.back()
    }, [router]);

    return (
        <div className="border-b-[1px] border-neutral-800 p-5">
            <div className="flex flex-row items-center gap-2">
                {
                    showBackArrow && (
                        <BiArrowBack
                            onClick={handleBack}
                            color="white"
                            size={20}
                            className="
                                cursor-pointer
                                hover:opacity-70
                                transition
                            "/>
                    )
                }
                <h1 className="text-white text-x1 font-semibold">{label}</h1>
            </div>
        </div>
    )
}

export default Header