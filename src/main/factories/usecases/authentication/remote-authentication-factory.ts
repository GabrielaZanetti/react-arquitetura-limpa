import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory"
import { makeApiUrl } from "@/main/factories/http/api-url-factory"
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication"
import { Authentication } from "@/domain/usecases"

export const makeRemoteAutentication = (): Authentication => {
    return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}