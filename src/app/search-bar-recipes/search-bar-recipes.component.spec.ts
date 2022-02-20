import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarRecipesComponent } from './search-bar-recipes.component';

describe('SearchBarRecipesComponent', () => {
  let component: SearchBarRecipesComponent;
  let fixture: ComponentFixture<SearchBarRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarRecipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
