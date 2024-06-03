import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from "@faker-js/faker"
import 'jest-localstorage-mock'
import { RenderResult, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationStub, AutenticationSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/erros'

type SutTypes = {
    sut: RenderResult
    autenticationSpy: AutenticationSpy
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const autenticationSpy = new AutenticationSpy()

    validationStub.errorMensage = params?.validationError
    const sut = render(
        <Router navigator={history} location={''}>
            <Login validation={validationStub} authentication={autenticationSpy} />
        </Router>
    )
    return {
        sut,
        autenticationSpy
    }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const testeStateForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const passwordStatus = sut.getByTestId(`${fieldName}-status`)
    expect(passwordStatus.title).toBe(validationError || 'Tudo certo')
    expect(passwordStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testeErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testeElementExists = (sut: RenderResult, fieldName: string): void => {
    const el = sut.getByTestId(fieldName)
    expect(el).toBeTruthy()
}

const testeElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const el = sut.getByTestId(fieldName)
    expect(el.textContent).toBe(text)
}

const testeButtonIsDisables = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

describe('Login component', () => {
    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear()
    })

    test('Should start with initial state', () => {
        const validationError = faker.word.verb()
        const { sut } = makeSut({ validationError })
        testeErrorWrapChildCount(sut, 0)
        testeButtonIsDisables(sut, 'submit', true)
        testeStateForField(sut, 'email', validationError)
        testeStateForField(sut, 'password', validationError)
    })

    test('Should show email error if Validation fails', () => {
        const validationError = faker.word.verb()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        testeStateForField(sut, 'email', validationError)
    })

    test('Should show password error if Validation fails', () => {
        const validationError = faker.word.verb()
        const { sut } = makeSut({ validationError })
        populatePasswordField(sut)
        testeStateForField(sut, 'password', validationError)
    })

    test('Should show valid email state if Validation succeds', () => {
        const { sut } = makeSut()        
        populateEmailField(sut)
        testeStateForField(sut, 'email')
    })

    test('Should show valid password state if Validation succeds', () => {
        const { sut } = makeSut()        
        populatePasswordField(sut)
        testeStateForField(sut, 'password')
    })

    test('Should enebled submit button if form is valid', () => {
        const { sut } = makeSut()        
        populateEmailField(sut)
        populatePasswordField(sut)
        testeButtonIsDisables(sut, 'submit', false)
    })

    test('Should show spinner on submit', async () => {
        const { sut } = makeSut()
        await simulateValidSubmit(sut)
        testeElementExists(sut, 'spinner')
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, autenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidSubmit(sut, email, password)
        expect(autenticationSpy.params).toEqual({ email, password })
    })

    test('Should call Authentication only once', async () => {
        const { sut, autenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(autenticationSpy.callsCount).toBe(1)
    })

    test('Should not call Authentication if form is invalid', async () => {
        const validationError = faker.word.verb()
        const { sut, autenticationSpy } = makeSut({ validationError })
        await simulateValidSubmit(sut)
        expect(autenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if Authentication fails', async () => {
        const { sut, autenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(autenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        testeElementText(sut, 'main-error', error.message)
        testeErrorWrapChildCount(sut, 1)
    })

    test('Should add accessToken to localstorage on success', async () => {
        const { sut, autenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', autenticationSpy.account.accessToken)
        expect(history.index).toBe(0)
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to singup to page', async () => {
        const { sut } = makeSut()
        const reginter = sut.getByTestId('singup')
        fireEvent.click(reginter)
        expect(history.index).toBe(1)
        expect(history.location.pathname).toBe('/singup')
    })
})