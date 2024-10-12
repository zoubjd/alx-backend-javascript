interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    location: string;
    yearsOfExperience?: number;
    [key: string]: any;
}

interface Directors extends Teacher {
    numberOfReports: number;
}

interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName: string, lastName: string) => {
    return `${firstName[0]}. ${lastName}`;
};

interface StudentClassConstructor {
    new (firstName: string, lastName: string): student;
}

interface student {
    workOnHomework(): string;
    displayName(): string;
}

class StudentClass implements student {
    firstName: string;
    lastName: string;
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    workOnHomework(): string {
        return 'Currently working';
    }

    displayName(): string {
        return this.firstName;
    }
}

const createStudent = (StudentClass: StudentClassConstructor, firstName: string, lastName: string): student => {
    return new StudentClass(firstName, lastName);
};


