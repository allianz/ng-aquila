export function createMissingDateImplError(provider: string) {
    return Error(
        `NxDatepicker: No provider found for ${provider}. You must import one of the following ` +
            `modules at your application root: NxNativeDateModule, NxMomentDateModule, or provide a ` +
            `custom implementation.`,
    );
}
