import * as server from './.vercel/output/functions/_render.func/dist/server/entry.mjs';

async function test() {
  const handler = server.default || server.app;
  if (!handler) {
    console.log("No handler found");
    return;
  }
  
  // Create a mock request/response for Vercel
  const req = {
    url: '/destinos',
    method: 'GET',
    headers: { host: 'localhost:3000' },
    socket: {}
  };
  
  const res = {
    statusCode: 200,
    setHeader: (k, v) => {},
    end: (chunk) => {
      console.log("Response ended");
      if (chunk) console.log(chunk.toString().substring(0, 200));
    }
  };
  
  try {
    console.log("Calling handler...");
    await handler(req, res);
    console.log("Handler finished with status:", res.statusCode);
  } catch (err) {
    console.error("Crash:", err);
  }
}

test();
