export class Token {
    token!: string;
    auth!: boolean;

    public new(auth: boolean, token: string): Token {
        const autenticacao : Token = new Token()

        autenticacao.auth = false
        autenticacao.token = ""
        return autenticacao
    }
}