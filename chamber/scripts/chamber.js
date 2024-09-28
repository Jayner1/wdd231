document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightYearSpan = document.getElementById("copyrightYear");
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = currentYear;
    }

    const lastModifiedDate = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedLastModified = lastModifiedDate.toLocaleDateString('en-US', options);

    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modified: ${formattedLastModified}`;
    }

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    const gridViewButton = document.getElementById('gridView');
    const listViewButton = document.getElementById('listView');

    if (gridViewButton && listViewButton) {
        gridViewButton.addEventListener('click', function() {
            fetchMembers().then(members => displayMembers(members, 'grid'));
            this.classList.add('active');
            listViewButton.classList.remove('active');
        });

        listViewButton.addEventListener('click', function() {
            fetchMembers().then(members => displayMembers(members, 'list'));
            this.classList.add('active');
            gridViewButton.classList.remove('active');
        });
    }

    fetchMembers();
});

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); 
        const members = await response.json();
        return members;
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members, viewType) {
    const membersContainer = document.getElementById('membersContainer');
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        const memberImage = `<img src="${member.image}" alt="${member.name} Logo">`;
        const memberDetails = `
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Membership Level: ${member.membership_level}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;

        memberCard.innerHTML = memberImage + memberDetails;
        membersContainer.appendChild(memberCard);
    });

    if (viewType === 'grid') {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
    } else {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
    }
}
