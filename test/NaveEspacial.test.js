const NaveEspacial = require("../src/NaveEspacial");

describe("NaveEspacial", () => {
    let nave;

    beforeEach(() => {
        nave = new NaveEspacial("Enterprise");
    });

    test("deve criar uma nave com valores iniciais corretos", () => {
        expect(nave.nome).toBe("Enterprise");
        expect(nave.combustivel).toBe(0);
        expect(nave.velocidade).toBe(0);
        expect(nave.tripulantes).toEqual([]);
        expect(nave.carga).toEqual([]);
        expect(nave.danos).toBe(0);
        expect(nave.emViagem).toBe(false);
    });

    test("deve abastecer a nave", () => {
        const resultado = nave.abastecer(100);

        expect(resultado).toBe(100);
        expect(nave.combustivel).toBe(100);
    });

    test("deve consumir combustível quando houver quantidade suficiente", () => {
        nave.abastecer(100);

        const resultado = nave.consumirCombustivel(30);

        expect(resultado).toBe(true);
        expect(nave.combustivel).toBe(70);
    });

    test("não deve consumir combustível maior que o disponível", () => {
        nave.abastecer(20);

        const resultado = nave.consumirCombustivel(50);

        expect(resultado).toBe(false);
        expect(nave.combustivel).toBe(20);
    });

    test("deve verificar a quantidade de combustível", () => {
        nave.abastecer(80);

        expect(nave.verificarCombustivel()).toBe(80);
    });

    test("deve acelerar a nave", () => {
        const resultado = nave.acelerar(50);

        expect(resultado).toBe(50);
        expect(nave.velocidade).toBe(50);
    });

    test("deve desacelerar a nave", () => {
        nave.acelerar(100);

        const resultado = nave.desacelerar(30);

        expect(resultado).toBe(70);
    });

    test("não deve permitir velocidade negativa", () => {
        nave.acelerar(30);

        const resultado = nave.desacelerar(50);

        expect(resultado).toBe(0);
        expect(nave.velocidade).toBe(0);
    });

    test("deve adicionar um tripulante", () => {
        const resultado = nave.adicionarTripulante("Gustavo");

        expect(resultado).toBe(true);
        expect(nave.tripulantes).toContain("Gustavo");
    });

    test("deve remover um tripulante existente", () => {
        nave.adicionarTripulante("Gustavo");

        const resultado = nave.removerTripulante("Gustavo");

        expect(resultado).toBe(true);
        expect(nave.tripulantes).not.toContain("Gustavo");
    });

    test("não deve remover um tripulante inexistente", () => {
        const resultado = nave.removerTripulante("João");

        expect(resultado).toBe(false);
    });

    test("deve retornar a quantidade de tripulantes", () => {
        nave.adicionarTripulante("Gustavo");
        nave.adicionarTripulante("João");

        expect(nave.quantidadeTripulantes()).toBe(2);
    });

    test("deve verificar se possui um tripulante", () => {
        nave.adicionarTripulante("Gustavo");

        expect(nave.temTripulante("Gustavo")).toBe(true);
        expect(nave.temTripulante("João")).toBe(false);
    });

    test("deve adicionar uma carga", () => {
        const carga = {
            nome: "Equipamento",
            peso: 50
        };

        const resultado = nave.adicionarCarga(carga);

        expect(resultado).toBe(true);
        expect(nave.carga).toContain(carga);
    });

    test("deve remover uma carga existente", () => {
        const carga = {
            nome: "Equipamento",
            peso: 50
        };

        nave.adicionarCarga(carga);

        const resultado = nave.removerCarga(carga);

        expect(resultado).toBe(true);
        expect(nave.carga).not.toContain(carga);
    });

    test("não deve remover uma carga inexistente", () => {
        const carga = {
            nome: "Carga",
            peso: 20
        };

        expect(nave.removerCarga(carga)).toBe(false);
    });

    test("deve calcular o peso total das cargas", () => {
        nave.adicionarCarga({
            nome: "Carga 1",
            peso: 50
        });

        nave.adicionarCarga({
            nome: "Carga 2",
            peso: 30
        });

        expect(nave.pesoCarga()).toBe(80);
    });

    test("deve retornar zero quando não houver carga", () => {
        expect(nave.pesoCarga()).toBe(0);
    });

    test("não deve poder viajar sem combustível", () => {
        nave.adicionarTripulante("Gustavo");

        expect(nave.podeViajar()).toBe(false);
    });

    test("deve poder viajar quando tiver combustível e tripulantes", () => {
        nave.abastecer(100);
        nave.adicionarTripulante("Gustavo");

        expect(nave.podeViajar()).toBe(true);
    });

    test("não deve poder viajar quando estiver totalmente danificada", () => {
        nave.abastecer(100);
        nave.adicionarTripulante("Gustavo");
        nave.receberDano(100);

        expect(nave.podeViajar()).toBe(false);
    });

    test("deve iniciar uma viagem quando estiver pronta", () => {
        nave.abastecer(100);
        nave.adicionarTripulante("Gustavo");

        const resultado = nave.iniciarViagem();

        expect(resultado).toBe(true);
        expect(nave.estaEmViagem()).toBe(true);
    });

    test("não deve iniciar viagem quando não puder viajar", () => {
        const resultado = nave.iniciarViagem();

        expect(resultado).toBe(false);
        expect(nave.estaEmViagem()).toBe(false);
    });

    test("deve finalizar uma viagem", () => {
        nave.abastecer(100);
        nave.adicionarTripulante("Gustavo");

        nave.iniciarViagem();

        const resultado = nave.finalizarViagem();

        expect(resultado).toBe(true);
        expect(nave.estaEmViagem()).toBe(false);
    });

    test("deve receber dano", () => {
        const resultado = nave.receberDano(40);

        expect(resultado).toBe(40);
        expect(nave.danos).toBe(40);
    });

    test("não deve permitir danos maiores que 100", () => {
        nave.receberDano(150);

        expect(nave.danos).toBe(100);
    });

    test("deve reparar a nave", () => {
        nave.receberDano(50);

        const resultado = nave.reparar(20);

        expect(resultado).toBe(30);
        expect(nave.danos).toBe(30);
    });

    test("não deve permitir danos negativos após reparar", () => {
        nave.receberDano(20);

        const resultado = nave.reparar(50);

        expect(resultado).toBe(0);
        expect(nave.danos).toBe(0);
    });

    test("deve verificar se a nave está danificada", () => {
        expect(nave.estaDanificada()).toBe(false);

        nave.receberDano(10);

        expect(nave.estaDanificada()).toBe(true);
    });

    test("deve retornar o status completo da nave", () => {
        nave.abastecer(100);
        nave.acelerar(50);
        nave.adicionarTripulante("Gustavo");

        nave.adicionarCarga({
            nome: "Equipamento",
            peso: 30
        });

        nave.receberDano(10);

        expect(nave.status()).toEqual({
            nome: "Enterprise",
            combustivel: 100,
            velocidade: 50,
            tripulantes: 1,
            carga: 30,
            danos: 10,
            emViagem: false
        });
    });
});