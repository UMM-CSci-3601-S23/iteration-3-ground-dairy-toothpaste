
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
 import { VolunteerForm } from './form';
import { FormService } from './form.service';
import { MockFormService } from 'src/testing/form.service.mock';

describe('FormService', () => {
  let formService: FormService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    formService = TestBed.inject(FormService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  describe('When getForms() is called with no parameters', () => {
    it('calls `api/forms`', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(MockFormService.testForms));

      formService.getAllForms().subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);

        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(formService.formUrl);
      });
    });
  });

  describe('addForm', ()=> {
    it('talks to the right endpoint and is called once', waitForAsync(() => {
      // Mock the `httpClient.addUser()` method, so that instead of making an HTTP form,
      // it just returns our test data.
      const REQUEST_ID = '2';
      const mockedMethod = spyOn(httpClient, 'post').and.returnValue(of(REQUEST_ID));

      // paying attention to what is returned (undefined) didn't work well here,
      // but I'm putting something in here to remind us to look into that
      formService.addForm(MockFormService.testForms[1]).subscribe((returnedString) => {
        console.log('The thing returned was:' + returnedString);
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(formService.newFormUrl, JSON.stringify(MockFormService.testForms[1]));
      });
    }));
  });
});
