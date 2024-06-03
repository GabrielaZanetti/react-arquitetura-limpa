import { Validation } from "@/presentation/protocols/validation"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class ValidationComposite implements Validation {
    constructor (private readonly validations: FieldValidation[]) {}

    validate (fieldName: string, fieldValue: string): string {
        const validations = this.validations.filter(v => v.field === fieldName)
        for (const validator of validations) {
            const error = validator.validate(fieldValue)
            if (error)
                return error.message
        }
    }
}