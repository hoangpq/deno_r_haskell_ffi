import _ from "lodash";

type R = Record<string, string>;

let listDir: string[] = [];
for await (const dirEntry of Deno.readDir("swift")) {
  listDir = [...listDir, dirEntry.name.replace(".json", "")];
}

interface ICountry {
  code?: string;
  name?: string;
}

const countryDate = new TextDecoder().decode(
  await Deno.readFile("./countryList.json"),
);
const countryList = JSON.parse(countryDate).map((country: ICountry) =>
  country.code!
);

const countriesToWrite = countryList
  .filter((countryCode: string) => !listDir.includes(countryCode));

let remainingCountry = countriesToWrite.length;

let errorBuffer = new TextDecoder().decode(
  await Deno.readFile("./errors2.json"),
);
let errors = JSON.parse(errorBuffer) as R[];

console.log(countriesToWrite);

for await (const country of countriesToWrite) {
  console.log(country);
  const buffer = new TextDecoder().decode(
    await Deno.readFile(`dist/${country}.json`),
  );
  const data = JSON.parse(buffer).flatMap((item: any) => item.swift);
  console.log("Remaining countries: ", remainingCountry);

  let codes: R[] = [];
  for await (const block of _.chunk(data, 5)) {
    try {
      let resp = await Promise.all(
        block.map((code: string) =>
          fetch("https://bank.codes/j/sw.php", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "cache-control": "no-cache",
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "pragma": "no-cache",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "x-requested-with": "XMLHttpRequest",
            },
            "referrer": "https://bank.codes/swift-code-search/",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `o=GSD&s=${code}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit",
          }).then((resp) => resp.json())
        ),
      );

      const _codes = await resp;
      codes = codes.concat(_codes);
      console.log(codes.length);
    } catch (e: any) {
      console.log(block);
      console.log(e);
      errors = errors.concat(block.map((item: R) => ({
        ...item,
        country: country,
      })));
    }
  }

  console.log(`Writing to file swift/${country}.json`);
  await Deno.writeFile(
    `swift/${country}.json`,
    new TextEncoder().encode(JSON.stringify(codes)),
  );
  await Deno.writeFile(
    "errors2.json",
    new TextEncoder().encode(JSON.stringify(errors)),
  );

  remainingCountry--;
}
