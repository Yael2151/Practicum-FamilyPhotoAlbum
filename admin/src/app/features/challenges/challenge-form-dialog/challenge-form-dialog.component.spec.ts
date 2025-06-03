import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFormDialogComponent } from './challenge-form-dialog.component';

describe('ChallengeFormDialogComponent', () => {
  let component: ChallengeFormDialogComponent;
  let fixture: ComponentFixture<ChallengeFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
