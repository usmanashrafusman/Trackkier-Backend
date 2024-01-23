import { Injectable, Scope, OnModuleInit } from '@nestjs/common';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export default class EntityManagerService extends EntityManager {
  
  constructor(datasoruce: DataSource) {
    const queryRunner = datasoruce.createQueryRunner();
    super(datasoruce, queryRunner);
  }

  async initialize() {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }
}
