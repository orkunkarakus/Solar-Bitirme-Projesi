const { getAllDetails } = require("./jobs");
const { sleep } = require("./utils");

const test = async () => { // get 3 data from inverter with delay
    const call = async()=>{
        const data = await getAllDetails();
        console.log(data);
    }
    await call();
    await sleep(1500);
    await call();
    await sleep(1500);
    await call();
}

test();