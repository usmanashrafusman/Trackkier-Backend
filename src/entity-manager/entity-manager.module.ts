import { Module, Global } from '@nestjs/common';
import EntityManagerService from './entity-manager.service';

@Global()
@Module({
  providers: [EntityManagerService],
  exports: [EntityManagerService],
})
export class EntityManagerModule {}
