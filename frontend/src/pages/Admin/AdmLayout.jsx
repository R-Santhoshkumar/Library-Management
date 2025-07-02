import React from 'react'
import AdmTopBar from '../../components/AdmTopBar';
import { Outlet } from 'react-router-dom';

function AdmLayout() {
    return (
        <div className="m-0 p-0 box-border font-sans  bg-blue1 w-full min-h-screen h-full flex flex-1 flex-col fixed ">
          <div className="w-full h-auto sticky top-0 left-0 ">
            <AdmTopBar />
          </div>
          <div className="w-full h-full flex flex-1  flex-row gap-3 p-5 overflow-auto ">
            <div className="w-full  flex-1 flex-col  ">
              <Outlet />
            </div>
          </div>
        </div>
      );
}

export default AdmLayout