import { Controller } from '@nestjs/common';
import { TipoPreguntaService } from './tipo-pregunta.service';

@Controller('tipo-pregunta')
export class TipoPreguntaController {
  constructor(private readonly tipoPreguntaService: TipoPreguntaService) {}
}
