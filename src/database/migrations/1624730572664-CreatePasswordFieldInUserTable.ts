import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class CreatePasswordFieldInUserTable1624730572664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: true
                
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password");
    }

}
