import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'nx-file-uploader-drop-zone',
    templateUrl: './file-uploader-drop-zone.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./file-uploader-drop-zone.component.scss'],
    host: {
        '[class.is-active]': 'active',
        '[class.is-disabled]': 'disabled',
    },
})
export class NxFileUploaderDropZoneComponent {
    /** An event emitted when files were dropped. */
    @Output() fileDropped: EventEmitter<File[]> = new EventEmitter<File[]>();

    // flag when the drop zone is hovered
    private _active = false;
    private _disabled = false;

    constructor(private _cdr: ChangeDetectorRef) {}

    /** Whether the file uploader is disabled. */
    @Input()
    set disabled(value: boolean) {
        this._disabled = value;
        this._cdr.markForCheck();
    }

    get disabled(): boolean {
        return this._disabled;
    }

    /** @docs-private */
    @HostListener('drop', ['$event'])
    onDrop(event: any): void {
        event.preventDefault();

        if (this.disabled) {
            event.dataTransfer.dropEffect = 'no-drop';
        } else {
            const { dataTransfer } = event;

            if (dataTransfer.items) {
                const files = [];
                for (let i = 0; i < dataTransfer.items.length; i++) {
                    files.push(dataTransfer.items[i].getAsFile());
                }

                dataTransfer.items.clear();
                this.fileDropped.emit(files);
            } else {
                const files = dataTransfer.files;
                dataTransfer.clearData();
                this.fileDropped.emit(Array.from(files));
            }

            this._active = false;
        }
    }

    /** @docs-private */
    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();

        if (this.disabled) {
            event.dataTransfer!.dropEffect = 'none';
        } else {
            event.dataTransfer!.dropEffect = 'copy';
            this._active = true;
            this._cdr.markForCheck();
        }
    }

    /** @docs-private */
    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent) {
        this._active = false;
        event.dataTransfer!.dropEffect = 'none';
        this._cdr.markForCheck();
    }

    /** @docs-private */
    @HostListener('dragend', ['$event'])
    onDragEnd(event: DragEvent) {
        event.dataTransfer!.dropEffect = 'none';
    }

    /** @docs-private */
    @HostListener('dragstart', ['$event'])
    onDragStart(event: DragEvent) {
        if (this.disabled) {
            event.dataTransfer!.dropEffect = 'none';
        } else {
            event.dataTransfer!.dropEffect = 'copy';
        }
    }

    /** @docs-private */
    get active(): boolean {
        return this._active;
    }
}
