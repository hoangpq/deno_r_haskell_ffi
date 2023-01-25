import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import _ from "lodash";

interface ICountry {
  code?: string;
  name?: string;
}

const countryData = new TextDecoder().decode(
  await Deno.readFile("./countryList.json"),
);
const countryList = JSON.parse(countryData) as ICountry[];

// console.log(countryList);

let dataStream = new TextDecoder().decode(
  await Deno.readFile("./bankMap.json"),
);
let bankMap = JSON.parse(dataStream) as Record<
  string,
  Record<string, string>[]
>;

let branch: Record<string, string[]>;

async function loadBranch(countryCode: string, bankName: string) {
  const resp = await fetch(
    "https://www.theswiftcodes.com/ajax/code-finder.ajax.php",
    {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
      },
      "referrer": "https://www.theswiftcodes.com/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": `input=bank&country=${countryCode}&bank=${encodeURI(bankName)}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include",
    },
  );
  return await resp.json();
}

async function loadSwiftCode(
  countryCode: string,
  bankName: string,
  branchName: string,
) {
  const resp = await fetch(
    "https://www.theswiftcodes.com/ajax/code-finder.ajax.php",
    {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
      },
      "referrer": "https://www.theswiftcodes.com/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": `input=city&country=${countryCode}&bank=${
        encodeURI(bankName)
      }&city=${encodeURI(branchName)}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include",
    },
  );
  return await resp.json();
}

async function sleep(duration: number) {
  return await new Promise((resolve) => {
    setTimeout(() => resolve(null), duration * 1000);
  });
}

interface Branch {
  country: string;
  bank: string;
  branch: string;
}

interface Swift {
  country: string;
  bank: string;
  branch: string;
  swift: string[];
}

type R = Record<string, string>;

const fileList: string[] = [];
for await (const dirEntry of Deno.readDir("dist")) {
  if (dirEntry.isFile) {
    fileList.push(dirEntry.name.replace(".json", ""));
  }
}

const countriesToWrite = Object.keys(bankMap)
  .filter((countryCode: string) => !fileList.includes(countryCode));

let remainingCountry = countriesToWrite.length;

async function getSwiftCodes(country: string, bank: R) {
  return await loadBranch(country, bank.value)
    .then((branches) => {
      return Promise.all(
        branches.map(async (branch: R) => {
          const swiftCodeList = await loadSwiftCode(
            country,
            bank.value,
            branch.value,
          );
          return {
            country,
            bank: bank.value,
            branch: branch.value,
            swift: swiftCodeList.map((swift: R) => swift.value),
          } as Swift;
        }),
      );
    });
}

let errorBuffer = new TextDecoder().decode(
  await Deno.readFile("./errors.json"),
);
let errors = JSON.parse(errorBuffer) as R[];

console.log(errors);

for await (const country of countriesToWrite) {
  console.log("Remaining countries: ", remainingCountry);
  let swiftCodeList: Swift[] = [];
  for await (const banks of _.chunk(bankMap[country], 5)) {
    try {
      const _list: R[] = await Promise.all(
        banks.map((bank: R) => getSwiftCodes(country, bank)),
      );
      swiftCodeList = swiftCodeList.concat(_list.flatMap(_.identity));
      console.log(country, swiftCodeList.length);
    } catch (e: any) {
      console.log(banks);
      console.log(e.message);
      errors = errors.concat(banks.map((bank: R) => ({ ...bank, country })));
    }
  }
  console.log(`Writing to file dist/${country}.json`);
  await Deno.writeFile(
    `dist/${country}.json`,
    new TextEncoder().encode(JSON.stringify(swiftCodeList)),
  );
  await Deno.writeFile(
    "errors.json",
    new TextEncoder().encode(JSON.stringify(errors)),
  );
  remainingCountry--;
}
