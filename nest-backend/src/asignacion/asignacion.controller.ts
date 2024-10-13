import { Controller } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}
}
