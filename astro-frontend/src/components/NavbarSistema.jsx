import React, { useState } from "react";
import { componentStore } from "../store/componentsStore";
import { AnimatePresence, motion } from "framer-motion";

function NavbarSistema() {
  const { isPressed, setIsPressed } = componentStore((state) => state);

  return (
    <div className="flex items-center w-full h-auto  text-white md:px-9 bg-primary drop-shadow-md justify-between">
      <div className="flex items-center space-x-8">
        <a href="/portal/menu-sistema">
          <img
            src="/logotipo.png"
            alt="Logo Ministerio de la Defensa"
            className="w-48 transition-all"
          />
        </a>

        <div className="flex h-auto justify-center bg-primary cursor-pointer">
          <FlyoutLink FlyoutContent={AsignacionContent}>
            Asignaciones
          </FlyoutLink>
        </div>
        <div className=" justify-center bg-primary cursor-pointer">
          <FlyoutLinkExamen FlyoutContent={ExamenContent}>
            Examenes
          </FlyoutLinkExamen>
        </div>
        <div className="flex h-auto justify-center bg-primary cursor-pointer">
          <FlyoutLink FlyoutContent={EmpleosContent}>Empleos</FlyoutLink>
        </div>
        <div className="flex h-auto justify-center bg-primary cursor-pointer">
          <FlyoutLink FlyoutContent={UsuariosContent}>Usuario</FlyoutLink>
        </div>
      </div>
      <div className="flex h-auto justify-center bg-primary cursor-pointer">
        <PerfilDesing FlyoutContent={Perfil}>
          <img
            src="/perfil.png"
            alt="Logo Ministerio de la Defensa"
            className="w-[60px]  h-[60px] rounded-full border-2 border-secondary transition-all mr-2"
          />
        </PerfilDesing>
      </div>
    </div>
  );
}

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
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-primary border border-primary rounded-lg"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary  bg-secondary" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FlyoutLinkExamen = ({ href, children, FlyoutContent }) => {
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

      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-primary border border-primary rounded-lg p-6 w-[700px]" // Incrementamos el ancho a 900px
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary bg-secondary" />

            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PerfilDesing = ({ href, children, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative h-fit w-fit"
    >
      {children}
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-75%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-[30%] top-[70px] bg-white text-primary border border-primary rounded-lg"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-[214px] top-0 h-4 w-4 -translate-x-[70px] -translate-y-1/2 rotate-45 border border-primary  bg-secondary" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AsignacionContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-lg border border-primary rounded-lg">
      <div className="mb-3 space-y-3">
        <h3 className="font-page font-bold">Asignaciones</h3>
        <a href="/" className="block font-page text-sm hover:underline">
          Nueva Asignacion
        </a>
        <a href="/" className="block font-page text-sm hover:underline">
          Ver Asignaciones
        </a>
      </div>
    </div>
  );
};

const ExamenContent = () => {
  return (
    <div className="grid grid-cols-[auto,auto,auto] gap-3">
      <div className="mb-3 space-y-3">
        <h3 className="font-page font-bold">Exámenes</h3>
        <a href="/" className="block font-page text-sm hover:underline">
          Nuevo Examen
        </a>
        <a href="/" className="block font-page text-sm hover:underline">
          Ver Exámenes
        </a>
      </div>
      <div className="mb-3 space-y-3"> 
        <h3 className="font-page font-bold">Preguntas y Respuestas</h3>
        <a href="/" className="block font-page text-sm hover:underline">
          Nueva Pregunta y Respuestas
        </a>
        <a href="/" className="block font-page text-sm hover:underline">
          Ver Preguntas y Respuestas
        </a>
      </div>
      <div className="mb-3 space-y-3"> 
        <h3 className="font-page font-bold">Tipos de Examen</h3>
        <a href="/" className="block font-page text-sm hover:underline">
          Nuevo Tipo de Examen
        </a>
        <a href="/" className="block font-page text-sm hover:underline">
          Ver Tipos de Examen
        </a>
      </div>
    </div>
  );
};

const EmpleosContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-lg border border-primary rounded-lg">
      <div className="mb-3 space-y-3">
        <h3 className="font-page font-bold">Empleos</h3>
        <a
          href="/portal/registrar-empleo"
          className="block font-page text-sm hover:underline"
        >
          Nuevo Empleo
        </a>
        <a href="/" className="block font-page text-sm hover:underline">
          Ver Empleos Disponibles
        </a>
      </div>
    </div>
  );
};

const UsuariosContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-lg border border-primary rounded-lg">
      <div className="mb-3 space-y-3">
        <h3 className="font-page font-bold">Usuarios</h3>
        <a
          href="/portal/usuarios/registrar-usuario"
          className="block font-page text-sm hover:underline"
        >
          Nuevo Usuario
        </a>
        <a
          href="/portal/usuarios/gestionar-usuarios"
          className="block font-page text-sm hover:underline"
        >
          Ver Usuarios Registrados
        </a>
      </div>
    </div>
  );
};

const Perfil = () => {
  return (
    <div className="w-[190px] bg-white p-6 shadow-lg border border-primary rounded-lg">
      <div className="mb-3 space-y-3">
        <h3 className="font-page text-[16px] font-bold">Fernando Rivas</h3>
        <a href="/" className="block font-page text-sm hover:underline">
          Perfil
        </a>
        <hr className="border-[#F0F0F0] my-2" />
        <a href="/login" className="block font-page text-sm hover:underline">
          Cerrar Sesión
        </a>
      </div>
    </div>
  );
};

export default NavbarSistema;
