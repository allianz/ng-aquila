import { Observable } from 'rxjs';

const chokidar = require('chokidar');

export interface RxWatchData {
    event: string;
    name: string;
}

export function rxWatcher(pattern, options) {
    const watcher = chokidar.watch(pattern, options);

    const chokidarObservable = new Observable(observer => {
        const nextItem = event => name =>
            observer.next({
                event,
                name: name.replace(/\\/g, '/'),
            } as RxWatchData);

        ['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach(event => {
            watcher.on(event, nextItem(event));
        });

        watcher.on('error', err => {
            observer.error(err);
            watcher.close();
        });
    });

    return {
        chokidarObservable,
        watcher,
    };
}
