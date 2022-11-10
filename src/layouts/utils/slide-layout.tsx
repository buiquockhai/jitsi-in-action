import MenuSlide from '@layout/main/side';
import Topbar from '@layout/main/topbar';
import { useSystemContext } from '@context/system';
import { ROUTES } from '@util/routes';
import { useRouter } from 'next/router';
import React from 'react';

const SlideLayout: React.FC<any> = ({ children }) => {
  const { hideMenu } = useSystemContext();
  const { push } = useRouter();

  return (
    <div className="w-full h-screen relative flex flex-row">
      <input type="checkbox" className="hidden invisible peer" checked={hideMenu} />
      <div className="w-72 flex flex-col h-screen overflow-y-auto overflow-x-hidden peer-checked:w-20 transition-all duration-300">
        <button
          onClick={() => push(ROUTES.HOME)}
          type="button"
          className="p-5 flex flex-row gap-3 items-center"
          style={{ justifyContent: hideMenu ? 'center' : 'start' }}
        >
          <img src="/assets/__logo.svg" className="w-8" />
          <p className="font-bold truncate" hidden={hideMenu}>
            Learn and Do
          </p>
        </button>
        <MenuSlide />
      </div>

      <div
        className="flex flex-col h-screen transition-all duration-300 relative"
        style={{ width: hideMenu ? 'calc(100vw - 5rem)' : 'calc(100vw - 18rem)' }}
      >
        <Topbar />

        <div className="w-full h-screen overflow-auto bg-background pt-[50px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlideLayout;
