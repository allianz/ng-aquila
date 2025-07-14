import { Component, signal } from "@angular/core";
import { NxButtonComponent } from "@allianz/ng-aquila/button";

@Component({
    selector: "app-root",
    imports: [NxButtonComponent],
    templateUrl: "./app.html",
    styleUrl: "./app.scss",
})
export class App {
    protected readonly title = signal("test-project");
}
