interface SeedDepartamentos {
  estado: boolean;
  nombre_departamento: string;
}

interface SeedPoblacion {
  estado: boolean;
  nombre_poblacion: string;
}

interface SeedGrado {
  estado: boolean;
  nombre_grado: string;
}

interface SeedData {
  departamentos: SeedDepartamentos[];
  poblacion: SeedPoblacion[];
  grado: SeedGrado[];
}

export const initialData: SeedData = {
  departamentos: [
    {
      estado: true,
      nombre_departamento: 'Guatemala',
    },
    {
      estado: true,
      nombre_departamento: 'Sacatepéquez',
    },
    {
      estado: true,
      nombre_departamento: 'Chimaltenango',
    },
    {
      estado: true,
      nombre_departamento: 'Escuintla',
    },
    {
      estado: true,
      nombre_departamento: 'Santa Rosa',
    },
    {
      estado: true,
      nombre_departamento: 'Sololá',
    },
    {
      estado: true,
      nombre_departamento: 'Totonicapán',
    },
    {
      estado: true,
      nombre_departamento: 'Quetzaltenango',
    },
    {
      estado: true,
      nombre_departamento: 'Suchitepéquez',
    },
    {
      estado: true,
      nombre_departamento: 'Retalhuleu',
    },
    {
      estado: true,
      nombre_departamento: 'San Marcos',
    },
    {
      estado: true,
      nombre_departamento: 'Huehuetenango',
    },
    {
      estado: true,
      nombre_departamento: 'Quiché',
    },
    {
      estado: true,
      nombre_departamento: 'Baja Verapaz',
    },
    {
      estado: true,
      nombre_departamento: 'Alta Verapaz',
    },
    {
      estado: true,
      nombre_departamento: 'Peten',
    },
    {
      estado: true,
      nombre_departamento: 'Izabal',
    },
    {
      estado: true,
      nombre_departamento: 'Zacapa',
    },
    {
      estado: true,
      nombre_departamento: 'Chiquimula',
    },
    {
      estado: true,
      nombre_departamento: 'Jalapa',
    },
    {
      estado: true,
      nombre_departamento: 'Jutiapa',
    },
    {
      estado: true,
      nombre_departamento: 'El Progreso',
    },
  ],

  poblacion: [
    {
      estado: true,
      nombre_poblacion: 'Civiles',
    },
    {
      estado: true,
      nombre_poblacion: 'Planilleros',
    },
    {
      estado: true,
      nombre_poblacion: 'Tropas',
    },
    {
      estado: true,
      nombre_poblacion: 'Especialistas',
    },
    {
      estado: true,
      nombre_poblacion: 'Oficiales Asimilados',
    },
    {
      estado: true,
      nombre_poblacion: 'Oficiales de Carrera',
    },
  ],
  grado: [
    {
      estado: true,
      nombre_grado: 'Civil',
    },
    {
      estado: true,
      nombre_grado: 'Planillero',
    },
    {
      estado: true,
      nombre_grado: 'Soldado de Segunda',
    },
    {
      estado: true,
      nombre_grado: 'Soldado de Primera',
    },
    {
      estado: true,
      nombre_grado: 'Cabo',
    },
    {
      estado: true,
      nombre_grado: 'Sargento Segundo',
    },
    {
      estado: true,
      nombre_grado: 'Sargento Primero',
    },
    {
      estado: true,
      nombre_grado: 'Sargento Técnico',
    },
    {
      estado: true,
      nombre_grado: 'Sargento Mayor',
    },
    {
      estado: true,
      nombre_grado: 'Sargento Mayor Comandante de Pelotón',
    },
    {
      estado: true,
      nombre_grado: 'Marinero de Tercera',
    },
    {
      estado: true,
      nombre_grado: 'Marinero de Segunda',
    },
    {
      estado: true,
      nombre_grado: 'Marinero de Primera',
    },
    {
      estado: true,
      nombre_grado: 'Contramaestre',
    },
    {
      estado: true,
      nombre_grado: 'Maestre Especialista',
    },
    {
      estado: true,
      nombre_grado: 'Maestre Técnico',
    },
    {
      estado: true,
      nombre_grado: 'Maestre Mayor',
    },
    {
      estado: true,
      nombre_grado: 'Alférez de Fragata',
    },
    {
      estado: true,
      nombre_grado: 'Alférez de Navío',
    },
    {
      estado: true,
      nombre_grado: 'Teniente de Fragata',
    },
    {
      estado: true,
      nombre_grado: 'Teniente de Navío',
    },
    {
      estado: true,
      nombre_grado: 'Capitán de Corbeta',
    },
    {
      estado: true,
      nombre_grado: 'Capitán de Fragata',
    },
    {
      estado: true,
      nombre_grado: 'Capitán de Navío',
    },
    {
      estado: true,
      nombre_grado: 'Vicealmirante',
    },
    {
      estado: true,
      nombre_grado: 'Almirante',
    },
    {
      estado: true,
      nombre_grado: 'Subteniente',
    },
    {
      estado: true,
      nombre_grado: 'Teniente',
    },
    {
      estado: true,
      nombre_grado: 'Capitán Segundo',
    },
    {
      estado: true,
      nombre_grado: 'Capitán Primero',
    },
    {
      estado: true,
      nombre_grado: 'Mayor',
    },
    {
      estado: true,
      nombre_grado: 'Teniente Coronel',
    },
    {
      estado: true,
      nombre_grado: 'Coronel',
    },
    {
      estado: true,
      nombre_grado: 'General de Brigada',
    },
    {
      estado: true,
      nombre_grado: 'General de División',
    },
  ],
};
