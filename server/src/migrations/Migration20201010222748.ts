import { Migration } from '@mikro-orm/migrations';

export class Migration20201010222748 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "trip" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "date" timestamptz(0) not null, "capacity" int4 not null, "bus_id" varchar(255) not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "birthday" timestamptz(0) not null);');

    this.addSql('create table "ticket" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "price" int4 not null, "trip_id" int4 not null, "owner_id" int4 not null);');

    this.addSql('alter table "ticket" add constraint "ticket_trip_id_foreign" foreign key ("trip_id") references "trip" ("id") on update cascade;');
    this.addSql('alter table "ticket" add constraint "ticket_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

}
