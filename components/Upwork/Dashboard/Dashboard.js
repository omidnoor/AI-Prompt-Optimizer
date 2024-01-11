import React, { memo, useCallback, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import Home from "./Home";
import Analysis from "./Analysis";

const Dashboard = ({ handleMessageSubmit }) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const cag = useRef(null);

  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const btnRef4 = useRef(null);
  const btnRef5 = useRef(null);
  const btnRef6 = useRef(null);

  const items = [
    { label: "Add New", icon: "pi pi-fw pi-plus" },
    { label: "Remove", icon: "pi pi-fw pi-minus" },
  ];

  const DashboardContent = useCallback(() => <Home />);
  const JobAnalysisContent = useCallback(
    () => <Analysis handleMessageSubmit={handleMessageSubmit} />,
    [handleMessageSubmit]
  );

  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DashboardContent />;
      case "jobAnalysis":
        return <JobAnalysisContent />;
      default:
        return <DashboardContent />;
    }
  };

  const getMenuItemClass = (itemName) => {
    return `sidebar-item ${activeComponent === itemName ? "active" : ""}`;
  };

  return (
    <div className="min-h-screen flex relative lg:static surface-ground">
      <div
        id="app-sidebar"
        className="surface-section h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
        style={{ width: "280px" }}
      >
        <div className="flex flex-column h-full">
          <div
            className="flex align-items-center px-5 flex-shrink-0"
            style={{ height: "60px" }}
          >
            {/* <img
              src="/demo/images/blocks/logos/hyper-700.svg"
              alt="hyper-700"
              height={30}
            /> */}
          </div>
          <div className="overflow-y-auto">
            <ul className="list-none p-3 m-0">
              <li>
                <ul className="list-none p-0 m-0 overflow-hidden">
                  <li
                    onClick={() => setActiveComponent("dashboard")}
                    className={getMenuItemClass("dashboard")}
                  >
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-home mr-2"></i>
                      <span className="font-medium">Dashboard</span>
                      <Ripple />
                    </a>
                  </li>
                  <li
                    onClick={() => setActiveComponent("jobAnalysis")}
                    className={getMenuItemClass("jobAnalysis")}
                  >
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-fw pi-chart-bar mr-2"></i>
                      <span className="font-medium">Job Analysis</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-fw pi-envelope mr-2"></i>
                      <span className="font-medium">
                        Cover Letter Assistant
                      </span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-fw pi-book mr-2"></i>
                      <span className="font-medium">Learning Resources</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-fw pi-user mr-2"></i>
                      <span className="font-medium">User Profile</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-cog mr-2"></i>
                      <span className="font-medium">Settings</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <i className="pi pi-fw pi-question-circle mr-2"></i>
                      <span className="font-medium">Help & Support</span>
                      <Ripple />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-none p-3 m-0">
              <li></li>
            </ul>
          </div>
          <div className="mt-auto mx-3">
            <hr className="mb-3 border-top-1 surface-border" />
            <a className="p-ripple my-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
              <span className="font-medium">Omid N.</span>
              <Ripple />
            </a>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-column relative flex-auto">
        <div
          className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static"
          style={{ height: "60px" }}
        >
          <div className="flex">
            <StyleClass
              nodeRef={btnRef5}
              selector="#app-sidebar"
              enterClassName="hidden"
              enterActiveClassName="fadeinleft"
              leaveToClassName="hidden"
              leaveActiveClassName="fadeoutleft"
              hideOnOutsideClick
            >
              <a
                ref={btnRef5}
                className="p-ripple cursor-pointer block lg:hidden text-700 mr-3"
              >
                <i className="pi pi-bars text-4xl"></i>
                <Ripple />
              </a>
            </StyleClass>
            {/* <span className="p-input-icon-left">
              <i className="pi pi-search"></i>
              <InputText className="border-none" placeholder="Search" />
            </span> */}
          </div>
          <StyleClass
            nodeRef={btnRef6}
            selector="@next"
            enterClassName="hidden"
            enterActiveClassName="fadein"
            leaveToClassName="hidden"
            leaveActiveClassName="fadeout"
            hideOnOutsideClick
          >
            <a
              ref={btnRef6}
              className="p-ripple cursor-pointer block lg:hidden text-700"
            >
              <i className="pi pi-ellipsis-v text-2xl"></i>
              <Ripple />
            </a>
          </StyleClass>
          <ul
            className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
              surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
          >
            <li>
              <a
                className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                      transition-duration-150 transition-colors w-full"
              >
                {/* <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge">
                  <Badge severity="danger" />
                </i> */}
                <span className="block lg:hidden font-medium">Fill Later</span>
                <Ripple />
              </a>
            </li>
            <li className="border-top-1 surface-border lg:border-top-none">
              <a
                className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
                      transition-duration-150 transition-colors w-full"
              >
                <div className="block lg:hidden">
                  <div className="text-900 font-medium">Omid N.</div>
                  <span className="text-600 font-medium text-sm">
                    Fill Later
                  </span>
                </div>
                <Ripple />
              </a>
            </li>
          </ul>
        </div>
        {/* Main Content Area */}
        <div className="flex-column relative flex min-h-screen flex-auto">
          <div></div>
          <div className="flex-column flex flex-auto p-5">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);

{
  /* <div className="flex flex-column flex-auto">
<div className="surface-section p-5">
  <div className="flex align-items-start flex-column lg:flex-row lg:justify-content-between">
    <div className="flex align-items-start flex-column md:flex-row">
      <div>
        <span className="text-900 font-medium text-3xl">Omid N.</span>
        <i className="pi pi-star text-2xl ml-4 text-yellow-500"></i>
        <div className="flex align-items-center flex-wrap text-sm">
          <div className="mr-5 mt-3">
            <span className="font-medium text-500">Fill Later</span>
            <div className="text-700 mt-2">333</div>
          </div>
          <div className="mr-5 mt-3">
            <span className="font-medium text-500">Fill Later</span>
            <div className="text-700 mt-2">26</div>
          </div>
          <div className="mr-5 mt-3">
            <span className="font-medium text-500">Fill Later</span>
            <div className="text-700 mt-2">17</div>
          </div>
          <div className="mt-3">
            <span className="font-medium text-500">Fill Later</span>
            <div className="text-700 mt-2">130</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="p-5">
  <div className="grid">
    <div className="col-12 lg:col-6 xl:col-3">
      <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
        <div className="flex justify-content-between mb-3">
          <div>
            <span className="block text-500 font-medium mb-3">
              Jobs
            </span>
            <div className="text-900 font-medium text-xl">2</div>
          </div>
          <div
            className="flex align-items-center justify-content-center bg-blue-100 border-round"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span className="text-green-500 font-medium">24 new </span>
        <span className="text-500">since last visit</span>
      </div>
    </div>
  </div>
</div>
</div> */
}
