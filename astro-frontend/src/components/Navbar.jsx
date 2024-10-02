import Sidebar from './Sidebar'
import { MdHome } from "react-icons/md";
import User from './User'

export function Navbar (){
    return(
        <div className="flex flex-row bg-primary w-full h-[120px] justify-between z-50">
        <div className="flex ml-10 gap-4">
            <Sidebar />
            <img src="/logotipo.png" alt="Logo Ministerio de la Defensa" className=" mt-2 h-[90px]"/>
        </div>
            <div className="flex ml-10 gap-4">
            <button>
                <MdHome className='text-white size-7  mr-4'/>
            </button>
            <div className="w-[1px] h-[70px] mt-5 bg-white"></div>
            <img src="/icono_usuario.png" alt="Logo Ministerio de la Defensa" className=" mt-4 h-[80px]"/>
            <div className="flex flex-col justify-center text-center mr-10">
                <User/>
            </div>
            </div>
         </div>
    );
}