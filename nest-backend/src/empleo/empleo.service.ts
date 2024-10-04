import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Empleo } from './model/empleo.entity';  // Asegúrate de que la ruta sea correcta
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmpleoDto } from './dto/create-empleo.dto';  // Asegúrate de que la ruta sea correcta
import { UpdateEmpleoDto } from './dto/update-empleo.dto';  // Asegúrate de que la ruta sea correcta

@Injectable()
export class EmpleoService {
  constructor(
    @InjectRepository(Empleo)
    private empleoRepository: Repository<Empleo>
  ) {}

  async findAll() {
    return this.empleoRepository.find({
      where: { estado: true },
    });
  }

  async findById(ceom: string) {
    const empleoExistente = await this.empleoRepository.findOne({
      where: { ceom, estado: true },
    });

    if (!empleoExistente) {
      return new HttpException(
        'El empleo con el CEOM proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return empleoExistente;
  }

  async createEmpleo(createEmpleoDto: CreateEmpleoDto) {
    const newEmpleo = this.empleoRepository.create({
        estado: true,
        ...createEmpleoDto,
    });
    return this.empleoRepository.save(newEmpleo);
}

async updateEmpleo(ceom: string, updateEmpleoDto: UpdateEmpleoDto) {
    const empleoExistente = await this.empleoRepository.findOne({
        where: { ceom },
    });

    if (!empleoExistente) {
        return new HttpException(
            'El empleo con el CEOM proporcionado no existe en la base de datos.',
            HttpStatus.NOT_FOUND,
        );
    }

    const updateEmpleo = Object.assign(empleoExistente, updateEmpleoDto);
    return this.empleoRepository.save(updateEmpleo);
}



  async desactiveEmpleo(ceom: string) {
    const empleoExistente = await this.empleoRepository.findOne({
      where: { ceom },
    });

    if (!empleoExistente) {
      return new HttpException(
        'El empleo con el CEOM proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    
    // Cambiar el estado a false en lugar de eliminar el registro
    empleoExistente.estado = false;

    const resultado = await this.empleoRepository.save(empleoExistente);
    return resultado;
  }
}
