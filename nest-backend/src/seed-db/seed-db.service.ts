import { Injectable } from '@nestjs/common';
import { DepartamentoService } from './departamento/departamento.service';
import { initialData } from './data/seed-db.data';

@Injectable()
export class SeedDbService {
  constructor(private readonly departamentoService: DepartamentoService) {}

  async runSeed() {
    try {
      await this.insertDepartamentos();
      return { message: 'Datos Insertados' };
    } catch (error) {
      console.error('Error during seeding:', error);
      return { message: 'Error' };
    }
  }

  private async insertDepartamentos(){
    const departamentos = initialData.departamentos;

    const existingDepartamentos = await this.departamentoService.findAll();
    if (existingDepartamentos.length > 0) {
      console.log('Departamentos ya existen. No se insertarán nuevos datos.');
      return;
    }

    const insertPromises = departamentos.map(departamento => 
      this.departamentoService.createDepartamento(departamento)
    );

    await Promise.all(insertPromises);
    console.log('Nuevos departamentos insertados.');
  }

}
