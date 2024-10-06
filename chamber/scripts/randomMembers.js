document.addEventListener("DOMContentLoaded", function() {
    fetchMembers().then(displayRandomMembers);
});

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // Update this path as needed
        const members = await response.json();
        console.log("Fetched members:", members); // Log the fetched members
        return members;
    } catch (error) {
        console.error('Error fetching member data:', error);
        return [];
    }
}

function displayRandomMembers(members) {
    if (members.length === 0) {
        console.log("No members available to display.");
        return; // Exit if no members are found
    }

    // Filter members to get only gold (1) and silver (2)
    const goldSilverMembers = members.filter(member => member.membership_level === 1 || member.membership_level === 2);
    console.log("Gold and Silver Members:", goldSilverMembers); // Log filtered members

    // Shuffle and select 3 random members
    const shuffledMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    console.log("Randomly Selected Members:", shuffledMembers); // Log selected members

    // Generate member cards
    const memberCardsContainer = document.querySelector('.random-member-cards');
    memberCardsContainer.innerHTML = ''; // Clear previous content

    shuffledMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <h4>${member.name}</h4>
            <p>Membership Level: ${member.membership_level}</p>
            <p>Contact: ${member.contact_person}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        memberCardsContainer.appendChild(card);
    });
}
