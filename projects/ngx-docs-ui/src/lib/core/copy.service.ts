import { Injectable } from '@angular/core';

@Injectable()
export class CopyService {
    private textarea!: HTMLTextAreaElement | null;

    copyText(text: string): boolean {
        this.createTextareaAndSelect(text);
        const copiedText = document.execCommand('copy');
        this.deleteTextarea();
        return copiedText;
    }

    private createTextareaAndSelect(text: string) {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('cdk-visually-hidden');
        // Prevent jumping
        const yPosition = window.scrollY || document.documentElement.scrollTop;
        this.textarea.style.top = yPosition + 'px';
        this.textarea.setAttribute('readonly', '');
        this.textarea.value = text;

        document.body.appendChild(this.textarea);
        this.textarea.select();
    }

    private deleteTextarea() {
        if (this.textarea) {
            document.body.removeChild(this.textarea);
            this.textarea = null;
        }
    }
}
