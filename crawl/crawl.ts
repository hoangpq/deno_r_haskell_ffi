import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std@0.144.0/testing/asserts.ts";

let resp = await fetch("https://www.theswiftcodes.com", {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36", // ChromeのUser-Agent
  },
});

const countryDoc = new DOMParser().parseFromString(
  `
<div class="selectize-dropdown-content" tabindex="-1"><div class="option" data-selectable="" data-value="AL">ALBANIA</div><div class="option" data-selectable="" data-value="DZ">ALGERIA</div><div class="option" data-selectable="" data-value="AS">AMERICAN SAMOA</div><div class="option" data-selectable="" data-value="AD">ANDORRA</div><div class="option" data-selectable="" data-value="AO">ANGOLA</div><div class="option" data-selectable="" data-value="AI">ANGUILLA</div><div class="option" data-selectable="" data-value="AG">ANTIGUA AND BARBUDA</div><div class="option" data-selectable="" data-value="AR">ARGENTINA</div><div class="option" data-selectable="" data-value="AM">ARMENIA</div><div class="option" data-selectable="" data-value="AW">ARUBA</div><div class="option" data-selectable="" data-value="AU">AUSTRALIA</div><div class="option" data-selectable="" data-value="AT">AUSTRIA</div><div class="option" data-selectable="" data-value="AZ">AZERBAIJAN</div><div class="option" data-selectable="" data-value="BS">BAHAMAS</div><div class="option" data-selectable="" data-value="BH">BAHRAIN</div><div class="option" data-selectable="" data-value="BD">BANGLADESH</div><div class="option" data-selectable="" data-value="BB">BARBADOS</div><div class="option" data-selectable="" data-value="BY">BELARUS</div><div class="option" data-selectable="" data-value="BE">BELGIUM</div><div class="option" data-selectable="" data-value="BZ">BELIZE</div><div class="option" data-selectable="" data-value="BJ">BENIN</div><div class="option" data-selectable="" data-value="BM">BERMUDA</div><div class="option" data-selectable="" data-value="BT">BHUTAN</div><div class="option" data-selectable="" data-value="BO">BOLIVIA</div><div class="option" data-selectable="" data-value="BQ">BONAIRE</div><div class="option" data-selectable="" data-value="BA">BOSNIA AND HERZEGOVINA</div><div class="option" data-selectable="" data-value="BW">BOTSWANA</div><div class="option" data-selectable="" data-value="BR">BRAZIL</div><div class="option" data-selectable="" data-value="BN">BRUNEI</div><div class="option" data-selectable="" data-value="BG">BULGARIA</div><div class="option" data-selectable="" data-value="BF">BURKINA FASO</div><div class="option" data-selectable="" data-value="KH">CAMBODIA</div><div class="option" data-selectable="" data-value="CM">CAMEROON</div><div class="option" data-selectable="" data-value="CA">CANADA</div><div class="option" data-selectable="" data-value="CV">CAPE VERDE</div><div class="option" data-selectable="" data-value="KY">CAYMAN ISLANDS</div><div class="option" data-selectable="" data-value="CL">CHILE</div><div class="option" data-selectable="" data-value="CN">CHINA</div><div class="option" data-selectable="" data-value="CO">COLOMBIA</div><div class="option" data-selectable="" data-value="KM">COMOROS</div><div class="option" data-selectable="" data-value="CK">COOK ISLANDS</div><div class="option" data-selectable="" data-value="CR">COSTA RICA</div><div class="option" data-selectable="" data-value="CI">COTE DIVOIRE</div><div class="option" data-selectable="" data-value="HR">CROATIA</div><div class="option" data-selectable="" data-value="CW">CURACAO</div><div class="option" data-selectable="" data-value="CY">CYPRUS</div><div class="option" data-selectable="" data-value="CZ">CZECH REPUBLIC</div><div class="option" data-selectable="" data-value="DK">DENMARK</div><div class="option" data-selectable="" data-value="DJ">DJIBOUTI</div><div class="option" data-selectable="" data-value="DM">DOMINICA</div><div class="option" data-selectable="" data-value="DO">DOMINICAN REPUBLIC</div><div class="option" data-selectable="" data-value="EC">ECUADOR</div><div class="option" data-selectable="" data-value="EG">EGYPT</div><div class="option" data-selectable="" data-value="SV">EL SALVADOR</div><div class="option" data-selectable="" data-value="GQ">EQUATORIAL GUINEA</div><div class="option" data-selectable="" data-value="EE">ESTONIA</div><div class="option" data-selectable="" data-value="ET">ETHIOPIA</div><div class="option" data-selectable="" data-value="FK">FALKLAND ISLANDS</div><div class="option" data-selectable="" data-value="FO">FAROE ISLANDS</div><div class="option" data-selectable="" data-value="FJ">FIJI</div><div class="option" data-selectable="" data-value="FI">FINLAND</div><div class="option" data-selectable="" data-value="FR">FRANCE</div><div class="option" data-selectable="" data-value="PF">FRENCH POLYNESIA</div><div class="option" data-selectable="" data-value="GA">GABON</div><div class="option" data-selectable="" data-value="GM">GAMBIA</div><div class="option" data-selectable="" data-value="GE">GEORGIA</div><div class="option" data-selectable="" data-value="DE">GERMANY</div><div class="option" data-selectable="" data-value="GH">GHANA</div><div class="option" data-selectable="" data-value="GI">GIBRALTAR</div><div class="option" data-selectable="" data-value="GR">GREECE</div><div class="option" data-selectable="" data-value="GL">GREENLAND</div><div class="option" data-selectable="" data-value="GD">GRENADA</div><div class="option" data-selectable="" data-value="GP">GUADELOUPE</div><div class="option" data-selectable="" data-value="GU">GUAM</div><div class="option" data-selectable="" data-value="GT">GUATEMALA</div><div class="option" data-selectable="" data-value="GG">GUERNSEY</div><div class="option" data-selectable="" data-value="GN">GUINEA</div><div class="option" data-selectable="" data-value="GW">GUINEA BISSAU</div><div class="option" data-selectable="" data-value="GY">GUYANA</div><div class="option" data-selectable="" data-value="HT">HAITI</div><div class="option" data-selectable="" data-value="HN">HONDURAS</div><div class="option" data-selectable="" data-value="HK">HONG KONG</div><div class="option" data-selectable="" data-value="HU">HUNGARY</div><div class="option" data-selectable="" data-value="IS">ICELAND</div><div class="option" data-selectable="" data-value="IN">INDIA</div><div class="option" data-selectable="" data-value="ID">INDONESIA</div><div class="option" data-selectable="" data-value="IE">IRELAND</div><div class="option" data-selectable="" data-value="IM">ISLE OF MAN</div><div class="option" data-selectable="" data-value="IL">ISRAEL</div><div class="option" data-selectable="" data-value="IT">ITALY</div><div class="option" data-selectable="" data-value="JM">JAMAICA</div><div class="option" data-selectable="" data-value="JP">JAPAN</div><div class="option" data-selectable="" data-value="JE">JERSEY</div><div class="option" data-selectable="" data-value="JO">JORDAN</div><div class="option" data-selectable="" data-value="KZ">KAZAKHSTAN</div><div class="option" data-selectable="" data-value="KE">KENYA</div><div class="option" data-selectable="" data-value="KI">KIRIBATI</div><div class="option" data-selectable="" data-value="XK">KOSOVO</div><div class="option" data-selectable="" data-value="KW">KUWAIT</div><div class="option" data-selectable="" data-value="KG">KYRGYZSTAN</div><div class="option" data-selectable="" data-value="LA">LAOS</div><div class="option" data-selectable="" data-value="LV">LATVIA</div><div class="option" data-selectable="" data-value="LB">LEBANON</div><div class="option" data-selectable="" data-value="LS">LESOTHO</div><div class="option" data-selectable="" data-value="LR">LIBERIA</div><div class="option" data-selectable="" data-value="LI">LIECHTENSTEIN</div><div class="option" data-selectable="" data-value="LT">LITHUANIA</div><div class="option" data-selectable="" data-value="LU">LUXEMBOURG</div><div class="option" data-selectable="" data-value="MO">MACAO</div><div class="option" data-selectable="" data-value="MK">MACEDONIA</div><div class="option" data-selectable="" data-value="MG">MADAGASCAR</div><div class="option" data-selectable="" data-value="MW">MALAWI</div><div class="option" data-selectable="" data-value="MY">MALAYSIA</div><div class="option" data-selectable="" data-value="MV">MALDIVES</div><div class="option" data-selectable="" data-value="ML">MALI</div><div class="option" data-selectable="" data-value="MT">MALTA</div><div class="option" data-selectable="" data-value="MH">MARSHALL ISLANDS</div><div class="option" data-selectable="" data-value="MQ">MARTINIQUE</div><div class="option" data-selectable="" data-value="MR">MAURITANIA</div><div class="option" data-selectable="" data-value="MU">MAURITIUS</div><div class="option" data-selectable="" data-value="YT">MAYOTTE</div><div class="option" data-selectable="" data-value="MX">MEXICO</div><div class="option" data-selectable="" data-value="MD">MOLDOVA</div><div class="option" data-selectable="" data-value="MC">MONACO</div><div class="option" data-selectable="" data-value="MN">MONGOLIA</div><div class="option" data-selectable="" data-value="ME">MONTENEGRO</div><div class="option" data-selectable="" data-value="MS">MONTSERRAT</div><div class="option" data-selectable="" data-value="MA">MOROCCO</div><div class="option" data-selectable="" data-value="MZ">MOZAMBIQUE</div><div class="option" data-selectable="" data-value="MM">MYANMAR</div><div class="option" data-selectable="" data-value="NA">NAMIBIA</div><div class="option" data-selectable="" data-value="NP">NEPAL</div><div class="option" data-selectable="" data-value="NL">NETHERLANDS</div><div class="option" data-selectable="" data-value="NC">NEW CALEDONIA</div><div class="option" data-selectable="" data-value="NZ">NEW ZEALAND</div><div class="option" data-selectable="" data-value="NI">NICARAGUA</div><div class="option" data-selectable="" data-value="NE">NIGER</div><div class="option" data-selectable="" data-value="NG">NIGERIA</div><div class="option" data-selectable="" data-value="MP">NORTHERN MARIANA ISLANDS</div><div class="option" data-selectable="" data-value="NO">NORWAY</div><div class="option" data-selectable="" data-value="OM">OMAN</div><div class="option" data-selectable="" data-value="PK">PAKISTAN</div><div class="option" data-selectable="" data-value="PW">PALAU</div><div class="option" data-selectable="" data-value="PS">PALESTINE</div><div class="option" data-selectable="" data-value="PA">PANAMA</div><div class="option" data-selectable="" data-value="PG">PAPUA NEW GUINEA</div><div class="option" data-selectable="" data-value="PY">PARAGUAY</div><div class="option" data-selectable="" data-value="PE">PERU</div><div class="option" data-selectable="" data-value="PH">PHILIPPINES</div><div class="option" data-selectable="" data-value="PL">POLAND</div><div class="option" data-selectable="" data-value="PT">PORTUGAL</div><div class="option" data-selectable="" data-value="PR">PUERTO RICO</div><div class="option" data-selectable="" data-value="QA">QATAR</div><div class="option" data-selectable="" data-value="RE">REUNION</div><div class="option" data-selectable="" data-value="RO">ROMANIA</div><div class="option" data-selectable="" data-value="RU">RUSSIA</div><div class="option" data-selectable="" data-value="RW">RWANDA</div><div class="option" data-selectable="" data-value="SH">SAINT HELENA</div><div class="option" data-selectable="" data-value="KN">SAINT KITTS AND NEVIS</div><div class="option" data-selectable="" data-value="LC">SAINT LUCIA</div><div class="option" data-selectable="" data-value="WS">SAMOA</div><div class="option" data-selectable="" data-value="SM">SAN MARINO</div><div class="option" data-selectable="" data-value="ST">SAO TOME AND PRINCIPE</div><div class="option" data-selectable="" data-value="SA">SAUDI ARABIA</div><div class="option" data-selectable="" data-value="SN">SENEGAL</div><div class="option" data-selectable="" data-value="RS">SERBIA</div><div class="option" data-selectable="" data-value="SC">SEYCHELLES</div><div class="option" data-selectable="" data-value="SL">SIERRA LEONE</div><div class="option" data-selectable="" data-value="SG">SINGAPORE</div><div class="option" data-selectable="" data-value="SX">SINT MAARTEN</div><div class="option" data-selectable="" data-value="SK">SLOVAKIA</div><div class="option" data-selectable="" data-value="SI">SLOVENIA</div><div class="option" data-selectable="" data-value="SB">SOLOMON ISLANDS</div><div class="option" data-selectable="" data-value="ZA">SOUTH AFRICA</div><div class="option" data-selectable="" data-value="KR">SOUTH KOREA</div><div class="option" data-selectable="" data-value="SS">SOUTH SUDAN</div><div class="option" data-selectable="" data-value="ES">SPAIN</div><div class="option" data-selectable="" data-value="LK">SRI LANKA</div><div class="option" data-selectable="" data-value="VC">ST VINCENT AND GRENADINES</div><div class="option" data-selectable="" data-value="SD">SUDAN</div><div class="option" data-selectable="" data-value="SR">SURINAME</div><div class="option" data-selectable="" data-value="SZ">SWAZILAND</div><div class="option" data-selectable="" data-value="SE">SWEDEN</div><div class="option" data-selectable="" data-value="CH">SWITZERLAND</div><div class="option" data-selectable="" data-value="TW">TAIWAN</div><div class="option" data-selectable="" data-value="TJ">TAJIKISTAN</div><div class="option" data-selectable="" data-value="TZ">TANZANIA</div><div class="option" data-selectable="" data-value="TH">THAILAND</div><div class="option" data-selectable="" data-value="TL">TIMOR LESTE</div><div class="option" data-selectable="" data-value="TG">TOGO</div><div class="option" data-selectable="" data-value="TO">TONGA</div><div class="option" data-selectable="" data-value="TT">TRINIDAD AND TOBAGO</div><div class="option" data-selectable="" data-value="TN">TUNISIA</div><div class="option" data-selectable="" data-value="TR">TURKEY</div><div class="option" data-selectable="" data-value="TM">TURKMENISTAN</div><div class="option" data-selectable="" data-value="TC">TURKS AND CAICOS ISLANDS</div><div class="option" data-selectable="" data-value="TV">TUVALU</div><div class="option" data-selectable="" data-value="UG">UGANDA</div><div class="option" data-selectable="" data-value="UA">UKRAINE</div><div class="option" data-selectable="" data-value="AE">UNITED ARAB EMIRATES</div><div class="option" data-selectable="" data-value="GB">UNITED KINGDOM</div><div class="option" data-selectable="" data-value="US">UNITED STATES</div><div class="option" data-selectable="" data-value="UY">URUGUAY</div><div class="option" data-selectable="" data-value="UZ">UZBEKISTAN</div><div class="option" data-selectable="" data-value="VU">VANUATU</div><div class="option" data-selectable="" data-value="VA">VATICAN CITY</div><div class="option" data-selectable="" data-value="VN">VIETNAM</div><div class="option" data-selectable="" data-value="VG">VIRGIN ISLANDS UK</div><div class="option" data-selectable="" data-value="WF">WALLIS AND FUTUNA ISLANDS</div><div class="option" data-selectable="" data-value="ZM">ZAMBIA</div><div class="option" data-selectable="" data-value="ZW">ZIMBABWE</div></div>
`,
  "text/html",
);

const content = await resp.text();
const document = new DOMParser().parseFromString(content, "text/html");

assert(document);
assert(countryDoc);

const childNodes = countryDoc?.querySelectorAll("div.option");
assert(childNodes);

interface ICountry {
  code?: string;
  name?: string;
}

/*childNodes.forEach((elem: unknown) => {
  const _elem = elem as HTMLElement;
  countryList.push({
    'code': _elem.getAttribute('data-value'),
    'name': _elem.textContent
  });
});*/

// await Deno.writeFile("./countryList.json", new TextEncoder().encode(JSON.stringify(countryList)));

const countryDate = new TextDecoder().decode(
  await Deno.readFile("./countryList.json"),
);
const countryList = JSON.parse(countryDate) as ICountry[];

console.log(countryList);

// function
async function loadBankInCountry(countryCode: string) {
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
      "body": `input=country&country=${countryCode}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include",
    },
  );
  return await resp.json();
}

let bankMap: Record<string, ICountry[]> = {};

for await (const country of countryList) {
  console.log(country);
  const banks = await loadBankInCountry(country.code!!);
  console.log(banks);
  bankMap[country.code!!] = banks;
}

Deno.writeFile(
  "./bankMap.json",
  new TextEncoder().encode(JSON.stringify(bankMap)),
);
