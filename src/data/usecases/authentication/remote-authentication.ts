import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { UnexpectedError } from '@/domain/erros/unexpected-error';
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";

export class RemoteAuthentication {
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient
    ) {}

    async auth (params: AuthenticationParams): Promise<void> {
        const httpPostClient = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpPostClient.statusCode) {
            case HttpStatusCode.ok: break
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError() 
        }
    }
}