import { DataSource } from "typeorm";
import { Sugartest } from "../../domain/entities/Sugartest";

export const SqlLiteDataSource = new DataSource({
    type: 'react-native',
    database: 'glicontrol.db',
    location: 'default',
    logging: ['error', 'query', 'schema'],
    synchronize: true,
    entities: [Sugartest],
});

SqlLiteDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    })