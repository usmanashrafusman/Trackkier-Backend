import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable, catchError, concatMap, finalize } from 'rxjs';
import EntityManagerService from 'src/entity-manager/entity-manager.service';

@Injectable({ scope: Scope.REQUEST })
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly entityManager: EntityManagerService) {}
  async intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    await this.entityManager.initialize();
    const queryRunner = this.entityManager.queryRunner;

    return next.handle().pipe(
      concatMap(async (data) => {
        await queryRunner.commitTransaction();
        return data;
      }),
      catchError(async (e) => {
        await queryRunner.rollbackTransaction();
        throw e;
      }),
      finalize(async () => {
        await queryRunner.release();
      }),
    );
  }
}
