import { ICrudRepository } from "./ICrudRepository";
import { Sugartest } from "../entities/Sugartest";

export interface ISugartestRepository extends ICrudRepository<Sugartest> {
    findByDate(date: Date): Promise<Sugartest[] | null>;
    findByPeriod(startDate: Date, endDate: Date): Promise<Sugartest[] | null>;
}