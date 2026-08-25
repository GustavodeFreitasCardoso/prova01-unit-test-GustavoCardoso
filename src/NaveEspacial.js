class NaveEspacial {
    constructor(nome) {
        this.nome = nome;
        this.combustivel = 0;
        this.velocidade = 0;
        this.tripulantes = [];
        this.carga = [];
        this.danos = 0;
        this.emViagem = false;
    }

    abastecer(litros) {
        this.combustivel += litros;
        return this.combustivel;
    }

    consumirCombustivel(litros) {
        if (litros > this.combustivel) {
            return false;
        }

        this.combustivel -= litros;
        return true;
    }

    verificarCombustivel() {
        return this.combustivel;
    }

    acelerar(valor) {
        this.velocidade += valor;
        return this.velocidade;
    }

    desacelerar(valor) {
        this.velocidade -= valor;

        if (this.velocidade < 0) {
            this.velocidade = 0;
        }

        return this.velocidade;
    }

    adicionarTripulante(nome) {
        this.tripulantes.push(nome);
        return true;
    }

    removerTripulante(nome) {
        const index = this.tripulantes.indexOf(nome);

        if (index === -1) {
            return false;
        }

        this.tripulantes.splice(index, 1);
        return true;
    }

    quantidadeTripulantes() {
        return this.tripulantes.length;
    }

    temTripulante(nome) {
        return this.tripulantes.includes(nome);
    }

    adicionarCarga(carga) {
        this.carga.push(carga);
        return true;
    }

    removerCarga(carga) {
        const index = this.carga.indexOf(carga);

        if (index === -1) {
            return false;
        }

        this.carga.splice(index, 1);
        return true;
    }

    pesoCarga() {
        return this.carga.reduce((total, item) => total + item.peso, 0);
    }

    podeViajar() {
        return this.combustivel > 0 &&
               this.tripulantes.length > 0 &&
               this.danos < 100;
    }

    iniciarViagem() {
        if (!this.podeViajar()) {
            return false;
        }

        this.emViagem = true;
        return true;
    }

    finalizarViagem() {
        this.emViagem = false;
        return true;
    }

    receberDano(valor) {
        this.danos += valor;

        if (this.danos > 100) {
            this.danos = 100;
        }

        return this.danos;
    }

    reparar(valor) {
        this.danos -= valor;

        if (this.danos < 0) {
            this.danos = 0;
        }

        return this.danos;
    }

    estaDanificada() {
        return this.danos > 0;
    }

    estaEmViagem() {
        return this.emViagem;
    }

    status() {
        return {
            nome: this.nome,
            combustivel: this.combustivel,
            velocidade: this.velocidade,
            tripulantes: this.tripulantes.length,
            carga: this.pesoCarga(),
            danos: this.danos,
            emViagem: this.emViagem
        };
    }
}

module.exports = NaveEspacial;