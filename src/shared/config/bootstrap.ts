import connectDB from '../database/setup.js';

async function init() {
    connectDB();
}

export default { init };
