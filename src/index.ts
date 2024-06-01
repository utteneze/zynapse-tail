import { ExpressServer as Server } from './shared/webserver/server';
import bootstrap from './shared/config/bootstrap';
import environment from './shared/config/environment';
import notifier from 'node-notifier';

const start = async () => {
    try {
        await bootstrap.init();
        const port = environment.PORT || 3001;
        const server = new Server(port);
        // todo:
        //  setupStatus(server.app)
        //  setupDatabaseStatus(server.app, mongoose);
        server.run(() => {
            notifier.notify({
                title: 'Server Started',
                message: 'Zynapse backend API is running.',
                icon: 'logo.png',
            });
            console.log('');
            console.log(
                '███████╗██╗   ██╗███╗   ██╗ █████╗ ██████╗ ███████╗███████╗'
            );
            console.log(
                '╚══███╔╝╚██╗ ██╔╝████╗  ██║██╔══██╗██╔══██╗██╔════╝██╔════╝'
            );
            console.log(
                '  ███╔╝  ╚████╔╝ ██╔██╗ ██║███████║██████╔╝███████╗█████╗  '
            );
            console.log(
                ' ███╔╝    ╚██╔╝  ██║╚██╗██║██╔══██║██╔═══╝ ╚════██║██╔══╝  '
            );
            console.log(
                '███████╗   ██║   ██║ ╚████║██║  ██║██║     ███████║███████╗'
            );
            console.log(
                '╚══════╝   ╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝'
            );
            console.log(
                `[ Zynapse API :: Backend APIs ][PRIMARY] is listening on http://localhost:${port}`
            );
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
