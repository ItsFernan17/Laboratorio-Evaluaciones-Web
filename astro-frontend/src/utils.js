import {  
    BellPlus,
    SquareChartGantt,
    RefreshCcw,
    FilePlus,
    NotepadText,
    FileQuestion,
    ScanSearch,
    ListPlus,
    TableOfContents, 
    FileType,
    BookType,
    BriefcaseBusiness,
    Book,
    Briefcase,
    UserPlus,
    UserRoundSearch,
    UserRoundPen

} 
from 'lucide-react';

export const Menus = [
    {
        name: "Asignaciones", 
        subMenu: [
            {
                name: "Nueva Asignacion",
                icon: BellPlus,
            },
            {
                name: "Ver Asignaciones",
                icon: SquareChartGantt,
            },
            {
                name: "Actualizar Asignacion",
                icon: RefreshCcw,
            },
        ],
        gridCols: 1,
    },
    {
        name: "Examenes", 
        subMenuHeading: ["Examen", "Preguntas", "Series"],
        subMenu: [
            {
                name: "Nuevo Examen",
                icon: FilePlus,
            },
            {
                name: "Ver Examenes",
                icon: NotepadText,
            },
            {
                name: "Nuevo Tipo Examenes",
                icon: FileType,
            },
            {
                name: "Ver Tipos de Examenes",
                icon: BookType,
            },
            {
                name: "Nueva Pregunta",
                icon: FileQuestion,
            },
            {
                name: "Ver Preguntas",
                icon: ScanSearch,
            },
            {
                name: "Nueva Serie de Examen",
                icon: ListPlus,
            },
            {
                name: "Ver Series de Examen",
                icon: TableOfContents,
            },
        ],
        gridCols: 3,
    },
    {
        name: "Empleos", 
        subMenu: [
            {
                name: "Nuevo Empleo",
                icon: BriefcaseBusiness,
            },
            {
                name: "Ver Empleos",
                icon: Book,
            },
            {
                name: "Actualizar Empleo",
                icon: Briefcase,
            },
        ],
        gridCols: 1,
    },
    {
        name: "Usuarios", 
        subMenu: [
            {
                name: "Nuevo Usuario",
                icon: UserPlus,
            },
            {
                name: "Ver Usuarios",
                icon: UserRoundSearch,
            },
            {
                name: "Actualizar Empleo",
                icon: UserRoundPen,
            },
        ],
        gridCols: 1,
    },
];