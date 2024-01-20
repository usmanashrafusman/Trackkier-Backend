import { DataSource, EntityManager as TypeORMEntityManager, QueryRunner } from "typeorm";

export default class EntityManager {
    private static pv_entityManager: TypeORMEntityManager
    private static pv_queryRunner: QueryRunner
    private static pv_datasource: DataSource
    private constructor() { }

    private static validate() {
        if (EntityManager.pv_datasource && EntityManager.pv_queryRunner && EntityManager.pv_entityManager) {
            return true
        }
        return false
    }

    static async setDataSource(dataSource: DataSource) {
        EntityManager.pv_datasource = dataSource;
        EntityManager.pv_queryRunner = EntityManager.pv_datasource.createQueryRunner()
        await EntityManager.pv_queryRunner.connect();
        await EntityManager.pv_queryRunner.startTransaction();
        EntityManager.pv_entityManager = EntityManager.pv_queryRunner.manager
    }

    public static get queryRunner() {
        const isInitialzed = EntityManager.validate();
        if (!isInitialzed) {
            throw new Error("Datasource has not been set")
        }
        return EntityManager.pv_queryRunner
    }

    public static get entityManager() {
        const isInitialzed = EntityManager.validate();
        if (!isInitialzed) {
            throw new Error("Datasource has not been set")
        }
        return EntityManager.pv_entityManager
    }
}