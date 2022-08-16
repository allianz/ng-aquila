import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

function exists<T>(item: T | null | undefined): item is T {
    return item != null;
}

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
    /** Whether the file uploader is disabled. */
    @Input() set disabled(value: boolean) {
        this._disabled = value;
        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    // flag when the drop zone is hovered
    private _active = false;

    /** An event emitted when files were dropped. */
    @Output() readonly fileDropped = new EventEmitter<File[]>();

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    /** @docs-private */
    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        event.preventDefault();

        if (this.disabled) {
            if (!event.dataTransfer) {
                return;
            }
            event.dataTransfer.dropEffect = 'no-drop' as any; // TODO wrog type: why do we do this? can we skip this?
        } else {
            if (!event.dataTransfer) {
                this.fileDropped.emit([]); // TODO shall we still emit if no data was transfered?
                return;
            }
            const { dataTransfer } = event;

            if (dataTransfer.items) {
                const files: File[] = Array.from(dataTransfer.items)
                    .map(item => item.getAsFile())
                    .filter(exists);
                dataTransfer.items.clear();
                this.fileDropped.emit(files);
            } else {
                const files: File[] = Array.from(dataTransfer.files);
                dataTransfer.clearData();
                this.fileDropped.emit(files);
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
