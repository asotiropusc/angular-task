import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesButtonComponent } from './favorites-button.component';
import { By } from '@angular/platform-browser';

describe('FavoritesButtonComponent', () => {

    let component: FavoritesButtonComponent;
    let fixture: ComponentFixture<FavoritesButtonComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [FavoritesButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoritesButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should emit toggledFavorite when clicked', () => {

        const emitSpy = jest.spyOn(component.toggledFavorite, 'emit');
        const button = fixture.debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);

        expect(emitSpy).toHaveBeenCalled();

    });

});
