import { python } from "https://deno.land/x/python@0.2.2/mod.ts";

const sys = python.import("sys");
sys.path.append(".");
sys.path.append("/Users/hoangpq/CLionProjects/r-binding/sp");
const spacy = python.import("sp.main");

const text =
  `Bootstrap a New Next.js Application with Tailwind using create-next-app`;
console.log(spacy.parse(text));
