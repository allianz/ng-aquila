import { EventEmitter } from '@angular/core';

/**
 * Class used to keep track of the current states of the file
 */

export class FileItem {
    /** The actual file data. */
    public file: File | null;

    /** Sets the name of the file. */
    public name: string;

    private _size: number;
    private _type: string;

    /** Whether the file is being uploaded at the moment. */
    public isUploading: boolean = false;

    /** Whether the file was successfully uploaded. */
    public isUploaded: boolean = false;

    /** Whether an error occured when uploading the file. */
    public isError: boolean = false;

    /** Sets the index of the file. */
    public index: number = 0;

    /**
     * emits the FileItem on changed
     */
    public onChange: EventEmitter<FileItem> = new EventEmitter<FileItem>();

    public constructor(file: File, index: number = 0) {
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
     * sets the file to a uploaded state
     */
    setUploadedState() {
        this.isUploaded = true;
        this.isUploading = false;
        this.isError = false;
        this.onChange.emit(this);
    }

    /**
     * sets the file to a 'upload-in-progress' state
     */
    setUploadingState() {
        this.isUploaded = false;
        this.isUploading = true;
        this.isError = false;
        this.onChange.emit(this);
    }

    /**
     * sets the file to an error state
     */
    setErrorState() {
        this.isUploaded = false;
        this.isUploading = false;
        this.isError = true;
        this.onChange.emit(this);
    }
}
