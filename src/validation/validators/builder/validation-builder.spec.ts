import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-builder";
import { faker } from "@faker-js/faker";

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).required().build()

        expect(validations).toEqual([new RequiredFieldValidation(field)])
    })

    test('Should return EmailValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).email().build()

        expect(validations).toEqual([new EmailValidation(field)])
    })

    test('Should return EmailValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).min(5).build()

        expect(validations).toEqual([new MinLengthValidation(field, 5)])
    })

    test('Should return alist of validations', () => {
        const field = faker.database.column()
        const length = faker.number.int()
        const validations = sut.field(field).required().min(length).email().build()

        expect(validations).toEqual([
            new RequiredFieldValidation(field),
            new MinLengthValidation(field, length),
            new EmailValidation(field)
        ])
    })
})