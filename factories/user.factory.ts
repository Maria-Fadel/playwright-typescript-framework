import {faker} from '@faker-js/faker';

export const  createUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),

    day : faker.number.int({ min: 1, max: 28 }).toString(),
    month : faker.number.int({ min: 1, max: 12 }).toString(),
    year : faker.number.int({ min: 1900, max: 2024 }).toString(),

    fullName: faker.person.fullName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    mobileNumber: '9'+faker.phone.number(),
  }
};