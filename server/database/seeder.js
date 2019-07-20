import { Client } from 'pg';
import dotenv from 'dotenv';
import Debug from 'debug';

const { config } = dotenv;
config();
const debug = Debug('db');
const { DATABASE_URL } = process.env;
const connectionString = new Client({ connectionString: DATABASE_URL });
connectionString.connect();

(async () => {
  try {
    const query = `DROP TABLE IF EXISTS members, weeks CASCADE;
    CREATE TABLE "members" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR NOT NULL,
      "email" VARCHAR UNIQUE NOT NULL,
      "hasBeenTL" BOOLEAN DEFAULT false,
      "hasBeenQA" BOOLEAN DEFAULT false
    );
    
    CREATE TABLE "weeks" (
      "week" SERIAL PRIMARY KEY,
      "tL" INT,
      "qA" INT,
      "teamLead" VARCHAR NOT NULL,
      "qualityAssurance" VARCHAR NOT NULL,
      "createdOn" TIMESTAMPTZ DEFAULT now() NOT NULL
    );
    
    ALTER TABLE "weeks" ADD FOREIGN KEY ("tL") REFERENCES "members" ("id");
    
    ALTER TABLE "weeks" ADD FOREIGN KEY ("qA") REFERENCES "members" ("id");
    
    INSERT INTO members(
      "name", "email", "hasBeenTL", "hasBeenQA"
    )
    VALUES ('Odunayo Okebunmi', 'odunayo.okebunmi@andela.com', true, false),
    ('Tolulope Odueke', 'tolulope.odueke@andela.com', false, true),
    ('Emeka Ofe', 'emeka.ofe@andela.com', false, false),
    ('Samuel Ocran', 'samuel.ocran@andela.com', false, false),
    ('Pelumi Aleshinloye', 'pelumi.aleshinloye@andela.com', false, false),
    ('Oyetunji Adeboye', 'oyetunji.abioye@andela.com', false, false),
    ('Victor Ajayi', 'victor.ajayi@andela.com', false, false);
    
    INSERT INTO weeks("tL", "qA", "teamLead", "qualityAssurance")
    VALUES (1, 2, 'Odunayo Okebunmi','Tolulope Odueke');`;
    const seeder = await connectionString.query(query);
    debug(seeder);
    return connectionString.end();
  } catch (err) {
    debug(err);
    await connectionString.end();
    return err;
  }
})();
