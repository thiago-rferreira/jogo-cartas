export class Heroi {
    constructor({ id, nome, imagem, ataque, defesa, plataforma}) {
        this.id = id;
        this.nome = nome;
        this.imagem = imagem;
        this.ataque = ataque;
        this.defesa = defesa;
        this.plataforma = plataforma;
    }
}

class Herois {
    constructor() {
        this.herois = [];
    }

    addHeroi(heroi) {
        this.herois.push(heroi);
    }

    getHeroi(id) {
        return this.herois.find(heroi => heroi.id === id);
    }

    getHerois() {
        //remove duplicates
        this.removeDuplicates();
        return this.herois;
    }

    getHeroisByPlataforma(plataforma) {
        return this.herois.filter(heroi => heroi.plataforma === plataforma);
    }

    getCont() {
        return this.cont;
    }

    removeDuplicates() {
        this.herois = this.herois.filter((heroi, index, self) =>
            index === self.findIndex((h) => (
                h.nome === heroi.nome && h.plataforma === heroi.plataforma
            ))
        )
    }

    consoleHerois() {
        console.log(this.herois);
    }

    select5RandomHerois() {
        let randomHerois = [];
        let randomIndex = 0;
        let herois = this.herois;

        for (let i = 0; i < 6; i++) {
            randomIndex = Math.floor(Math.random() * herois.length);
            randomHerois.push(herois[randomIndex]);
            herois.splice(randomIndex, 1);
        }

        return randomHerois;
    }

}

export default Herois;
