import { faker } from '@faker-js/faker';
import { User } from '../types/user';

export function gerarUsuario(): User {

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();

    return {
        name: `${firstname} ${lastname}`,
        email: `qa_${crypto.randomUUID()}@example.com`,
        password: 'Teste@123',
        title: faker.helpers.arrayElement(['Mr', 'Mrs']),
        birth_date: String(faker.number.int({ min: 1, max: 28 })),
        birth_month: String(faker.number.int({ min: 1, max: 12 })),
        birth_year: String(faker.number.int({ min: 1980, max: 2000 })),
        firstname,
        lastname,
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        country: 'Canada',
        zipcode: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        mobile_number: faker.string.numeric(11)
    };
}