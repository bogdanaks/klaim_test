import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm"

export class Init1674556899386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create table users
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "bigserial",
            isPrimary: true
          },
          {
            name: "email",
            type: "character varying(255)",
            isUnique: true
          },
          {
            name: "password",
            type: "character varying(255)"
          },
          {
            name: "fullname",
            type: "character varying(255)"
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()"
          }
        ]
      }),
      true,
      false,
      false
    )

    // create table authors
    await queryRunner.createTable(
      new Table({
        name: "authors",
        columns: [
          {
            name: "id",
            type: "bigserial",
            isPrimary: true
          },
          {
            name: "name",
            type: "character varying(255)"
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()"
          }
        ]
      }),
      true,
      false,
      false
    )

    // create table quotes
    await queryRunner.createTable(
      new Table({
        name: "quotes",
        columns: [
          {
            name: "id",
            type: "bigserial",
            isPrimary: true
          },
          {
            name: "author_id",
            type: "bigint"
          },
          {
            name: "quote",
            type: "text"
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()"
          }
        ]
      }),
      true,
      false,
      false
    )

    // create foreign key
    await queryRunner.createForeignKey(
      "quotes",
      new TableForeignKey({
        columnNames: ["author_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "authors",
        onDelete: "CASCADE"
      })
    )

    // create table user_sessions
    await queryRunner.createTable(
      new Table({
        name: "user_sessions",
        columns: [
          {
            name: "id",
            type: "character varying(255)",
            isPrimary: true
          },
          {
            name: "json",
            type: "text"
          },
          {
            name: "expiredAt",
            type: "bigint"
          },
          {
            name: "destroyedAt",
            type: "timestamp with time zone",
            isNullable: true
          }
        ]
      }),
      true,
      false,
      false
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_sessions")
    await queryRunner.dropTable("quotes")
    await queryRunner.dropTable("authors")
    await queryRunner.dropTable("users")
  }
}
