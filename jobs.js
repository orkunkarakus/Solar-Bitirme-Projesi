const schedule = require('node-schedule');
const { exec } = require("child_process");

const jobRule = new schedule.RecurrenceRule();
jobRule.minute = 0;
jobRule.second = 2;

const getAllDetails = async () => {
    return await new Promise((resolve, reject) => {
        exec("axpert-query -c QPIGS", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                resolve({ status: false })
                return;
            }
            if (stderr) {
                resolve({ status: false })
                console.log(`stderr: ${stderr}`);
                return;
            }
            resolve({ status: true, data: stdout })
            console.log(`stdout: ${stdout}`);
        });
    });
}

module.exports = { jobRule, schedule, getAllDetails };