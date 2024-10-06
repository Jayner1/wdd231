document.addEventListener("DOMContentLoaded", function() {
    fetchMembers().then(members => {
        displayRandomMembers(members);
    });
});

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        console.log("Fetched members:", members);
        return members;
    } catch (error) {
        console.error('Error fetching member data:', error);
        return [];
    }
}

function displayRandomMembers(members) {
    if (members.length === 0) {
        console.log("No members available to display.");
        return; 
    }

    const goldSilverMembers = members.filter(member => member.membership_level === 3 || member.membership_level === 2);
    console.log("Gold and Silver Members:", goldSilverMembers); 

    const shuffledMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    console.log("Randomly Selected Members:", shuffledMembers); 

    const memberCardsContainer = document.querySelector('.random-member-cards');
    memberCardsContainer.innerHTML = ''; 

    shuffledMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <h4>${member.name}</h4>
            <p>Membership Level: ${member.membership_level === 3 ? 'Gold' : 'Silver'}</p>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        memberCardsContainer.appendChild(card);
    });
}
