import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters(); // remove default reporter logs
jasmine.getEnv().addReporter(
    new SpecReporter({
        // add jasmine-spec-reporter
        spec: {
            displayPending: true,
        },
    }) as unknown as jasmine.CustomReporter,
);
