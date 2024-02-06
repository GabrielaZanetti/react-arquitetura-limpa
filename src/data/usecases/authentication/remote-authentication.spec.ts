interface HttpPostClient {
    post (url: string): Promise<void>
}

class RemoteAuthentication {
    constructor (
        private readonly url: string,
        private readonly HttpPostClient: HttpPostClient
    ) {}

    async auth (): Promise<void> {
        await this.HttpPostClient.post(this.url)
    }
}

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        class HttpPostClientSpy implements HttpPostClient {
            url?: string

            async post (url: string): Promise<void>{
                this.url = url
                return Promise.resolve();
            }
        }
        const url = 'any_url';
        const httpClient = new HttpPostClientSpy();
        const sut = new RemoteAuthentication(url, httpClient);
        await sut.auth();
        expect(httpClient.url).toBe(url);
    })
})
