import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Request } from './request';
import { RequestService } from './request.service';

describe('RequestService', () => {
  //small collection of test Requests
  const testRequests: Request[] = [
    {
      _id: '1',
      itemType: 'food',
      description: 'I would like to be able to get some spaghetti noodles',
      foodType: 'grain'
    },
    {
      _id: '2',
      itemType: 'toiletries',
      description: 'I need some toothpaste',
      foodType: ''
    },
    {
      _id: '3',
      itemType: 'other',
      description: 'Would it be possible for me to get some Advil?',
      foodType: ''
    }
  ];

  let requestService: RequestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    requestService = TestBed.inject(RequestService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('When getRequests() is called with no parameters', () => {
    it('calls `api/requests`', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      requestService.getRequests().subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);

        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams() });
      });
    });
  });
});
