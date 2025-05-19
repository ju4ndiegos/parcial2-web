import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionProfesorService } from './evaluacion-profesor.service';

describe('EvaluacionProfesorService', () => {
  let service: EvaluacionProfesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluacionProfesorService],
    }).compile();

    service = module.get<EvaluacionProfesorService>(EvaluacionProfesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
