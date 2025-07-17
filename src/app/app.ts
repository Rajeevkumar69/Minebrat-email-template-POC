import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailEditorModule, EmailEditorComponent } from 'angular-email-editor';

@Component({
     selector: 'app-root',
     standalone: true,
     imports: [RouterOutlet, EmailEditorModule],
     templateUrl: './app.html',
     styleUrl: './app.scss',
})
export class App implements OnInit {
     public title = 'email-template-poc';

     @ViewChild(EmailEditorComponent)
     private emailEditor!: EmailEditorComponent;

     ngOnInit(): void { }

     editorLoaded() { }

     editorReady() { }

     exportHtml() {
          this.emailEditor.editor.exportHtml((data: any) => {
               console.log('exportHtml', data);
          });
     }
}
