export class Token {
    token!: string;
    auth!: boolean;

    public new(auth: boolean, token: string): Token {
        const autenticacao : Token = new Token()

        autenticacao.auth = auth
        autenticacao.token = token
        return autenticacao
    }
}