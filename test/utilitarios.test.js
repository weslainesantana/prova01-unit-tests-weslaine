const Utilitarios = require("../src/utilitarios");

describe("Testes completos da classe Utilitarios", () => {
  let util;

  beforeEach(() => {
    util = new Utilitarios();
  });

  // =========================
  // Testes de Strings
  // =========================
  describe("Funções de manipulação de strings", () => {
    test("inverterString deve inverter corretamente uma string simples e vazia", () => {
      expect(util.inverterString("abc")).toBe("cba");
      expect(util.inverterString("")).toBe("");
    });

    test("inverterString deve lidar com números, símbolos e espaços", () => {
      expect(util.inverterString("a1 @b2")).toBe("2b@ 1a");
    });

    test("contarCaracteres deve contar corretamente, inclusive espaços", () => {
      expect(util.contarCaracteres("a b c")).toBe(5);
      expect(util.contarCaracteres("")).toBe(0);
    });

    test("paraMaiusculas e paraMinusculas devem converter corretamente", () => {
      expect(util.paraMaiusculas("aBc")).toBe("ABC");
      expect(util.paraMinusculas("ABc")).toBe("abc");
    });

    test("primeiraLetraMaiuscula deve capitalizar corretamente strings", () => {
      expect(util.primeiraLetraMaiuscula("teste")).toBe("Teste");
      expect(util.primeiraLetraMaiuscula("")).toBe("");
      expect(util.primeiraLetraMaiuscula("JáMaiuscula")).toBe("JáMaiuscula");
    });

    test("removerEspacos deve remover apenas espaços externos", () => {
      expect(util.removerEspacos("  teste teste  ")).toBe("teste teste");
      expect(util.removerEspacos("interno não muda")).toBe("interno não muda");
    });

    test("repetirTexto deve repetir n vezes ou retornar vazio", () => {
      expect(util.repetirTexto("x", 3)).toBe("xxx");
      expect(util.repetirTexto("y", 0)).toBe("");
    });

    test("contarPalavras deve contar corretamente palavras ignorando múltiplos espaços", () => {
      expect(util.contarPalavras(" um  dois três  ")).toBe(3);
      expect(util.contarPalavras("palavra")).toBe(1);
    });

    test("ehPalindromo deve reconhecer palíndromos ignorando cases e símbolos", () => {
      expect(util.ehPalindromo("A man, a plan, a canal: Panama")).toBe(true);
      expect(util.ehPalindromo("não é")).toBe(false);
      expect(util.ehPalindromo("")).toBe(true); // caso borda
    });
  });

  // =========================
  // Testes Matemáticos
  // =========================
  describe("Funções matemáticas", () => {
    test("somar deve lidar com positivos, negativos e zero", () => {
      expect(util.somar(2, 3)).toBe(5);
      expect(util.somar(-2, -3)).toBe(-5);
      expect(util.somar(0, 4)).toBe(4);
    });

    test("subtrair deve retornar resultados corretos incluindo negativos", () => {
      expect(util.subtrair(10, 5)).toBe(5);
      expect(util.subtrair(5, 10)).toBe(-5);
    });

    test("multiplicar deve lidar com positivos, negativos e zero", () => {
      expect(util.multiplicar(4, 5)).toBe(20);
      expect(util.multiplicar(-3, 3)).toBe(-9);
      expect(util.multiplicar(3, 0)).toBe(0);
    });

    test("dividir deve lidar com números positivos, negativos e lançar erro ao dividir por zero", () => {
      expect(util.dividir(10, 2)).toBe(5);
      expect(util.dividir(-10, 2)).toBe(-5);
      expect(() => util.dividir(10, 0)).toThrow("Divisão por zero");
    });

    test("ehPar deve identificar corretamente pares e ímpares, incluindo zero e negativos", () => {
      expect(util.ehPar(2)).toBe(true);
      expect(util.ehPar(3)).toBe(false);
      expect(util.ehPar(0)).toBe(true);
      expect(util.ehPar(-4)).toBe(true);
      expect(util.ehPar(-5)).toBe(false);
    });
  });

  // =========================
  // Testes de Arrays
  // =========================
  describe("Manipulação de arrays", () => {
    const numeros = [1, 2, 3];
    const vazios = [];
    const duplicados = [1, 1, 2, 2, 3, 3];
    const strings = ["c", "a", "b"];

    test("primeiroElemento e ultimoElemento devem funcionar corretamente", () => {
      expect(util.primeiroElemento(numeros)).toBe(1);
      expect(util.ultimoElemento(numeros)).toBe(3);
      expect(util.primeiroElemento(vazios)).toBeUndefined();
      expect(util.ultimoElemento(vazios)).toBeUndefined();
    });

    test("tamanhoArray deve retornar corretamente o tamanho", () => {
      expect(util.tamanhoArray(numeros)).toBe(3);
      expect(util.tamanhoArray(vazios)).toBe(0);
    });

    test("ordenarArray deve ordenar números e strings corretamente e não alterar original", () => {
      const orig = [...numeros];
      expect(util.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
      expect(util.ordenarArray(strings)).toEqual(["a", "b", "c"]);
      expect([3, 1, 2]).toEqual([3, 1, 2]); // original não alterado
    });

    test("inverterArray deve inverter corretamente sem alterar original", () => {
      const arr = [1, 2, 3];
      expect(util.inverterArray(arr)).toEqual([3, 2, 1]);
      expect(arr).toEqual([1, 2, 3]);
      expect(util.inverterArray(vazios)).toEqual([]);
    });

    test("mediaArray deve calcular média corretamente incluindo decimais e negativos", () => {
      expect(util.mediaArray([1, 2, 3])).toBe(2);
      expect(util.mediaArray([1.5, 2.5, 3.5])).toBeCloseTo(2.5, 2);
      expect(util.mediaArray([-10, 0, 10])).toBe(0);
      expect(util.mediaArray(vazios)).toBe(0);
    });

    test("removerDuplicados deve remover corretamente duplicados mantendo ordem", () => {
      expect(util.removerDuplicados(duplicados)).toEqual([1, 2, 3]);
      expect(util.removerDuplicados(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
    });

    test("juntarArray deve concatenar elementos com separadores corretamente", () => {
      expect(util.juntarArray([1, 2, 3])).toBe("1,2,3");
      expect(util.juntarArray(["a", "b"], "-")).toBe("a-b");
      expect(util.juntarArray(vazios)).toBe("");
    });
  });

  // =========================
  // Outros métodos
  // =========================
  describe("Outros utilitários", () => {
    test("gerarNumeroAleatorio deve gerar números inteiros dentro do intervalo e diferentes", () => {
      const numeros = Array.from({ length: 50 }, () => util.gerarNumeroAleatorio(10));
      numeros.forEach(n => expect(n).toBeGreaterThanOrEqual(0));
      numeros.forEach(n => expect(n).toBeLessThan(10));
      expect(new Set(numeros).size).toBeGreaterThan(1);
    });

    test("gerarNumeroAleatorio deve usar limite padrão se não fornecido", () => {
      const num = util.gerarNumeroAleatorio();
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(100);
    });

    test("ehNumero deve identificar corretamente números válidos e inválidos", () => {
      expect(util.ehNumero(0)).toBe(true);
      expect(util.ehNumero(-123.4)).toBe(true);
      expect(util.ehNumero("123")).toBe(false);
      expect(util.ehNumero(NaN)).toBe(false);
      expect(util.ehNumero(null)).toBe(false);
      expect(util.ehNumero({})).toBe(false);
      expect(util.ehNumero([])).toBe(false);
    });

    test("mesclarObjetos deve combinar corretamente e não alterar os originais", () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      const resultado = util.mesclarObjetos(obj1, obj2);
      expect(resultado).toEqual({ a: 1, b: 3, c: 4 });
      expect(obj1).toEqual({ a: 1, b: 2 });
      expect(obj2).toEqual({ b: 3, c: 4 });
    });
  });
});
