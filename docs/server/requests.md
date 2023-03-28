# Request Structures

The requests submitted by clients, and those edited by volunteers and presented to the donors are stored in the `clientRequests` and `donorRequests` databases. The `clientRequests` database contains the requests which have come in from clients, and the `donorRequests` database contains requests which have been edited by volunteers and presented to the donor page. Both use the same structure to represent requests, which resembles the following:

```json
{
    "_id": "6421d2650f4fd4739367fe67",
    "itemType": "food",
    "description": "This is the description of a food",
    "foodType": "dairy",
    "dateAdded": "2023-03-27T17:29:09.033155Z"
}
```

The item type is the category of item requested, currently these options can be found [here](../../client/src/app/requests/request.ts).

Description is the text presented to the volunteer and donors as a more specific description of the item requests.

The food type is the category of the food requested if a food has been requested, currently these options can be found [here](../../client/src/app/requests/request.ts).

Date added is the date the request was initially made, and date updated is the date the entry was last updated (for example an edit was made, or someone pledged to bring in some amount of the given item). Both dates are for the time being represented as a string conforming to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).

These are represented as the `Requests` object on the server. The class can be found [here](../../server/src/main/java/umm3601/request/Request.java), and on the client are represented similarly and can be found [here](../../client/src/app/requests/request.ts).

## API Endpoints

### Retrieve Client Requests

The endpoint to retrieve a potentially sorted view of the requests stored in the `clientRequests` database is `/api/clientRequests` with an HTTP GET request. On success a `200 OK` status is returned.

This endpoint accepts the following as query parameters (parameters passed in the URL).

- `itemType` which is used to filter by the item type, the endpoint then returns only requests with the exact `itemType` requested.
- `foodType` which is used to filter by the item type, the endpoint then returns only requests with the exact `foodType` requested.
- `description` which is used to filter by the item description, the endpoint then returns only requests which contain the value given by `description`.
- `sortBy` which is used to sort the resulting list by a particular parameter, the value passed must be the name of one of the values in the `request` object.
- `sortOrder` is used to set the order the result is sorted by. If it is set to `"asc"`, the sorting order will be in ascending order, if set to `"desc"`, the sorting order will be in descending order.
 
### Retrieve Donor Requests

The endpoint to retrieve a potentially sorted view of the requests stored in the `donorRequests` database is `/api/donorRequests` with an HTTP GET request. On success a `200 OK` status is returned.

This endpoint accepts the following as query parameters (parameters passed in the URL).

- `itemType` which is used to filter by the item type, the endpoint then returns only requests with the exact `itemType` requested.
- `foodType` which is used to filter by the item type, the endpoint then returns only requests with the exact `foodType` requested.
- `description` which is used to filter by the item description, the endpoint then returns only requests which contain the value given by `description`.
- `sortBy` which is used to sort the resulting list by a particular parameter, the value passed must be the name of one of the values in the `request` object.
- `sortOrder` is used to set the order the result is sorted by. If it is set to `"asc"`, the sorting order will be in ascending order, if set to `"desc"`, the sorting order will be in descending order.
 
### Add New Client Request

The endpoint to add a new request to the `clientRequests` database is `/api/clientRequests` with an HTTP POST request. On success a `201 CREATED` status is returned, along with a json object containing the `id` of the new request.

The body of this request must be a JSON object providing the required data. This object should resemble the following:

```json
{
  "itemType": "food",
  "description": "The description of the dairy based item",
  "foodType": "dairy"
}
```

The following restrictions are placed on the data provided:

- `itemType` must be a valid `itemType` object (see [here](../../client/src/app/requests/request.ts)).
- `foodType` must be a valid `foodType` object (see [here](../../client/src/app/requests/request.ts)).
- `description` must be present.

Note that the `dateAdded` value is updated with the current time formatted as an ISO 8601 string.

### Add New Donor Request

The endpoint to add a new request to the `donorRequests` database is `/api/donorRequests` with an HTTP POST request. On success a `201 CREATED` status is returned, along with a json object containing the `id` of the new request.

The body of this request must be a JSON object providing the required data. This object should resemble the following:

```json
{
  "itemType": "food",
  "description": "The description of the dairy based item",
  "foodType": "dairy"
}
```

The following restrictions are placed on the data provided:

- `itemType` must be a valid `itemType` object (see [here](../../client/src/app/requests/request.ts)).
- `foodType` must be a valid `foodType` object (see [here](../../client/src/app/requests/request.ts)).
- `description` must be present.

Note that the `dateAdded` value is updated with the current time formatted as an ISO 8601 string.

### Delete Client Request

The endpoint to add a new request to the `clientRequests` database is `/api/clientRequests/{id}` with an HTTP DELETE request. On success a `200 OK` status is returned.

The `id` of the item to be deleted must be passed in the url as shown in the endpoint.

### Delete Donor Request

The endpoint to add a new request to the `donorRequests` database is `/api/donorRequests/{id}` with an HTTP DELETE request. On success a `200 OK` status is returned.

The `id` of the item to be deleted must be passed in the url as shown in the endpoint.
