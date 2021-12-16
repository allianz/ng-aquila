declare namespace jasmine {
    interface AsyncMatchers<T, U> {
        toBeAccessible<T, U>(): boolean;
    }
}
