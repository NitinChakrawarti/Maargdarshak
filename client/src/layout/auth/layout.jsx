import { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/authsidebar";
import Header from "../../components/header";
import BottomNav from "../../components/bottomNav";
import { usePWAMobile } from "../../hooks/usePWA";
import PageWrapper from "../../components/pagewrapper";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isPWAMobile = usePWAMobile();

  // Handle window resize to manage sidebar state
  useEffect(() => {
    const handleResize = () => {
      // On larger screens, keep sidebar open by default
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSidebarCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    console.log('auth layout mounted');

  }, [isPWAMobile]);

  return (
    <div className="max-w-8xl relative h-screen bg-bg flex">
      {/* Sidebar */}


      {
        !isPWAMobile &&
        <Sidebar
          isOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onCollapse={handleSidebarCollapse}
        />
      }

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed
          ? 'md:ml-16'
          : 'md:ml-52'
          }`}
      >
        {
          !isPWAMobile &&
          <Header toggleSidebar={toggleSidebar} />
        }
        <PageWrapper>
          <main className={`flex-1 no-scroll  ${isPWAMobile ? "mb-20" : ""}`}>
            <Outlet />
          </main>
        </PageWrapper>
        {isPWAMobile && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;

