import { SqlLiteDataSource } from "../database/DataSource";
import { Sugartest } from "../../domain/entities/Sugartest";
import { ISugartestRepository } from "../../domain/interfaces/ISugartestRepository";

export class SugartestRepository implements ISugartestRepository {

    private repository = SqlLiteDataSource.getRepository(Sugartest);

    async initialize() {
        if (!SqlLiteDataSource.isInitialized) {
            await SqlLiteDataSource.initialize();
        }
    }

    async getAll() : Promise<Sugartest[]> {
        await this.initialize();
        return this.repository.find();
    }

    async getById(id: number) : Promise<Sugartest | null> {
        await this.initialize();
        return this.repository.findOneBy({ id: id });
    }

    async create(sugartest: Sugartest) {
        await this.initialize();
        return this.repository.save(sugartest);
    }

    async update(updatedSugartest: Sugartest) {
        await this.initialize();

        const sugartest = await this.getById(updatedSugartest.id);
        if (!sugartest) {
            return null;
        }

        Object.assign(sugartest, updatedSugartest);
        return this.repository.save(sugartest);
    }

    async delete(id: number) : Promise<boolean> {
        await this.initialize();
        
        const sugartest = await this.getById(id);
        if (!sugartest) {
            return false;
        }

        await this.repository.remove(sugartest);
        return true;
    }

    async findByDate(date: Date): Promise<Sugartest[] | null> {
        await this.initialize();
        return this.repository.findBy({ testdate: date })
    }

    async findByPeriod(startDate: Date, endDate: Date): Promise<Sugartest[] | null> {
        await this.initialize();
        return this.repository.createQueryBuilder("sugartest")
            .where("sugartest.testdate BETWEEN :startDate AND :endDate", { startDate, endDate })
            .getMany();
    }
}