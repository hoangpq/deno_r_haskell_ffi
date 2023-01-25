const res = await fetch(
  "https://c-share.deno.dev",
  {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    },
    // keepalive: true,
  },
);

console.log(`Response http: ${await res.text()}`);
