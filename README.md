# playwright-webkit-websocket-hang
Sample code to reproduce Websocket connection hangs with Playwright on WebKit.

# Setup

The reproduction case is a bit complex in that it requires an HTTP proxy 
between Playwright and the Websocket server, but in order to maximize the 
chance of reproducing the bug, it's best for the browser and proxy to run 
on separate hosts. The way I've been able to reproduce the issue most reliably 
is by running [mitmproxy](https://mitmproxy.org/) on my workstation and then 
executing the Playwright test inside a Ubuntu virtual machine.

## Proxy

I've reproduced the issue using two different proxy servers:

* [mitmproxy](https://mitmproxy.org/)
* [LittleProxy](https://github.com/LittleProxy/LittleProxy)

I suspect that the actual proxy server used does not matter for the purposes 
of reproducing the bug becuase the issue seems to be on the WebKit and/or 
Playwright side.

To use `mitmproxy`, start it up on the host machine. I prefer to use the 
`mitmdump` variant:

```
mitmdump -p 8080
```

## Node

Start up a virtual machine running a Linux distribution such as Ubuntu, 
install [nvm](https://github.com/nvm-sh/nvm), check out this repository, 
and install dependencies:

```
nvm use
npm ci
```

## Playwright

Install Playwright dependencies:

```
npx playwright install
```

## Reproducing the bug

Once you have a proxy running and the virutal machine ready, edit 
[socketsbay.js](socketsbay.js#L11) and substitute your host IP in for the IP 
of the proxy server. Next, run the test a single time to verify that 
everything is configured correctly:

```
node socketsbay.js
```

Next, use the `test.sh` script to run the Playwright test in a loop until it 
hangs. I usually observe the bug in fewer than 10 iterations.

```
./test.sh socketsbay.js
```

