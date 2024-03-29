'use client';
'use client';

import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';

export default function Themer() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
      />
      <div className="flex flex-row justify-center items-center sm:justify-end  ">
        {theme === 'winter' ? (
          <button
            className="btn btn-ghost text-xl"
            onClick={() => changeTheme('forest')}
          >
            <i className=" fa-solid fa-moon text-xl md:text-2xl hover:scale-110 hover:-rotate-45 duration-300 cursor-pointer text-primary"></i>
          </button>
        ) : (
          <button
            className="btn btn-ghost text-xl"
            onClick={() => changeTheme('winter')}
          >
            <i className="fa-solid fa-sun text-xl md:text-2xl  hover:scale-110 hover:rotate-45 duration-300 cursor-pointer text-primary"></i>
          </button>
        )}
      </div>
    </>
  );
}
