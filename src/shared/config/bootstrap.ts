import connectDB from '../database/setup';

async function init() {
    connectDB();
}

export default { init };
