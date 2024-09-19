import courses from './courses.js';

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.querySelector(".card2 ul");

    if (courseContainer) {
        
        courseContainer.innerHTML = '';

        console.log(courses);

        courses.forEach(course => {
            const courseItem = document.createElement('li');
            courseItem.textContent = `${course.subject} ${course.number}: ${course.title}`;
            
            if (course.completed) {
                courseItem.style.backgroundColor = '#072ed2'; // blue for completed
                courseItem.style.color = 'white';
            } else {
                courseItem.style.backgroundColor = '#333'; // black for not completed
                courseItem.style.color = 'white';
                courseItem.style.opacity = '0.4';
            }
            courseItem.style.padding = '10px';
            courseItem.style.borderRadius = '4px';
            courseItem.style.margin = '5px 0';

            courseContainer.appendChild(courseItem);
        });
    } else {
        console.error("Course container not found");
    }
});

const coursesContainer = document.getElementById('courses-container');
const showAllBtn = document.getElementById('show-all');
const showCseBtn = document.getElementById('show-cse');
const showWddBtn = document.getElementById('show-wdd');
const totalCreditsElement = document.getElementById('total-credits');

// Function to display courses based on a filter and calculate total credits
function displayCourses(filter = 'all') {
    // Clear the existing courses
    coursesContainer.innerHTML = '';

    // Filter the courses based on the selected subject (CSE, WDD, or all)
    const filteredCourses = courses.filter(course => {
        if (filter === 'CSE') return course.subject === 'CSE';
        if (filter === 'WDD') return course.subject === 'WDD';
        return true; // For 'all', show all courses
    });

    // Dynamically create course elements and append to the container
    filteredCourses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');

        courseItem.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
        `;

        coursesContainer.appendChild(courseItem);
    });

    // Calculate total credits for the filtered courses
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

// Event listeners for the filter buttons
showAllBtn.addEventListener('click', () => displayCourses('all'));
showCseBtn.addEventListener('click', () => displayCourses('CSE'));
showWddBtn.addEventListener('click', () => displayCourses('WDD'));

// Display all courses by default on page load
displayCourses();

export default displayCourses;