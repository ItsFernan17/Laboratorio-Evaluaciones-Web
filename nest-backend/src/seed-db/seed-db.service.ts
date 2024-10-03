import { Injectable } from '@nestjs/common';
import { DepartamentoService } from './departamento/departamento.service';
import { initialData } from './data/seed-db.data';
import { GradoService } from './grado/grado.service';
import { PoblacionService } from './poblacion/poblacion.service';

@Injectable()
export class SeedDbService {
  constructor(
    private readonly departamentoService: DepartamentoService,
    private readonly gradoService: GradoService,
    private readonly poblacionService: PoblacionService
  ) {}

  async runSeed() {
    try {
      await this.insertDepartamentos();
      await this.insertGrados();
      await this.insertPoblacion();
      return { message: 'Datos insertados correctamente' };
    } catch (error) {
      console.error('Error during seeding:', error);
      return { message: 'Error durante la inserción de datos' };
    }
  }

  private async insertDepartamentos() {
    const departamentos = initialData.departamentos;

    const existingDepartamentos = await this.departamentoService.findAll();
    const existingDepartamentoNames = existingDepartamentos.map(dep => dep.nombre_departamento);

    const departamentosToInsert = departamentos.filter(dep => !existingDepartamentoNames.includes(dep.nombre_departamento));

    if (departamentosToInsert.length === 0) {
      console.log('Departamentos ya existen. No se insertarán nuevos datos.');
    } else {
      const insertPromises = departamentosToInsert.map(departamento =>
        this.departamentoService.createDepartamento(departamento) 
      );
      await Promise.all(insertPromises);
      console.log('Nuevos departamentos insertados.');
    }
  }

  private async insertGrados() {
    const grados = initialData.grado;

    const existingGrados = await this.gradoService.findAll();
    const existingGradoNames = existingGrados.map(grado => grado.nombre_grado);

    const gradosToInsert = grados.filter(grado => !existingGradoNames.includes(grado.nombre_grado));

    if (gradosToInsert.length === 0) {
      console.log('Grados ya existen. No se insertarán nuevos datos.');
    } else {
      const insertPromises = gradosToInsert.map(grado =>
        this.gradoService.createGrado(grado)
      );
      await Promise.all(insertPromises);
      console.log('Nuevos grados insertados.');
    }
  }

  private async insertPoblacion(){
    const poblacion = initialData.poblacion;

    const existingPoblacion = await this.poblacionService.findAll();
    const existingPoblacionNames = existingPoblacion.map(poblacion => poblacion.nombre_poblacion);

    const poblacionToInsert = poblacion.filter(poblacion => !existingPoblacionNames.includes(poblacion.nombre_poblacion));

    if(poblacionToInsert.length === 0){
      console.log('Poblaciones ya existe. No se insertarán nuevos datos.');
    } else {
      const insertPromises = poblacionToInsert.map(poblacion =>
        this.poblacionService.createPoblacion(poblacion)
      );
      await Promise.all(insertPromises);
      console.log('Nuevas poblaciones insertadas.');
    }
  }
}
