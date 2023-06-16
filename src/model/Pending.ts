export interface pendings
{
    id: number,
    active: boolean,
    register: Date,
    update: Date,
    firstName: string,
    lastName: string,
    contact: number,
    cpf: number,
    address: {
        id: number,
        active: boolean,
        register: Date,
        update: Date,
        cep: number,
        neighborhood: string,
        road: string,
        houseNumber: number
    },
    user: {
        id: number,
        login: string,
        password: string,
        roles:
            {
                id: number,
                authority: string
            }
        ,
        enabled: boolean,
        authorities:[
            {
                id: number,
                authority: string
            }
        ],
        username: string,
        credentialsNonExpired: boolean,
        accountNonExpired: boolean,
        accountNonLocked: boolean
    },
    approved: boolean,
    pending: boolean,
    rejected: boolean
}