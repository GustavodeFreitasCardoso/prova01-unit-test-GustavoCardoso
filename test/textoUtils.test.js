const TextoUtils = require("../src/textoUtils");

describe("TextoUtils", () => {
  let utils;

  beforeEach(() => {
    utils = new TextoUtils();
  });

  describe("inverter", () => {
    it("deve inverter uma string", () => {
      // Arrange
      const texto = "Olá";
      // Act
      const resultado = utils.inverter(texto);
      // Assert
      expect(resultado).toBe("álO");
    });
  });

  describe("ehPalindromo", () => {
    it("deve retornar true para uma string palíndroma", () => {
      // Arrange
      const texto = "arara";
      // Act
      const resultado = utils.ehPalindromo(texto);
      // Assert
      expect(resultado).toBe(true);
    });

    it("deve retornar false para uma string que não é palíndroma", () => {
      // Arrange
      const texto = "casa";
      // Act
      const resultado = utils.ehPalindromo(texto);
      // Assert
      expect(resultado).toBe(false);
    });
  });

  describe("capitalizar", () => {
    it("deve deixar a primeira letra de cada palavra maiúscula", () => {
      // Arrange
      const texto = "olá mundo";
      // Act
      const resultado = utils.capitalizar(texto);
      // Assert
      expect(resultado).toBe("Olá Mundo");
    });
  });

  describe("contarOcorrencias", () => {
    it("deve contar as ocorrências de uma substring", () => {
      // Arrange
      const texto = "banana";
      const substring = "an"
      // Act
      const resultado = utils.contarOcorrencias(texto, substring);
      // Assert
      expect(resultado).toBe(2);
    });

    it("deve retornar zero quando a substring for vazia", () => {
      // Arrange
      const texto = "banana";
      const substring = "";
      // Act
      const resultado = utils.contarOcorrencias(texto, substring);
      // Assert
      expect(resultado).toBe(0);
    });
  });

  describe("removerEspacosExtras", () => {
    it("deve remover espaços extras no início, fim e entre palavras", () => {
      // Arrange
      const texto = "  Olá    mundo  ";
      // Act
      const resultado = utils.removerEspacosExtras(texto);
      // Assert
      expect(resultado).toBe("Olá mundo");
    });
  });

  describe("paraSlug", () => {
    it("deve converter o texto para slug", () => {
      // Arrange
      const texto = "Olá Mundo!";
      // Act
      const resultado = utils.paraSlug(texto);
      // Assert
      expect(resultado).toBe("ola-mundo");
    });
  });

  describe("truncar", () => {
    it("deve retornar o texto original quando estiver dentro do limite", () => {
      // Arrange
      const texto = "Olá";
      const tamanho = 10;
      // Act
      const resultado = utils.truncar(texto, tamanho);
      // Assert
      expect(resultado).toBe("Olá");
    });

    it("deve truncar o texto quando ultrapassar o limite", () => {
      // Arrange
      const texto = "Olá mundo";
      const tamanho = 5;
      // Act
      const resultado = utils.truncar(texto, tamanho);
      // Assert
      expect(resultado).toBe("Olá m...");
    });

    it("deve lançar erro quando o tamanho for negativo", () => {
      // Arrange
      const texto = "Olá";
      const tamanho = -1;
      // Act
      const executar = () => utils.truncar(texto, tamanho);
      // Assert
      expect(executar).toThrow("O tamanho não pode ser negativo");
    });
  });

  describe("contarPalavras", () => {
    it("deve contar o número de palavras", () => {
      // Arrange
      const texto = "Olá mundo JavaScript";
      // Act
      const resultado = utils.contarPalavras(texto);
      // Assert
      expect(resultado).toBe(3);
    });
  });

  describe("somenteLetras", () => {
    it("deve retornar true quando houver somente letras", () => {
      // Arrange
      const texto = "JavaScript";
      // Act
      const resultado = utils.somenteLetras(texto);
      // Assert
      expect(resultado).toBe(true);
    });

    it("deve retornar false quando houver caracteres que não sejam letras", () => {
      // Arrange
      const texto = "JavaScript123";
      // Act
      const resultado = utils.somenteLetras(texto);
      // Assert
      expect(resultado).toBe(false);
    });
  });

  describe("substituirTudo", () => {
    it("deve substituir todas as ocorrências de uma substring", () => {
      // Arrange
      const texto = "banana";
      const alvo = "a";
      const substituto = "o";
      // Act
      const resultado = utils.substituirTudo(
        texto,
        alvo,
        substituto
      );
      // Assert
      expect(resultado).toBe("bonono");
    });

    it("deve lançar erro quando o alvo for vazio", () => {
      // Arrange
      const texto = "banana";
      const alvo = "";
      const substituto = "o";
      // Act
      const executar = () =>
        utils.substituirTudo(texto, alvo, substituto);
      // Assert
      expect(executar).toThrow("O alvo não pode ser vazio");
    });
  });
});

