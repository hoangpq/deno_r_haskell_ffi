const PORTS = [
  9050,
  9052,
  9053,
  9054,
  9055,
  9056,
  9057,
  9058,
  9059,
  9060,
  9061
]

for (const port of PORTS) {
  Deno.spawn(Deno.execPath(), {
    args: [
      "run",
      "-A",
      "--unstable",
      "request_ip.ts",
    ],
    env: {
      HTTPS_PROXY: `socks5://127.0.0.1:${port}`
    },
  });
}
