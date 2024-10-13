import React from "react";
import { componentStore } from "../store/componentsStore";

const Navbar = () => {

    const { isPressed, setIsPressed } = componentStore(state => state)

  return (
    <header className="shadow-md">
        <div className="flex items-center w-full h-auto text-white md:px-9 bg-primary drop-shadow-md justify-between">
        <div className="flex items-center">
           <img src="/logotipo.png" alt="Logo Ministerio de la Defensa" className="w-48 transition-all mr-6"/>
      </div>

      <div className="relative hidden xl:flex items-center gap-3">
      <ul className="hidden xl:flex items-center gap-7 text-page mb-3">
        <a href="/">
            <li className="text-white text-[15px] font-regular mt-4 p-2 border-b-2 border-transparent duration-300 ease-in-out hover:border-secondary transition-all cursor-pointer">
                Inicio
            </li>
        </a>
        <a href="nosotros">
        <li className="text-white text-[15px] font-regular mt-4 p-2 border-b-2 border-transparent duration-300 ease-in-out hover:border-secondary transition-all cursor-pointer">
            Nosotros
        </li>
        </a>
        <a href="/empleo">
            <li className="text-white text-[15px] font-regular mt-4 p-2 border-b-2 border-transparent duration-300 ease-in-out hover:border-secondary transition-all cursor-pointer">
                Empleos
            </li>
        </a>
        </ul>
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

      <i className={`bx ${isPressed ? "bx-x" : "bx-menu"} xl:hidden block text-5xl font-light cursor-pointer transition-transform duration-300`}
        onClick={() => setIsPressed(!isPressed)}></i>

        <div className={`absolute xl:hidden top-[66px] left-0 w-full bg-white flex flex-col items-center gap-7 font-normal text-lg transform transition-transform ${isPressed ? "opacity-100" : "opacity-0"}`}
            style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
                <li className="list-none w-full text-primary text-center p-4 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    Inicio
                </li>
                <li className="list-none w-full text-primary  text-center p-4 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    Nosotros
                </li>
                <li className="list-none w-full text-primary  text-center p-4 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    Empleo
                </li>
                <li className="list-none w-full text-primary  text-center p-4 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    Iniciar Sesión
                </li>
                <li className="list-none w-full text-primary  text-center p-4 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    contacto
                </li>               
        </div>  
        </div>

        <div className="h-2 flex">
        <div className="flex-1 bg-[#069CF1]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#069CF1]"></div>
        </div>

    </header>
    

  );
}

export default Navbar;
