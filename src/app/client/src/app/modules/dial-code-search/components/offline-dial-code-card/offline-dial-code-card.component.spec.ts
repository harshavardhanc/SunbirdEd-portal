import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResourceService, ConfigService, BrowserCacheTtlService } from '@sunbird/shared';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Response } from './offline-dial-code-card.component.spec.data';
import { CacheService } from 'ng2-cache-service';
import { OfflineDialCodeCardComponent } from './offline-dial-code-card.component';
import { CdnprefixPipe } from './../../../shared/pipes/cdnprefix.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('OfflineDialCodeCardComponent', () => {
  let component: OfflineDialCodeCardComponent;
  let fixture: ComponentFixture<OfflineDialCodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ OfflineDialCodeCardComponent, CdnprefixPipe ],
      providers: [ResourceService, ConfigService, CacheService, BrowserCacheTtlService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineDialCodeCardComponent);
    component = fixture.componentInstance;
  });

  it('should show TEST INPUT for all data', () => {
    const cdnprefixPipe = new CdnprefixPipe();
    component.data = Response.cardData;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sb-card-title').innerText).toContain('B1 Test');
    expect(fixture.nativeElement.querySelector('.sb-card-label').innerText).toEqual('Worksheet');
  });

  it('should show badgeClassImage while passing badgesData', () => {
    const cdnprefixPipe = new CdnprefixPipe();
    component.data = Response.librarySearchData;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sb-card-title').innerText).toContain('Official Textbook');
    const badgesElm = fixture.nativeElement.querySelector('.sb-card-badge');
    expect(badgesElm.src).toContain(Response.librarySearchData.ribbon.left.image);
  });

  it('should emit click event  on call of onAction method ', () => {
    const cdnprefixPipe = new CdnprefixPipe();
    component.data = Response.cardData;
    spyOn(component.clickEvent, 'emit');
    component.onAction(component.data, 'export');
    expect(component.clickEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.showAddingToLibraryButton).toBeUndefined();
  });

   it('should emit change addingto librarybutton to true if the action is download in onAction ', () => {
    const cdnprefixPipe = new CdnprefixPipe();
    component.data = Response.cardData;
    spyOn(component.clickEvent, 'emit');
    component.onAction(component.data, 'download');
    expect(component.clickEvent.emit).toHaveBeenCalledTimes(1);
    expect(Response.emitData.data.showAddingToLibraryButton).toBeTruthy();
  });

});

