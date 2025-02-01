import React, { useEffect } from "react";
import food from "/src/assets/food.jpg";

export default function Home() {
  const [isInDarkMode, setIsInDarkMode] = React.useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  function toggleMode() {
    if (isInDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }

  useEffect(() => {
    toggleMode();
  }, [isInDarkMode]);

  //   function toggleMode() {
  //     document.documentElement.classList.toggle("dark");
  //   }
  return (
    <>
      <div className="container">
        {/* <button onClick={toggleMode} className="border border-red-300 p-6">Dark/light</button>  */}
        {/* <button
          onClick={() => setIsInDarkMode(!isInDarkMode)}
          className="border border-red-300 p-6"
        >
          Dark/light
        </button> */}
      </div>
      <div
        className="flex flex-col justify-center ml-3"
        onClick={() => setIsInDarkMode(!isInDarkMode)}
      >
        <input
          type="checkbox"
          name="light-switch"
          className="light-switch sr-only"
        />
        <label className="relative cursor-pointer p-2" htmlFor="light-switch">
          <svg
            className="dark:hidden"
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-slate-300"
              d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
            />
            <path
              className="fill-slate-400"
              d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
            />
          </svg>
          <svg
            className="hidden dark:block"
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-slate-400"
              d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
            />
            <path
              className="fill-slate-500"
              d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
            />
          </svg>
          <span className="sr-only">Switch to light / dark version</span>
        </label>
      </div>

      {/* dropdown menu for theme */}
      <div className="hs-dropdown">
        <button
          id="hs-dropdown-dark-mode"
          type="button"
          className="hs-dropdown-toggle hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          <svg
            className="hs-dark-mode-active:hidden block size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <svg
            className="hs-dark-mode-active:block hidden size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={4} />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </button>
        <div
          id="selectThemeDropdown"
          className="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 origin-bottom-left bg-white shadow-md rounded-lg p-1 space-y-0.5 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown-dark-mode"
        >
          <button
            type="button"
            className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            data-hs-theme-click-value="default"
            onClick={() => setIsInDarkMode(false)}
          >
            Default (Light)
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            data-hs-theme-click-value="dark"
            onClick={() => setIsInDarkMode(true)}
          >
            Dark
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            data-hs-theme-click-value="auto"
            onClick={() => setIsInDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)}
          >
            Auto (System)
          </button>
        </div>
      </div>

      <h1
        className="mx-auto text-3xl font-bold  text-white mb-13 relative my-10 bg-batata w-fit
      after:absolute  after:h-0.5 after:bg-red-400  after:start-10 after:end-10 after:top-full after:transform  after:content-['']  after:transition-all after:duration-500 after:ease-in"
      >
        Hello world!
      </h1>

      <div className="container mx-auto">
        <div className="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            <div className="col-span-1 p-2 rounded-2xl bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
            <div className="col-span-1 p-2 rounded bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
            <div className="col-span-1 p-2 rounded bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
            <div className="col-span-1 p-2 rounded bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="container mx-auto">
        <div className="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            <div className="col-span-1 p-2 rounded-2xl bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
            <div className="col-span-1 p-2 rounded bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
            <div className="col-span-1 p-2 rounded bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
            <div className="col-span-1 p-2 rounded bg-orange-400">
              <img src={food} alt="food" className="rounded-lg" />
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sint sunt voluptatibus reiciendis sit quod modi cumque
                laboriosam praesentium, fuga numquam consequatur, neque illum
                dicta laborum similique quos, hic eos?
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative transition-all duration-500 ease-in group">
        <img
          src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          className="block w-full h-auto"
        />
        <div className="absolute inset-0 opacity-0 invisible transition-opacity duration-500 ease-in-out bg-gray-800 group-hover:opacity-100 group-hover:visible">
          <div className="absolute text-white text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-xl font-semibold">Mountain Trips</h3>
            <p className="mt-2">Plan your next adventure</p>
            <a
              href="#"
              className="mt-6 inline-block bg-orange-600 text-white px-6 py-4 no-underline"
            >
              View Trips
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
