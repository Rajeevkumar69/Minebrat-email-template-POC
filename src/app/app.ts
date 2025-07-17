import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { EmailEditorModule, EmailEditorComponent } from 'angular-email-editor';
import html2pdf from 'html2pdf.js';

@Component({
     selector: 'app-root',
     standalone: true,
     imports: [CommonModule, EmailEditorModule],
     templateUrl: './app.html',
     styleUrl: './app.scss',
})
export class App implements OnInit {
     public title = 'email-template-poc';
     public isBrowser: boolean = false;
     @ViewChild(EmailEditorComponent)
     private emailEditor!: EmailEditorComponent;

     constructor(
          @Inject(PLATFORM_ID) private platformId: Object
     ) {
          this.isBrowser = isPlatformBrowser(this.platformId);
     }

     ngOnInit(): void {

     }

     public editorLoaded() { }

     public editorReady() { }

     public exportHtml() {
          if (this.isBrowser && this.emailEditor) {
               this.emailEditor.editor.exportHtml((data: any) => {
                    console.log('exportHtml', data);
               });
          }
     }

     async saveAsPDF() {
          if (this.isBrowser && this.emailEditor) {
               const html2pdf = await import('html2pdf.js');

               this.emailEditor.editor.exportHtml((data: any) => {
                    const htmlContent = data.html;
                    const container = document.createElement('div');
                    container.innerHTML = htmlContent;
                    document.body.appendChild(container);
                    const opt = {
                         margin: 0.5,
                         filename: 'email-template.pdf',
                         image: { type: 'jpeg', quality: 0.98 },
                         html2canvas: { scale: 2 },
                         jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                    };
                    html2pdf.default().from(container).set(opt).save().then(() => {
                         document.body.removeChild(container);
                    });
               });
          }
     }
}
