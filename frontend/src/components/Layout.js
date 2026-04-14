import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}

export default Layout;