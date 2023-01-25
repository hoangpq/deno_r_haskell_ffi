import requests
import time
import sys
from torrequest import TorRequest

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
}

# Default Tor port configuration
proxyPort = 9050
ctrlPort = 9051
site = "https://c-share.deno.dev/"
blog = 10

if __name__ == '__main__':
    # with TorRequest(proxy_port=proxyPort, ctrl_port=ctrlPort, password=None) as tr:
    #     for i in range(blog):
    #         response = tr.get(site, headers=headers, verify=False)
    #         print(tr.get('http://ipecho.net/plain').content)
    #         tr.reset_identity()
    with TorRequest() as tr:
        response = tr.get('http://ipecho.net/plain')
        print(response.text)  # not your IP address
