import { AdminEventMethod } from '../types/AdminEventMethod'

export const adminEventMethods: AdminEventMethod[] = [
  {
    name: 'adminEventControllerGetEventCollateralTemplate',
    description: 'Fetches a list of all collateral templates associated with the given event ID.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/collateral_templates',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetEventCollateralTemplate("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerList',
    description: 'Fetches and returns a paginated list of all events matching the query filters.',
    httpMethod: 'GET',
    endpoint: '/v2/event',
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerList();

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerCreate',
    description: 'Creates a new event using the provided request payload and authenticated user details.',
    httpMethod: 'POST',
    endpoint: '/v2/event',
    parameters: [
      { name: 'body', type: 'CreateEventRequest', required: true, description: 'The request body.' }
    ],
    exampleCode: `import {
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

  const createEventRequest: CreateEventRequest = {
    opportunityId: "opportunityId",
    variantId: "variantId",
    partnerId: "partnerId",
    // ... other properties
  };

  const { data } = await sddkk.adminEvent.adminEventControllerCreate(createEventRequest);

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerGet',
    description: 'Retrieves detailed information for a specific event based on its unique identifier.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGet("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerUpdate',
    description: 'Updates an existing event\'s details using its unique ID and request payload.',
    httpMethod: 'PUT',
    endpoint: '/v2/event/{id}',
    parameters: [
      { name: 'body', type: 'UpdateEventRequest', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import {
  Sddkk,
  UpdateEventRequest,
} from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const updateEventRequest: UpdateEventRequest = {
    partnerId: "partnerId",
    // ... other properties
  };

  const { data } = await sddkk.adminEvent.adminEventControllerUpdate("id", updateEventRequest);

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerCancel',
    description: 'Cancels a scheduled event using its unique identifier and cancellation request payload.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{id}/cancel',
    parameters: [
      { name: 'body', type: 'CancelEventRequest', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { CancelEventRequest, Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const cancelEventRequest: CancelEventRequest = {
    reason: "reason",
  };

  const { data } = await sddkk.adminEvent.adminEventControllerCancel("id", cancelEventRequest);

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerGetConflictingEvents',
    description: 'Checks if the given host is already assigned to other events that conflict with the specified event.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/host/{host_id}',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' },
      { name: 'hostId', type: 'string', required: true, description: 'Host ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetConflictingEvents("id", "host_id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerAddHost',
    description: 'Assigns a host to the specified event by providing the host ID.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{id}/host/{host_id}',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' },
      { name: 'hostId', type: 'string', required: true, description: 'Host ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerAddHost("id", "host_id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerUpdateHost',
    description: 'Updates the assignment details of a host for a given event.',
    httpMethod: 'PUT',
    endpoint: '/v2/event/{id}/host/{host_id}',
    parameters: [
      { name: 'body', type: 'UpdateEventHostRequest', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Event ID' },
      { name: 'hostId', type: 'string', required: true, description: 'Host ID' }
    ],
    exampleCode: `import { Sddkk, UpdateEventHostRequest } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const updateEventHostRequest: UpdateEventHostRequest = {
    invitationStatus: "pending",
    calendarInviteId: "calendarInviteId",
    // ... other properties
  };

  const { data } = await sddkk.adminEvent.adminEventControllerUpdateHost("id", "host_id", updateEventHostRequest);

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerRemoveHost',
    description: 'Unassigns a host from the specified event using event ID and host ID.',
    httpMethod: 'DELETE',
    endpoint: '/v2/event/{id}/host/{host_id}',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' },
      { name: 'hostId', type: 'string', required: true, description: 'Host ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerRemoveHost("id", "host_id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerAddMultipleHost',
    description: 'Assigns multiple hosts to an event using a batch request payload.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{id}/hosts',
    parameters: [
      { name: 'body', type: 'any', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const input = {};

  const { data } = await sddkk.adminEvent.adminEventControllerAddMultipleHost("id", input);

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerGetAvailableHosts',
    description: 'Returns a list of hosts available for assignment to the specified event.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/available_hosts',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetAvailableHosts("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerGetCalendarActionables',
    description: 'Fetches actionable calendar items such as tasks, reminders, or milestones for the given event.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/calendar-actionable',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetCalendarActionables("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerValidateOldEventId',
    description: 'Checks whether a given old event ID is still valid and maps it if necessary.',
    httpMethod: 'GET',
    endpoint: '/v2/event/old-event/{id}',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Old Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerValidateOldEventId("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerGetShowcasePageData',
    description: 'Fetches data for rendering a public showcase page of the given event.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/showcase',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetShowcasePageData("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerGetApprovalPageData',
    description: 'Returns approval-related details for the event, such as name, start time, and timezone.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/approval-page',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetApprovalPageData("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerCreateEventShipmentAddress',
    description: 'Creates a new shipment address record for either event hosts or event partners, based on role.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{shipmentRole}/shipment-address',
    parameters: [
      { name: 'body', type: 'CreateEventShipmentAddressRequestPayload', required: true, description: 'The request body.' },
      { name: 'shipmentRole', type: 'string', required: true, description: 'Shipment Role' }
    ],
    exampleCode: `import { CreateEventShipmentAddressRequestPayload, CreateShipmentAddress, Sddkk } from "sddkk";

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
})();`
  },
  {
    name: 'adminEventControllerUpdateEventshipmentAddress',
    description: 'Updates shipment address details for hosts or partners linked to an event.',
    httpMethod: 'PUT',
    endpoint: '/v2/event/{shipmentRole}/shipment-address/{id}',
    parameters: [
      { name: 'body', type: 'UpdateEventShipmentAddressRequestPayload', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Address ID' },
      { name: 'shipmentRole', type: 'string', required: true, description: 'Shipment Role' }
    ],
    exampleCode: `import { Sddkk, UpdateEventShipmentAddressRequestPayload, UpdateShipmentAddress } from "sddkk";

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
})();`
  },
  {
    name: 'adminEventControllerAddPartnerTestimonial',
    description: 'Adds a partner testimonial to an event.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{id}/partner_testimonial',
    parameters: [
      { name: 'body', type: 'CreateEventPartnerTestimonialRequest', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { CreateEventPartnerTestimonialRequest, Sddkk } from "sddkk";

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
})();`
  },
  {
    name: 'adminEventControllerUpdatePartnerTestimonial',
    description: 'Updates a partner testimonial for an event.',
    httpMethod: 'PUT',
    endpoint: '/v2/event/{id}/partner_testimonial/{partner_testimonial_id}',
    parameters: [
      { name: 'body', type: 'UpdateEventPartnerTestimonialRequest', required: true, description: 'The request body.' },
      { name: 'partnerTestimonialId', type: 'string', required: true, description: 'Partner Testimonial ID' }
    ],
    exampleCode: `import { Sddkk, UpdateEventPartnerTestimonialRequest } from "sddkk";

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
})();`
  },
  {
    name: 'adminEventControllerGetEventCatalogue',
    description: 'Retrieves the event catalogue information.',
    httpMethod: 'GET',
    endpoint: '/v2/event/{id}/catalogue',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerGetEventCatalogue("id");

  console.log(data);
})();`
  },
  {
    name: 'adminEventControllerUpsertMeetAndGreet',
    description: 'Creates or updates a meet and greet session for an event.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{id}/host/{host_id}/champion/{champion_id}/meet-and-greet',
    parameters: [
      { name: 'body', type: 'UpsertEventMeetAndGreetDto', required: true, description: 'The request body.' },
      { name: 'id', type: 'string', required: true, description: 'Event ID' },
      { name: 'hostId', type: 'string', required: true, description: 'Host ID' },
      { name: 'championId', type: 'string', required: true, description: 'Champion ID' }
    ],
    exampleCode: `import { Sddkk, UpsertEventMeetAndGreetDto } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const upsertEventMeetAndGreetDto: UpsertEventMeetAndGreetDto = {
    isDone: true,
    source: "GOODEAR",
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
})();`
  },
  {
    name: 'adminEventControllerAttachChecklist',
    description: 'Attaches a checklist to an event.',
    httpMethod: 'POST',
    endpoint: '/v2/event/{eventId}/attach-checklist',
    parameters: [
      { name: 'eventId', type: 'string', required: true, description: 'Event ID' }
    ],
    exampleCode: `import { Sddkk } from "sddkk";

(async () => {
  const sddkk = new Sddkk({
    token: "YOUR_TOKEN",
  });

  const { data } = await sddkk.adminEvent.adminEventControllerAttachChecklist();

  console.log(data);
})();`
  }
]