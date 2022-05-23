
require('dotenv').config();
var io = require('socket.io-client');
const { jobRule, schedule, getAllDetails } = require('./jobs');

var mainJob = null;

const socketURL = process.env.SOCKET_URL;
const TEST = process.env.TEST === "TRUE";
var socket = io.connect(socketURL, { reconnect: true });

const startJob = () => {
    if (mainJob) {
        mainJob.cancel();
    }
    else {
        mainJob = schedule.scheduleJob(jobRule, async function () {
            const data = await getAllDetails();
            if (data.status) {
                socket.emit('deviceData', { device_id: 1, data: data.data });
            }
        });
    }
}

const stopJob = () => {
    if (mainJob) {
        mainJob.cancel();
    }
}

const testSender = () => {
    socket.emit('deviceData', {
        device_id: 1, data: {
            "gridVoltage": Math.random(),
            "gridFrequency": Math.random(),
            "outputVoltage": Math.random(),
            "outputFrequency": Math.random(),
            "outputPowerApparent": Math.random(),
            "outputPowerActive": Math.random(),
            "outputLoadPercent": 8,
            "busVoltage": Math.random(),
            "batteryVoltage": 52.9,
            "batteryChargingCurrent": 0,
            "batteryCapacity": Math.random(),
            "temperature": Math.random(),
            "pvBatteryCurrent": 0,
            "pvInputVoltage": 0,
            "batteryVoltageSCC": 0,
            "batteryDischargeCurrent": 6,
            "status": {
                "addSBUPriorityVersion": Math.round(Math.random()) % 2 === 0 ? false : true,
                "configChanged": Math.round(Math.random()) % 2 === 0 ? false : true,
                "sccFirmwareUpdates": Math.round(Math.random()) % 2 === 0 ? false : true,
                "loadOn": Math.round(Math.random()) % 2 === 0 ? false : true,
                "batteryVoltToSteady": Math.random() % 2 === 0 ? false : true,
                "charging": Math.round(Math.random()) % 2 === 0 ? false : true,
                "chargingSCC": Math.random() % 2 === 0 ? false : true,
                "chargingAC": Math.random() % 2 === 0 ? false : true
            },
            "pvPower": 241
        }
    });
}

socket.on('connect', function () {
    console.log('connected');
    socket.emit('clientInfo', { device_id: 1 }); //cihazla ilgili bilgiler bağlantı esnasında sockete gönderilir. Static cihaz id si vs.
    if (TEST) {
        setInterval(() => {
            testSender();
        }, 2000)
    }
    else {
        startJob();
    }

});

socket.on("disconnect", () => {
    console.log("disconnected");
    stopJob();
});