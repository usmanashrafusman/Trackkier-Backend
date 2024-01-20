import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Observable, catchError, concatMap, finalize } from 'rxjs';
import EntityManager from "src/common/entity-manager";

@Injectable()
export class TransactionInterceptor implements NestInterceptor {

    constructor(private dataSource: DataSource) { }
    async intercept(_: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        //setting the datasource to entity manager to set query manager and start transaction
        await EntityManager.setDataSource(this.dataSource)
        const queryRunner = EntityManager.queryRunner;

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