import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from '@angular-task/breadcrumb';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        ToastModule,
        BreadcrumbModule
    ],
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'angular-task';

    breadcrumbService = inject(BreadcrumbService);

}
