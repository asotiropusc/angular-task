import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGridCardComponent } from './user-grid-card.component';

describe('UserGridCardComponent', () => {
    let component: UserGridCardComponent;
    let fixture: ComponentFixture<UserGridCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserGridCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserGridCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
