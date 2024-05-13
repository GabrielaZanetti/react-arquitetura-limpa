import { Validation } from "@/presentation/protocols/validation"

export class ValidationStub implements Validation {
    errorMensage: string

    validate (fieldName: string, fieldValue: string): string {
        return this.errorMensage
    }
}