import 'jasmine-core/lib/jasmine-core/boot.js';
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import './app/aquila-docs-example.spec';
import './test.ts';
import './test/jasmine-setup';

(function bootstrap() {
    if ((window as any).jasmineRef) {
        location.reload();

        return;
    }

    window.onload!(new Event('anything'));
    (window as any).jasmineRef = jasmine.getEnv();
})();
