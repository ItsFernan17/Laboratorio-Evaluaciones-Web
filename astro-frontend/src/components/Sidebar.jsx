import { sidebarStore } from '../store/sidebarStore'
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FaUsers,FaBook  } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";
import { GiOrganigram } from "react-icons/gi";
import { MdOutlineWork } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { isPressed, setIsPressed } = sidebarStore(state => state)

  return (
    <div>

      <div className="flex">
        <button onClick={() => setIsPressed(!isPressed)}>
          {isPressed ? <IoMdClose className='text-white size-8 mt-10 mr-4'/> : <FiMenu className='text-white size-7 mt-10 mr-5'/>}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 h-full w-[260px] top-28 bg-primary transform transition-transform duration-300 ease-in-out 
                    ${isPressed ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <div className="p-4 text-white">
          <h1 className="text-[18px] font-bold font-sans mt-5 text-secondary">Evaluaciones</h1>
          <ul className="mt-4">
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <FaUsers className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Personas</a>
          </li>
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <FaBook className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Evaluaciones</a>
          </li>
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <FaFileCircleCheck className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Certificaciones</a>
          </li>
          </ul>
          <h1 className="text-[18px] font-bold font-sans mt-5 text-secondary">Administración</h1>
          <ul className="mt-4">
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <GiOrganigram className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Comandos</a>
          </li>
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <MdOutlineWork className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Empleos</a>
          </li>
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <FaUsersGear className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Usuarios RRHH</a>
          </li>
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <IoMdSettings className="w-6 h-6 mr-2 transition-colors duration-200" />
              <a href="#home" className=" text-gray-300 hover:text-white text-[18px] font-sans font-semibold transition-colors duration-200">Admin. Examenes</a>
          </li>
          </ul>
          <hr className="border-t-2 border-gray-600 w-52 ml-4 mt-5 mb-5" />
          <li className="flex items-center py-2 px-2 transition-colors duration-200">
              <FiLogOut className="w-6 h-6 mr-2 transition-colors text-red-300 duration-200" />
              <a href="index" className=" text-red-300 hover:text-red-500 text-[18px] font-sans font-semibold transition-colors duration-200">Cerrar Sesión</a>
          </li>
        </div>
      </div>

      {isPressed && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsPressed(false)} 
        ></div>
      )}
    </div>
  )
}

export default Sidebar
