import _ from 'lodash';
import { Database } from "https://deno.land/x/sqlite3@0.4.2/mod.ts";

// Open a database
const db = new Database("swift_code.db");

db.execute(
  'CREATE TABLE IF NOT EXISTS swift_code (' +
  'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
  'swift TEXT,' +
  'bank TEXT,' +
  'city TEXT,' +
  'branch TEXT,' +
  'address TEXT,' +
  'postcode TEXT,' +
  'country TEXT,' +
  'countryiso TEXT' +
  ')'
);

db.execute(
  'CREATE TABLE IF NOT EXISTS country (' +
  'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
  'code TEXT,' +
  'name TEXT' +
  ')'
);

const rawData = new TextDecoder().decode(await Deno.readFile('countryList.json'));
const rows = JSON.parse(rawData);


let s = '';
for await (const row of rows) {
  s += `insert into country (code, name)
        values ('${row.code}', '${row.name}');  `;
}

let s2 = '';

function sqlValue(val: string) {
  return val
    .replaceAll("'", "''")
    .replaceAll('"', '""');
}

for await (const dirEntry of Deno.readDir('swift')) {
  const rawData = new TextDecoder().decode(await Deno.readFile(`swift/${dirEntry.name}`));
  const rows = JSON.parse(rawData);
  // const stmt = db.prepare("insert into swift_code (swift, bank, city, branch, address, postcode, country, countryiso) values (?, ?, ?, ?, ?, ?, ?, ?)");
  for await (const row of rows.flatMap(_.identity)) {
    /*stmt.execute(
      row.swift,
      row.bank,
      row.city,
      row.branch,
      row.address,
      row.postcode,
      row.country,
      row.countryiso
    );*/

    s2 += `insert into swift_code (swift, bank, city, branch, address, postcode, country, countryiso)
           values ('${row.swift}', '${sqlValue(row.bank)}', '${sqlValue(row.city)}', '${sqlValue(row.branch)}', '${sqlValue(row.address)}', '${row.postcode}', '${sqlValue(row.country)}', '${row.countryiso}');\n`;

  }
  // stmt.finalize();
  console.log(`${dirEntry.name} done`);
}

await Deno.writeFile('swift_code.sql', new TextEncoder().encode(s2));


// Close connection
db.close();