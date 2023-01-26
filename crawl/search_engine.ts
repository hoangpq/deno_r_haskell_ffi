// import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import {
  DOMParser,
  initParser,
} from "https://deno.land/x/deno_dom/deno-dom-wasm-noinit.ts";
import { assert } from "https://deno.land/std@0.157.0/testing/asserts.ts";

(async () => {
  // initialize when you need it, but not at the top level
  await initParser();

  const resp = await fetch(
    "https://duckduckgo.com/?q=Up_and_Running_with_Remix.rar+site%3Arapidgator.net&t=brave&ia=web",
  );
  const text = await resp.text();

  console.log(text);
  const doc = new DOMParser().parseFromString(text, "text/html");

  assert(doc);
  const results = doc.querySelectorAll("article");

  console.log(results.length);
})();
