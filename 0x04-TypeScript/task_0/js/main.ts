interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    location: "New York"
};

const student2: Student = {
    firstName: "Jane",
    lastName: "Doe",
    age: 30,
    location: "Los Angeles"
};

const studentsList: Student[] = [student1, student2];

const table = document.createElement('table');

const headerRow = document.createElement('tr');

const firstNameHeader = document.createElement('th');
firstNameHeader.textContent = "First Name";

const locationHeader = document.createElement('th');
locationHeader.textContent = "Location";

headerRow.appendChild(firstNameHeader);
headerRow.appendChild(locationHeader);

table.appendChild(headerRow);

studentsList.forEach(student => {
    const row = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = student.firstName;

    const locationCell = document.createElement('td');
    locationCell.textContent = student.location;

    row.appendChild(firstNameCell);
    row.appendChild(locationCell);

    table.appendChild(row);
});

document.body.appendChild(table);
