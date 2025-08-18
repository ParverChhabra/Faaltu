# AdminEventService

A list of all methods in the `AdminEventService` service. Click on the method name to view detailed information about that method.

| Methods                                                                                           | Description                                                                                          |
| :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------- |
| [adminEventControllerGetEventCollateralTemplate](#admineventcontrollergeteventcollateraltemplate) | Fetches a list of all collateral templates associated with the given event ID.                       |
| [adminEventControllerList](#admineventcontrollerlist)                                             | Fetches and returns a paginated list of all events matching the query filters.                       |
| [adminEventControllerCreate](#admineventcontrollercreate)                                         | Creates a new event using the provided request payload and authenticated user details.               |
| [adminEventControllerGet](#admineventcontrollerget)                                               | Retrieves detailed information for a specific event based on its unique identifier.                  |
| [adminEventControllerUpdate](#admineventcontrollerupdate)                                         | Updates an existing event’s details using its unique ID and request payload.                         |
| [adminEventControllerCancel](#admineventcontrollercancel)                                         | Cancels a scheduled event using its unique identifier and cancellation request payload.              |
| [adminEventControllerGetConflictingEvents](#admineventcontrollergetconflictingevents)             | Checks if the given host is already assigned to other events that conflict with the specified event. |
| [adminEventControllerAddHost](#admineventcontrolleraddhost)                                       | Assigns a host to the specified event by providing the host ID.                                      |
| [adminEventControllerUpdateHost](#admineventcontrollerupdatehost)                                 | Updates the assignment details of a host for a given event.                                          |
| [adminEventControllerRemoveHost](#admineventcontrollerremovehost)                                 | Unassigns a host from the specified event using event ID and host ID.                                |
| [adminEventControllerAddMultipleHost](#admineventcontrolleraddmultiplehost)                       | Assigns multiple hosts to an event using a batch request payload.                                    |
| [adminEventControllerGetAvailableHosts](#admineventcontrollergetavailablehosts)                   | Returns a list of hosts available for assignment to the specified event.                             |
| [adminEventControllerGetCalendarActionables](#admineventcontrollergetcalendaractionables)         | Fetches actionable calendar items such as tasks, reminders, or milestones for the given event.       |
| [adminEventControllerValidateOldEventId](#admineventcontrollervalidateoldeventid)                 | Checks whether a given old event ID is still valid and maps it if necessary.                         |
| [adminEventControllerGetShowcasePageData](#admineventcontrollergetshowcasepagedata)               | Fetches data for rendering a public showcase page of the given event.                                |
| [adminEventControllerGetApprovalPageData](#admineventcontrollergetapprovalpagedata)               | Returns approval-related details for the event, such as name, start time, and timezone.              |
| [adminEventControllerCreateEventShipmentAddress](#admineventcontrollercreateeventshipmentaddress) | Creates a new shipment address record for either event hosts or event partners, based on role.       |
| [adminEventControllerUpdateEventshipmentAddress](#admineventcontrollerupdateeventshipmentaddress) | Updates shipment address details for hosts or partners linked to an event.                           |
| [adminEventControllerAddPartnerTestimonial](#admineventcontrolleraddpartnertestimonial)           |                                                                                                      |
| [adminEventControllerUpdatePartnerTestimonial](#admineventcontrollerupdatepartnertestimonial)     |                                                                                                      |
| [adminEventControllerGetEventCatalogue](#admineventcontrollergeteventcatalogue)                   |                                                                                                      |
| [adminEventControllerUpsertMeetAndGreet](#admineventcontrollerupsertmeetandgreet)                 |                                                                                                      |
| [adminEventControllerAttachChecklist](#admineventcontrollerattachchecklist)                       |                                                                                                      |

## adminEventControllerGetEventCollateralTemplate

Fetches a list of all collateral templates associated with the given event ID.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/collateral_templates`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetEventCollateralTemplate("id");

	console.log(data);
})();
```

## adminEventControllerList

Fetches and returns a paginated list of all events matching the query filters.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event`

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerList();

	console.log(data);
})();
```

## adminEventControllerCreate

Creates a new event using the provided request payload and authenticated user details.

-   HTTP Method: `POST`
-   Endpoint: `/v2/event`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [CreateEventRequest](../models/CreateEventRequest.md) | ✅       | The request body. |

**Example Usage Code Snippet**

```typescript
import {
	CreateBookingSessionRequest,
	CreateEventAddressRequest,
	CreateEventChampionRequest,
	CreateEventMeetingSessionRequest,
	CreateEventRequest,
	Sddkk,
} from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const createEventAddressRequest: CreateEventAddressRequest = {
		line1: "line1",
		line2: "line2",
		recipientName: "recipientName",
		email: "email",
		phoneNumber: "phoneNumber",
		isdCode: "isdCode",
		title: "title",
		latitude: "latitude",
		longitude: "longitude",
		city: "city",
		province: "province",
		postalCode: "postalCode",
		country: "country",
		countryCode: "countryCode",
		url: "url",
		metadata: {},
	};

	const createEventChampionRequestRole = "VOLUNTEER";

	const createEventChampionRequest: CreateEventChampionRequest = {
		email: "email",
		firstName: "firstName",
		lastName: "lastName",
		role: createEventChampionRequestRole,
		phone: "phone",
		isdCode: "isdCode",
	};

	const createEventMeetingSessionRequest: CreateEventMeetingSessionRequest = {
		thirdPartyId: "thirdPartyId",
		registrationRequired: true,
		passcode: "passcode",
		url: "url",
	};

	const createBookingSessionRequestProvider = "benevity";

	const createBookingSessionRequest: CreateBookingSessionRequest = {
		thirdPartyId: "thirdPartyId",
		url: "url",
		provider: createBookingSessionRequestProvider,
	};

	const createEventRequest: CreateEventRequest = {
		opportunityId: "opportunityId",
		variantId: "variantId",
		partnerId: "partnerId",
		isAsync: {},
		address: createEventAddressRequest,
		champion: createEventChampionRequest,
		countryId: "countryId",
		cityId: "cityId",
		startTimeStamp: "startTimeStamp",
		endTimeStamp: "endTimeStamp",
		timezone: "timezone",
		language: "language",
		csmId: "csmId",
		programManagerId: "programManagerId",
		expectedVolunteerCount: 1.35,
		tags: ["tags"],
		name: "name",
		meetingSession: createEventMeetingSessionRequest,
		customCalendarDescription: "customCalendarDescription",
		othersTagDescription: "othersTagDescription",
		customCalendarTitle: "customCalendarTitle",
		bookingSession: createBookingSessionRequest,
		championResponses: {},
		source: "source",
		submissionDeadline: 5.44,
	};

	const { data } = await sddkk.adminEvent.adminEventControllerCreate(createEventRequest);

	console.log(data);
})();
```

## adminEventControllerGet

Retrieves detailed information for a specific event based on its unique identifier.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGet("id");

	console.log(data);
})();
```

## adminEventControllerUpdate

Updates an existing event’s details using its unique ID and request payload.

-   HTTP Method: `PUT`
-   Endpoint: `/v2/event/{id}`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [UpdateEventRequest](../models/UpdateEventRequest.md) | ✅       | The request body. |
| id   | string                                                | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import {
	CreateMaterialItemRequest,
	Sddkk,
	UpdateBookingSessionRequest,
	UpdateEventAddressRequest,
	UpdateEventChampionRequest,
	UpdateEventRequest,
} from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const updateEventChampionRequestRole = "VOLUNTEER";

	const updateEventChampionRequest: UpdateEventChampionRequest = {
		email: "email",
		firstName: "firstName",
		lastName: "lastName",
		role: updateEventChampionRequestRole,
		phone: "phone",
		isdCode: "isdCode",
	};

	const createMaterialItemRequest: CreateMaterialItemRequest = {
		name: "name",
		quantity: 2.37,
		url: "url",
		skuId: "skuId",
		productId: "productId",
	};

	const updateEventAddressRequest: UpdateEventAddressRequest = {
		id: "id",
		line1: "line1",
		line2: "line2",
		recipientName: "recipientName",
		email: "email",
		phoneNumber: "phoneNumber",
		isdCode: "isdCode",
		title: "title",
		latitude: "latitude",
		longitude: "longitude",
		city: "city",
		province: "province",
		postalCode: "postalCode",
		country: "country",
		countryCode: "countryCode",
		url: "url",
		metadata: {},
	};

	const updateBookingSessionRequestProvider = "benevity";

	const updateBookingSessionRequest: UpdateBookingSessionRequest = {
		thirdPartyId: "thirdPartyId",
		url: "url",
		provider: updateBookingSessionRequestProvider,
	};

	const updateEventRequest: UpdateEventRequest = {
		partnerId: "partnerId",
		champion: updateEventChampionRequest,
		countryId: "countryId",
		cityId: "cityId",
		startTimeStamp: "startTimeStamp",
		endTimeStamp: "endTimeStamp",
		timezone: "timezone",
		name: "name",
		prerequisites: "prerequisites",
		roleOfVolunteer: "roleOfVolunteer",
		kitDescription: [createMaterialItemRequest],
		materialCost: 49827.37,
		kitImgUrls: ["kitImgUrls"],
		itinerary: [{}],
		language: "language",
		csmId: "csmId",
		programManagerId: "programManagerId",
		expectedVolunteerCount: 5.4,
		tags: ["tags"],
		othersTagDescription: "othersTagDescription",
		isdCode: "isdCode",
		address: updateEventAddressRequest,
		customCalendarDescription: "customCalendarDescription",
		customCalendarTitle: "customCalendarTitle",
		bookingSession: updateBookingSessionRequest,
		submissionDeadline: 7.3,
	};

	const { data } = await sddkk.adminEvent.adminEventControllerUpdate("id", updateEventRequest);

	console.log(data);
})();
```

## adminEventControllerCancel

Cancels a scheduled event using its unique identifier and cancellation request payload.

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{id}/cancel`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [CancelEventRequest](../models/CancelEventRequest.md) | ✅       | The request body. |
| id   | string                                                | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { CancelEventRequest, Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const cancelEventRequest: CancelEventRequest = {
		reason: "reason",
	};

	const { data } = await sddkk.adminEvent.adminEventControllerCancel("id", cancelEventRequest);

	console.log(data);
})();
```

## adminEventControllerGetConflictingEvents

Checks if the given host is already assigned to other events that conflict with the specified event.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/host/{host_id}`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| id     | string | ✅       |             |
| hostId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetConflictingEvents("id", "host_id");

	console.log(data);
})();
```

## adminEventControllerAddHost

Assigns a host to the specified event by providing the host ID.

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{id}/host/{host_id}`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| id     | string | ✅       |             |
| hostId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerAddHost("id", "host_id");

	console.log(data);
})();
```

## adminEventControllerUpdateHost

Updates the assignment details of a host for a given event.

-   HTTP Method: `PUT`
-   Endpoint: `/v2/event/{id}/host/{host_id}`

**Parameters**

| Name   | Type                                                          | Required | Description       |
| :----- | :------------------------------------------------------------ | :------- | :---------------- |
| body   | [UpdateEventHostRequest](../models/UpdateEventHostRequest.md) | ✅       | The request body. |
| id     | string                                                        | ✅       |                   |
| hostId | string                                                        | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { Sddkk, UpdateEventHostRequest } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const invitationStatus = "pending";

	const updateEventHostRequest: UpdateEventHostRequest = {
		invitationStatus: invitationStatus,
		calendarInviteId: "calendarInviteId",
		currency: "currency",
		modeOfPayment: "modeOfPayment",
		hostingCost: 0.8,
		translationCost: 5.82,
		preEventShipmentCost: 2.56,
		postEventShipmentCost: 6.48,
		travelReimbursementCost: 9.44,
		projectManagementCost: 3.81,
	};

	const { data } = await sddkk.adminEvent.adminEventControllerUpdateHost("id", "host_id", updateEventHostRequest);

	console.log(data);
})();
```

## adminEventControllerRemoveHost

Unassigns a host from the specified event using event ID and host ID.

-   HTTP Method: `DELETE`
-   Endpoint: `/v2/event/{id}/host/{host_id}`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| id     | string | ✅       |             |
| hostId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerRemoveHost("id", "host_id");

	console.log(data);
})();
```

## adminEventControllerAddMultipleHost

Assigns multiple hosts to an event using a batch request payload.

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{id}/hosts`

**Parameters**

| Name | Type   | Required | Description       |
| :--- | :----- | :------- | :---------------- |
| body | any    | ✅       | The request body. |
| id   | string | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const input = {};

	const { data } = await sddkk.adminEvent.adminEventControllerAddMultipleHost("id", input);

	console.log(data);
})();
```

## adminEventControllerGetAvailableHosts

Returns a list of hosts available for assignment to the specified event.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/available_hosts`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetAvailableHosts("id");

	console.log(data);
})();
```

## adminEventControllerGetCalendarActionables

Fetches actionable calendar items such as tasks, reminders, or milestones for the given event.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/calendar-actionable`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetCalendarActionables("id");

	console.log(data);
})();
```

## adminEventControllerValidateOldEventId

Checks whether a given old event ID is still valid and maps it if necessary.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/old-event/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerValidateOldEventId("id");

	console.log(data);
})();
```

## adminEventControllerGetShowcasePageData

Fetches data for rendering a public showcase page of the given event.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/showcase`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetShowcasePageData("id");

	console.log(data);
})();
```

## adminEventControllerGetApprovalPageData

Returns approval-related details for the event, such as name, start time, and timezone.

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/approval-page`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetApprovalPageData("id");

	console.log(data);
})();
```

## adminEventControllerCreateEventShipmentAddress

Creates a new shipment address record for either event hosts or event partners, based on role.

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{shipmentRole}/shipment-address`

**Parameters**

| Name         | Type                                                                                              | Required | Description       |
| :----------- | :------------------------------------------------------------------------------------------------ | :------- | :---------------- |
| body         | [CreateEventShipmentAddressRequestPayload](../models/CreateEventShipmentAddressRequestPayload.md) | ✅       | The request body. |
| shipmentRole | string                                                                                            | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { CreateEventShipmentAddressRequestPayload, CreateShipmentAddress, Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const createShipmentAddress: CreateShipmentAddress = {
		line1: "123 Main St",
		line2: "Suite 4B",
		latitude: "40.7128",
		longitude: "-74.0060",
		city: "New York",
		province: "NY",
		postalCode: "10001",
		country: "USA",
		url: "https://example.com",
		metadata: {},
		email: "user@example.com",
		isdCode: "+1",
		phoneNumber: "123-456-7890",
		recipientName: "John Doe",
	};

	const createEventShipmentAddressRequestPayload: CreateEventShipmentAddressRequestPayload = {
		eventId: "eventId",
		entityId: "entityId",
		address: createShipmentAddress,
		addressType: "addressType",
	};

	const { data } = await sddkk.adminEvent.adminEventControllerCreateEventShipmentAddress(
		"shipmentRole",
		createEventShipmentAddressRequestPayload,
	);

	console.log(data);
})();
```

## adminEventControllerUpdateEventshipmentAddress

Updates shipment address details for hosts or partners linked to an event.

-   HTTP Method: `PUT`
-   Endpoint: `/v2/event/{shipmentRole}/shipment-address/{id}`

**Parameters**

| Name         | Type                                                                                              | Required | Description       |
| :----------- | :------------------------------------------------------------------------------------------------ | :------- | :---------------- |
| body         | [UpdateEventShipmentAddressRequestPayload](../models/UpdateEventShipmentAddressRequestPayload.md) | ✅       | The request body. |
| id           | string                                                                                            | ✅       |                   |
| shipmentRole | string                                                                                            | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { Sddkk, UpdateEventShipmentAddressRequestPayload, UpdateShipmentAddress } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const updateShipmentAddress: UpdateShipmentAddress = {
		line1: "line1",
		line2: "line2",
		latitude: "latitude",
		longitude: "longitude",
		city: "city",
		province: "province",
		postalCode: "postalCode",
		country: "country",
		url: "url",
		metadata: {},
		email: "email",
		isdCode: "isdCode",
		phoneNumber: "phoneNumber",
		recipientName: "recipientName",
	};

	const updateEventShipmentAddressRequestPayload: UpdateEventShipmentAddressRequestPayload = {
		entityId: "entityId",
		addressType: "addressType",
		address: updateShipmentAddress,
	};

	const { data } = await sddkk.adminEvent.adminEventControllerUpdateEventshipmentAddress(
		"id",
		"shipmentRole",
		updateEventShipmentAddressRequestPayload,
	);

	console.log(data);
})();
```

## adminEventControllerAddPartnerTestimonial

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{id}/partner_testimonial`

**Parameters**

| Name | Type                                                                                      | Required | Description       |
| :--- | :---------------------------------------------------------------------------------------- | :------- | :---------------- |
| body | [CreateEventPartnerTestimonialRequest](../models/CreateEventPartnerTestimonialRequest.md) | ✅       | The request body. |
| id   | string                                                                                    | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { CreateEventPartnerTestimonialRequest, Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const createEventPartnerTestimonialRequest: CreateEventPartnerTestimonialRequest = {
		beneficiariesImpacted: 5.58,
		impactStatement: "impactStatement",
		feedback: "feedback",
		context: "context",
		media: {},
	};

	const { data } = await sddkk.adminEvent.adminEventControllerAddPartnerTestimonial(
		"id",
		createEventPartnerTestimonialRequest,
	);

	console.log(data);
})();
```

## adminEventControllerUpdatePartnerTestimonial

-   HTTP Method: `PUT`
-   Endpoint: `/v2/event/{id}/partner_testimonial/{partner_testimonial_id}`

**Parameters**

| Name                 | Type                                                                                      | Required | Description       |
| :------------------- | :---------------------------------------------------------------------------------------- | :------- | :---------------- |
| body                 | [UpdateEventPartnerTestimonialRequest](../models/UpdateEventPartnerTestimonialRequest.md) | ✅       | The request body. |
| partnerTestimonialId | string                                                                                    | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { Sddkk, UpdateEventPartnerTestimonialRequest } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const updateEventPartnerTestimonialRequest: UpdateEventPartnerTestimonialRequest = {
		id: "id",
		beneficiariesImpacted: 0.21,
		impactStatement: "impactStatement",
		feedback: "feedback",
		context: "context",
		media: {},
	};

	const { data } = await sddkk.adminEvent.adminEventControllerUpdatePartnerTestimonial(
		"partner_testimonial_id",
		updateEventPartnerTestimonialRequest,
	);

	console.log(data);
})();
```

## adminEventControllerGetEventCatalogue

-   HTTP Method: `GET`
-   Endpoint: `/v2/event/{id}/catalogue`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerGetEventCatalogue("id");

	console.log(data);
})();
```

## adminEventControllerUpsertMeetAndGreet

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{id}/host/{host_id}/champion/{champion_id}/meet-and-greet`

**Parameters**

| Name       | Type                                                                  | Required | Description       |
| :--------- | :-------------------------------------------------------------------- | :------- | :---------------- |
| body       | [UpsertEventMeetAndGreetDto](../models/UpsertEventMeetAndGreetDto.md) | ✅       | The request body. |
| id         | string                                                                | ✅       |                   |
| hostId     | string                                                                | ✅       |                   |
| championId | string                                                                | ✅       |                   |

**Example Usage Code Snippet**

```typescript
import { Sddkk, UpsertEventMeetAndGreetDto } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const source = "GOODEAR";

	const upsertEventMeetAndGreetDto: UpsertEventMeetAndGreetDto = {
		isDone: true,
		source: source,
		summary: "summary",
		completionScore: 3.47,
	};

	const { data } = await sddkk.adminEvent.adminEventControllerUpsertMeetAndGreet(
		"id",
		"host_id",
		"champion_id",
		upsertEventMeetAndGreetDto,
	);

	console.log(data);
})();
```

## adminEventControllerAttachChecklist

-   HTTP Method: `POST`
-   Endpoint: `/v2/event/{eventId}/attach-checklist`

**Example Usage Code Snippet**

```typescript
import { Sddkk } from "sddkk";

(async () => {
	const sddkk = new Sddkk({
		token: "YOUR_TOKEN",
	});

	const { data } = await sddkk.adminEvent.adminEventControllerAttachChecklist();

	console.log(data);
})();
```

<!-- This file was generated by liblab | https://liblab.com/ -->
