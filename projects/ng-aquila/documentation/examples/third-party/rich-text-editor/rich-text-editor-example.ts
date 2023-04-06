import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Editor } from 'tinymce';

const customIcon = [
    { iconName: 'bold', image: 'bold' },
    { iconName: 'italic', image: 'italic' },
    { iconName: 'underline', image: 'underline' },
    { iconName: 'alignleft', image: 'align-left' },
    { iconName: 'alignright', image: 'align-right' },
    { iconName: 'aligncenter', image: 'align-center' },
    { iconName: 'alignjustify', image: 'align-justify' },
    { iconName: 'indent', image: 'indent-more' },
    { iconName: 'outdent', image: 'indent-less' },
    { iconName: 'numlist', image: 'list-number' },
    { iconName: 'bullist', image: 'list-bullet' },
    { iconName: 'undo', image: 'undo' },
    { iconName: 'redo', image: 'redo' },
    { iconName: 'hr', image: 'divider' },
    { iconName: 'link', image: 'link' },
];

/**
 * @title Rich Text Editor Example
 */
@Component({
    selector: 'rich-text-editor-example',
    templateUrl: './rich-text-editor-example.html',
    styleUrls: ['./rich-text-editor-example.css'],
})
export class RichTextEditorExampleComponent implements OnInit {
    constructor(private readonly fb: FormBuilder) {}

    init = {
        promotion: false,
        branding: false,
        menubar: false,
        plugins: 'table link lists',
        toolbar:
            'fontsizeselect bold italic underline forecolor | alignleft alignright aligncenter alignjustify indent outdent | numlist bullist | link  hr table undo redo  | myCustomButton',
        content_style: 'body {font-family: Allianz Neo}',
        setup: (editor: Editor) => {
            editor.ui.registry.addButton('myCustomButton', {
                text: 'Custom',
                onAction: () => {
                    console.log('Custom button clicked');
                },
            });

            customIcon.forEach(v => {
                editor.ui.registry.addIcon(
                    v.iconName,
                    `<image src="assets/icons/toolbar/${v.image}.svg"/>`,
                );
            });
        },
    };

    form!: FormGroup;

    editor!: EditorComponent;
    ngOnInit(): void {
        this.form = this.fb.group({
            content: [
                '<h3>Lorem ipsum</h3> <p>is simply dummy text of the printing and typesetting industry&nbsp;</p> <table> <thead> <tr> <th>Element</th> <th>Symbol</th> <th>Atomic Number</th> <th>Melting Point (&deg;C)</th> </tr> </thead> <tbody> <tr> <td>Sodium</td> <td>Na</td> <td>11</td> <td>97.8</td> </tr> <tr> <td>Oxygen</td> <td>O</td> <td>8</td> <td>-218.79</td> </tr> <tr> <td>Gold</td> <td>Au</td> <td>79</td> <td>1064</td> </tr> </tbody> </table',
            ],
        });
    }
}
