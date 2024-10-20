import React, { useState } from "react";
import { componentStore } from "../store/componentsStore";

const Navbar = () => {
  const { isPressed, setIsPressed } = componentStore((state) => state);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center w-full h-auto text-white md:px-9 bg-primary drop-shadow-md justify-between">
        <div className="flex items-center">
          <img
            src="/logotipo.png"
            alt="Logo Ministerio de la Defensa"
            className="w-48 transition-all mr-6"
          />
        </div>

        <div className="relative hidden xl:flex items-center gap-3">
          <div className="flex h-auto justify-center bg-primary cursor-pointer mr-8">
            <FlyoutLink href="/" FlyoutContent>
              Inicio
            </FlyoutLink>
          </div>
          <div className="flex h-auto justify-center bg-primary cursor-pointer mr-8">
            <FlyoutLink href="/nosotros" FlyoutContent>
              Nosotros
            </FlyoutLink>
          </div>
          <div className="flex h-auto justify-center bg-primary cursor-pointer mr-8">
            <FlyoutLink href="/empleo" FlyoutContent>
              Empleos
            </FlyoutLink>
          </div>
          <div className="h-8 border-l-2 border-background mx-4"></div>
          <a href="/login">
            <button className="text-white text-[14px] font-regular rounded-[10px] border-2 p-2 border-white/50 duration-300 ease-in-out hover:bg-white/10 hover:border-white transition-all">
              Iniciar Sesión
            </button>
          </a>
          <a href="/contacto">
            <button className="text-white text-[14px] font-regular rounded-[10px]  border-2 p-2 border-white/50 duration-300 ease-in-out hover:bg-white/10 hover:border-white transition-all">
              Contáctanos
            </button>
          </a>
        </div>

        <i
          className={`bx ${isPressed ? "bx-x" : "bx-menu"} xl:hidden block text-5xl font-light cursor-pointer transition-transform duration-300`}
          onClick={() => setIsPressed(!isPressed)}
        ></i>

        <div
          className={`absolute xl:hidden top-[66px] left-0 w-full bg-white flex flex-col items-center gap-7 font-normal text-lg transform transition-transform ${isPressed ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <a href="/">
            <li className="list-none w-full text-primary text-center p-4  font-semibold text-[20px] hover:text-secondary ver:w-full transition-all cursor-pointer">
              Inicio
            </li>
          </a>
          <a href="/nosotros">
          <li className="list-none w-full text-primary text-center p-4  font-semibold text-[20px] hover:text-secondary ver:w-full transition-all cursor-pointer">
              Nosotros
            </li>
          </a>
          <a href="/empleo">
          <li className="list-none w-full text-primary text-center p-4  font-semibold text-[20px] hover:text-secondary ver:w-full transition-all cursor-pointer">
              Empleos
            </li>
          </a>
          <a href="/login">
          <li className="list-none w-full text-primary text-center p-4  font-semibold text-[20px] hover:text-secondary ver:w-full transition-all cursor-pointer">
              Login
            </li>
          </a>
          <a href="/contacto">
          <li className="list-none w-full text-primary text-center p-4  font-semibold text-[20px] hover:text-secondary ver:w-full transition-all cursor-pointer">
              Contácto
            </li>
          </a>
        </div>
      </div>

      <div className="h-2 flex">
        <div className="flex-1 bg-[#069CF1]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#069CF1]"></div>
      </div>
    </header>
  );
};

const FlyoutLink = ({ href, children, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative h-fit w-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        <span
          style={{ transform: showFlyout ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -bottom-2 origin-left -left-2 -right-2 h-[2px] rounded-full bg-secondary transition-transform duration-300 ease-out"
        ></span>
      </a>
    </div>
  );
};

export default Navbar;
