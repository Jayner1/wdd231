document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('eventId'); // Get the event ID from the URL

    if (!eventId) {
        document.getElementById('event-details').innerHTML = '<p>No event ID provided.</p>';
        return;
    }

    try {
        // Replace 'YOUR_TICKETMASTER_API_KEY' with your actual API key
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=YOUR_TICKETMASTER_API_KEY`);
        
        if (!response.ok) {
            throw new Error('Event not found');
        }

        const eventData = await response.json();

        // Check if the event data is available
        if (eventData._embedded && eventData._embedded.events.length > 0) {
            const event = eventData._embedded.events[0];

            // Populate the HTML with the event details
            document.getElementById('event-title').textContent = event.name || 'No Title Available';
            document.getElementById('event-description').textContent = event.description || 'No Description Available';
            document.getElementById('event-image').src = event.images && event.images.length > 0 ? event.images[0].url : '';
            document.getElementById('event-date').textContent = new Date(event.dates.start.dateTime).toLocaleString() || 'No Date Available';
            document.getElementById('event-location').textContent = event._embedded.venues[0].name || 'No Location Available';
            document.getElementById('event-ticket-link').href = event.url || '#';
        } else {
            document.getElementById('event-details').innerHTML = '<p>No event details available.</p>';
        }
    } catch (error) {
        console.error('Error fetching event details:', error);
        document.getElementById('event-details').innerHTML = '<p>Could not load event details. Please try again later.</p>';
    }
});
