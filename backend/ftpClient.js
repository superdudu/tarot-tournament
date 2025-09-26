import ftp from "basic-ftp";
import fs from "fs";

async function withFTP(fn) {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT ? Number(process.env.FTP_PORT) : 21,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      secure: process.env.FTP_SECURE === "true"
    });
    return await fn(client);
  } finally {
    client.close();
  }
}

export async function readJSON(remotePath) {
  return withFTP(async client => {
    const tmp = `/tmp/${Date.now()}-tmp.json`;
    await client.downloadTo(tmp, remotePath);
    const content = fs.readFileSync(tmp, "utf-8");
    fs.unlinkSync(tmp);
    return JSON.parse(content || "null");
  });
}

export async function writeJSON(remotePath, json) {
  return withFTP(async client => {
    const tmp = `/tmp/${Date.now()}-tmp.json`;
    fs.writeFileSync(tmp, JSON.stringify(json, null, 2));
    await client.uploadFrom(tmp, remotePath);
    fs.unlinkSync(tmp);
    return true;
  });
}