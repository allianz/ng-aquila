import { EventEmitter } from '@angular/core';

/**
 * Class used to keep track of the current states of the file.
 */
export class FileItem {
    /** The actual file data. */
    file: File | null;

    /** Sets the name of the file. */
    name: string;

    private readonly _size: number;
    private readonly _type: string;

    /** Whether the file is being uploaded at the moment. */
    isUploading = false;

    /** Whether the file was successfully uploaded. */
    isUploaded = false;

    /** Whether an error occured when uploading the file. */
    isError = false;

    /** Sets the index of the file. */
    index = 0;

    /**
     * Emits the FileItem on changed.
     */
    readonly onChange = new EventEmitter<FileItem>();

    constructor(file: File, index = 0) {
        this.file = file;
        this.name = file.name;
        this._size = file.size;
        this._type = file.type;
        this.index = index;
    }

    /** Returns the file size in bytes */
    get size(): number {
        return this._size;
    }

    /** Returns the file type */
    get type(): string {
        return this._type;
    }

    /**
     * Sets the file to a uploaded state.
     */
    setUploadedState() {
        this.isUploaded = true;
        this.isUploading = false;
        this.isError = false;
        this.onChange.emit(this);
    }

    /**
     * Sets the file to a 'upload-in-progress' state.
     */
    setUploadingState() {
        this.isUploaded = false;
        this.isUploading = true;
        this.isError = false;
        this.onChange.emit(this);
    }

    /**
     * Sets the file to an error state.
     */
    setErrorState() {
        this.isUploaded = false;
        this.isUploading = false;
        this.isError = true;
        this.onChange.emit(this);
    }
}
