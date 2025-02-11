import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EmptyStateComponent', () => {

    let component: EmptyStateComponent;
    let fixture: ComponentFixture<EmptyStateComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [EmptyStateComponent, BrowserAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(EmptyStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should display default message', () => {

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('No data found.');

    });

    it('should display custom message', () => {

        const testMessage = 'Custom empty state message';
        component.message = testMessage;
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain(testMessage);

    });

});
