import React from 'react'
import { faker } from "@faker-js/faker"
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from './login'
import { ValidationStub, AutenticationSpy } from '@/presentation/test'

type SutTypes = {
    sut: RenderResult
    autenticationSpy: AutenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const autenticationSpy = new AutenticationSpy()

    validationStub.errorMensage = params?.validationError
    const sut = render(<Login validation={validationStub} authentication={autenticationSpy} />)
    return {
        sut,
        autenticationSpy
    }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStateForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const passwordStatus = sut.getByTestId(`${fieldName}-status`)
    expect(passwordStatus.title).toBe(validationError || 'Tudo certo')
    expect(passwordStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login component', () => {
    afterEach(cleanup)

    test('Should start with initial state', () => {
        const validationError = faker.word.verb()
        const { sut } = makeSut({ validationError })
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        simulateStateForField(sut, 'email', validationError)
        simulateStateForField(sut, 'password', validationError)
    })

    test('Should show email error if Validation fails', () => {
        const validationError = faker.word.verb()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        simulateStateForField(sut, 'email', validationError)
    })

    test('Should show password error if Validation fails', () => {
        const validationError = faker.word.verb()
        const { sut } = makeSut({ validationError })
        populatePasswordField(sut)
        simulateStateForField(sut, 'password', validationError)
    })

    test('Should show valid email state if Validation succeds', () => {
        const { sut } = makeSut()        
        populateEmailField(sut)
        simulateStateForField(sut, 'email')
    })

    test('Should show valid password state if Validation succeds', () => {
        const { sut } = makeSut()        
        populatePasswordField(sut)
        simulateStateForField(sut, 'password')
    })

    test('Should enebled submit button if form is valid', () => {
        const { sut } = makeSut()        
        populateEmailField(sut)
        populatePasswordField(sut)
        
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    test('Should show spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('Should call Authentication with correct values', () => {
        const { sut, autenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()
        simulateValidSubmit(sut, email, password)
        expect(autenticationSpy.params).toEqual({
            email,
            password
        })
    })
})