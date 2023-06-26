import Sidebar from "./layout/Sidebar"
import FollowBar from "./layout/FollowBar";


interface LayoutProps {
    children: React.ReactNode;
}

//Children is a prop (short for property), and is passed from a parent component to a child component. Props are passed down as attributes when the child component is rendered.

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div className="
                    col-span-3
                    lg:col-span-2 
                    border-x-[1px]
                    border-neutral-800"
                    >
                        {children}
                    </div>
                    <FollowBar />
                </div>
            </div>
        </div>
    )
}

export default Layout;


// Serves as a layout wrapper for other components. A layout wrapper is a high-order component (HOC) that warps other components to provide a consistent layout or structure to multiple pages in an application. 
// This allows you to define a common layout for different pages, reducing code duplication and providing a unified visual appearance and functionality across the application.