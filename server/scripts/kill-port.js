const { exec } = require("child_process");
const net = require("net");

const PORT = process.env.PORT || 5000;

const checkPort = (port) => {
    return new Promise((resolve) => {
        const server = net.createServer()
            .once("error", (err) => {
                if (err.code === "EADDRINUSE") {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .once("listening", () => {
                server.close();
                resolve(false);
            })
            .listen(port);
    });
};

const killPort = async () => {
    const inUse = await checkPort(PORT);
    if (!inUse) {
        process.exit(0);
    }

    console.log(`[predev] Port ${PORT} is in use. Cleaning up...`);

    if (process.platform === "win32") {
        exec(`netstat -ano | findstr :${PORT}`, (err, stdout) => {
            if (err || !stdout) {
                process.exit(0);
            }
            
            const lines = stdout.trim().split("\n");
            const pids = new Set();
            lines.forEach((line) => {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                if (pid && !isNaN(pid) && pid !== "0") {
                    pids.add(parseInt(pid, 10));
                }
            });

            if (pids.size === 0) {
                process.exit(0);
            }

            let killedCount = 0;
            const pidsArray = Array.from(pids);
            pidsArray.forEach((pid) => {
                exec(`taskkill /F /PID ${pid}`, (killErr) => {
                    killedCount++;
                    if (killedCount === pidsArray.length) {
                        setTimeout(() => process.exit(0), 1000);
                    }
                });
            });
        });
    } else {
        exec(`lsof -t -i:${PORT}`, (err, stdout) => {
            if (err || !stdout) {
                process.exit(0);
            }

            const pids = stdout.trim().split("\n").map(p => p.trim()).filter(Boolean);
            if (pids.length === 0) {
                process.exit(0);
            }

            let killedCount = 0;
            pids.forEach((pid) => {
                exec(`kill -9 ${pid}`, (killErr) => {
                    killedCount++;
                    if (killedCount === pids.length) {
                        setTimeout(() => process.exit(0), 1000);
                    }
                });
            });
        });
    }
};

killPort();
