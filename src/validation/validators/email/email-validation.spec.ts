import { InvalidFieldError } from "@/validation/errors";
import { EmailValidation } from "./email-validation";
import { faker } from "@faker-js/faker";

describe('EmailValidation', () => {
    test('Should return error if emails is invalid', () => {
        const sut = new EmailValidation(faker.word.words())
        const error = sut.validate(faker.word.words())
        expect(error).toEqual(new InvalidFieldError())
    })

    test.only('Should return falsy if emails is valid', () => {
        const sut = new EmailValidation(faker.word.words())
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()
    })
})