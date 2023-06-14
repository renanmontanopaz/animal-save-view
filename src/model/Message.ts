export class Message {
    ativo! : boolean
    classe!: string
    mensagem!: string

    public new(ativo: boolean, classe: string, mensagem: string): Message {
        const notificacao : Message = new Message()

        notificacao.ativo = ativo
        notificacao.classe = classe
        notificacao.mensagem = mensagem

        return notificacao
    }
}