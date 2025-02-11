import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Panel } from 'primeng/panel';

@Component({
    selector: 'empty-state',
    standalone: true,
    imports: [CommonModule, Panel],
    templateUrl: './empty-state.component.html',
    styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {

    @Input() message = 'No data found.';

}
