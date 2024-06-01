import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('sugartests')
export class Sugartest {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public testdate: Date;

    @Column()
    public sugarlevel: number;

    @Column()
    public insulintaken: number;

    constructor(testdate: Date, sugarlevel: number, insulintaken: number) {
        this.testdate = testdate;
        this.sugarlevel = sugarlevel;
        this.insulintaken = insulintaken;
    }
}