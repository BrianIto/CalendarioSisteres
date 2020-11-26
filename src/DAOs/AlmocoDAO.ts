export interface Almoco {
    nome: string,
    telefone: string,
    dia: Date,
}

const AlmocoDAO = {
    db: null,
    setDb(db) {
        this.db = db;
    },
    create(almoco : Almoco) {

    }
}

export default AlmocoDAO