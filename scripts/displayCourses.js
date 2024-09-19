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
                courseItem.style.backgroundColor = '#4CAF50'; // Green for completed
                courseItem.style.color = 'white';
            } else {
                courseItem.style.backgroundColor = '#333'; // black for not completed
                courseItem.style.color = 'white';
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

export default displayCourses;