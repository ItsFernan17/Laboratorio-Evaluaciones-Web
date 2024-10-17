import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

export function LoginForm() {
  return (
    <div>
      <form class="w-full flex flex-col items-center">
        <div class="w-full flex flex-col items-center mb-6">
          <div class="flex items-center mb-6 w-full justify-center">
            <FaUser className="text-primary size-7 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              class="border-b-2 border-[#142957] h-10 w-[85%] lg:w-[320px] ml-2 font-sans font-normal text-lg"
            />
          </div>

          <div class="flex items-center mb-6 w-full justify-center">
            <FaLock className="text-primary size-7 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              class="border-b-2 border-primary h-10 w-[85%] lg:w-[320px] ml-2 font-sans font-normal text-lg"
            />
          </div>
        </div>
        <button class="bg-[#142957] font-normal text-white border-2 border-transparent rounded-[20px] text-lg cursor-pointer transition duration-300 ease-in-out h-[50px] w-[85%] lg:w-[300px] mt-2 mb-2 hover:bg-white hover:text-primary hover:border-primary">
          INICIAR SESIÓN
        </button>
      </form>
    </div>
  );
}
