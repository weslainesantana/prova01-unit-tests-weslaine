const Utilitarios = require("../src/utilitarios");

const TEST_DATA = {
  strings: {
    simple: "teste",
    empty: "",
    withSymbols: "a1b2@c3",
    withSpaces: "   teste   ",
    palindrome: "A man, a plan, a canal: Panama",
    notPalindrome: "race a car",
    singleChar: "a",
    spacesOnly: "     ",
    unicode: "😊👍"
  },
  arrays: {
    numbers: [1, 2, 3],
    unsorted: [3, 1, 2],
    withDuplicates: [1, 2, 2, 3, 3, 3],
    strings: ["c", "a", "b"],
    empty: [],
    forAverage: [1, 2, 3, 4, 5],
    mixedTypes: [1, "1", 1]
  },
  math: {
    PRIMEIRO_NUMERO: 5,
    SEGUNDO_NUMERO: 10,
    SOMA_ESPERADA: 15,
    SUBTRACAO_ESPERADA: 5,
    MULTIPLICACAO_ESPERADA: 50,
    DIVISAO_NUMERADOR: 10,
    DIVISAO_DENOMINADOR: 2,
    DIVISAO_ESPERADA: 5,
    NUMERO_PAR: 4,
    NUMERO_IMPAR: 5
  },
  objects: {
    first: { a: 1, b: 2 },
    second: { c: 3, d: 4 },
    merged: { a: 1, b: 2, c: 3, d: 4 },
    nested1: { a: { x: 1 } },
    nested2: { b: { y: 2 } }
  }
};

describe("Classe Utilitarios", () => {
  let utilitarios;

  beforeEach(() => {
    utilitarios = new Utilitarios();
  });

  // -------------------
  // Strings
  // -------------------
  describe("Métodos de String", () => {
    test("inverterString deve inverter corretamente", () => {
      expect(utilitarios.inverterString("abc")).toBe("cba");
      expect(utilitarios.inverterString(TEST_DATA.strings.empty)).toBe("");
      expect(utilitarios.inverterString(TEST_DATA.strings.withSymbols)).toBe("3c@2b1a");
      expect(utilitarios.inverterString(TEST_DATA.strings.unicode)).toBe("👍😊");
      expect(utilitarios.inverterString(TEST_DATA.strings.spacesOnly)).toBe(TEST_DATA.strings.spacesOnly);
    });

    test("contarCaracteres deve contar corretamente", () => {
      expect(utilitarios.contarCaracteres(TEST_DATA.strings.simple)).toBe(5);
      expect(utilitarios.contarCaracteres(TEST_DATA.strings.empty)).toBe(0);
      expect(utilitarios.contarCaracteres("a b c")).toBe(5);
    });

    test("paraMaiusculas e paraMinusculas", () => {
      expect(utilitarios.paraMaiusculas("abc")).toBe("ABC");
      expect(utilitarios.paraMaiusculas("123@!abc")).toBe("123@!ABC");
      expect(utilitarios.paraMinusculas("ABC")).toBe("abc");
      expect(utilitarios.paraMinusculas(TEST_DATA.strings.empty)).toBe("");
    });

    test("primeiraLetraMaiuscula deve lidar com vários casos", () => {
      expect(utilitarios.primeiraLetraMaiuscula(TEST_DATA.strings.simple)).toBe("Teste");
      expect(utilitarios.primeiraLetraMaiuscula(TEST_DATA.strings.empty)).toBe("");
      expect(utilitarios.primeiraLetraMaiuscula(TEST_DATA.strings.spacesOnly)).toBe(TEST_DATA.strings.spacesOnly);
      expect(utilitarios.primeiraLetraMaiuscula(TEST_DATA.strings.singleChar)).toBe("A");
      expect(utilitarios.primeiraLetraMaiuscula("1abc")).toBe("1abc");
      expect(utilitarios.primeiraLetraMaiuscula("@abc")).toBe("@abc");
    });

    test("removerEspacos deve remover espaços externos", () => {
      expect(utilitarios.removerEspacos(TEST_DATA.strings.withSpaces)).toBe("teste");
      expect(utilitarios.removerEspacos(" teste teste ")).toBe("teste teste");
      expect(utilitarios.removerEspacos("     ")).toBe("");
    });

    test("repetirTexto deve repetir corretamente", () => {
      expect(utilitarios.repetirTexto("a", 3)).toBe("aaa");
      expect(utilitarios.repetirTexto("abc", 0)).toBe("");
      expect(utilitarios.repetirTexto("abc", -1)).toBe(""); // comportamento esperado para negativo
    });

    test("contarPalavras deve contar corretamente", () => {
      expect(utilitarios.contarPalavras(" um dois três ")).toBe(3);
      expect(utilitarios.contarPalavras("palavra")).toBe(1);
      expect(utilitarios.contarPalavras("     ")).toBe(0);
    });

    test("ehPalindromo deve validar corretamente", () => {
      expect(utilitarios.ehPalindromo(TEST_DATA.strings.palindrome)).toBe(true);
      expect(utilitarios.ehPalindromo(TEST_DATA.strings.notPalindrome)).toBe(false);
      expect(utilitarios.ehPalindromo("A Santa at NASA")).toBe(true);
      expect(utilitarios.ehPalindromo(TEST_DATA.strings.empty)).toBe(true);
      expect(utilitarios.ehPalindromo(TEST_DATA.strings.singleChar)).toBe(true);
    });
  });

  // -------------------
  // Números
  // -------------------
  describe("Funções Matemáticas", () => {
    const { PRIMEIRO_NUMERO, SEGUNDO_NUMERO, SOMA_ESPERADA, SUBTRACAO_ESPERADA, MULTIPLICACAO_ESPERADA, DIVISAO_NUMERADOR, DIVISAO_DENOMINADOR, DIVISAO_ESPERADA, NUMERO_PAR, NUMERO_IMPAR } = TEST_DATA.math;

    test("somar deve funcionar com positivos, negativos e zero", () => {
      expect(utilitarios.somar(PRIMEIRO_NUMERO, SEGUNDO_NUMERO)).toBe(SOMA_ESPERADA);
      expect(utilitarios.somar(-5, -10)).toBe(-15);
      expect(utilitarios.somar(0, 5)).toBe(5);
    });

    test("subtrair deve funcionar com positivos e negativos", () => {
      expect(utilitarios.subtrair(SEGUNDO_NUMERO, PRIMEIRO_NUMERO)).toBe(SUBTRACAO_ESPERADA);
      expect(utilitarios.subtrair(5, 10)).toBe(-5);
    });

    test("multiplicar deve funcionar com positivos, zero e negativos", () => {
      expect(utilitarios.multiplicar(PRIMEIRO_NUMERO, SEGUNDO_NUMERO)).toBe(MULTIPLICACAO_ESPERADA);
      expect(utilitarios.multiplicar(100, 0)).toBe(0);
      expect(utilitarios.multiplicar(-5, 3)).toBe(-15);
    });

    test("dividir deve lidar com casos normais, negativos e decimais", () => {
      expect(utilitarios.dividir(DIVISAO_NUMERADOR, DIVISAO_DENOMINADOR)).toBe(DIVISAO_ESPERADA);
      expect(() => utilitarios.dividir(10, 0)).toThrow("Divisão por zero");
      expect(utilitarios.dividir(10, 3)).toBeCloseTo(3.333, 3);
      expect(utilitarios.dividir(-10, 2)).toBe(-5);
    });

    test("ehPar deve validar corretamente", () => {
      expect(utilitarios.ehPar(NUMERO_PAR)).toBe(true);
      expect(utilitarios.ehPar(NUMERO_IMPAR)).toBe(false);
      expect(utilitarios.ehPar(0)).toBe(true);
      expect(utilitarios.ehPar(-4)).toBe(true);
      expect(utilitarios.ehPar(-3)).toBe(false);
      expect(utilitarios.ehPar(Number.MAX_SAFE_INTEGER - 1)).toBe(true);
    });
  });

  // -------------------
  // Arrays
  // -------------------
  describe("Manipulação de Array", () => {
    test("primeiroElemento e ultimoElemento devem lidar com arrays normais e vazios", () => {
      expect(utilitarios.primeiroElemento(TEST_DATA.arrays.numbers)).toBe(1);
      expect(utilitarios.ultimoElemento(TEST_DATA.arrays.numbers)).toBe(3);
      expect(utilitarios.primeiroElemento(TEST_DATA.arrays.empty)).toBeUndefined();
      expect(utilitarios.ultimoElemento(TEST_DATA.arrays.empty)).toBeUndefined();
      expect(utilitarios.primeiroElemento([42])).toBe(42);
      expect(utilitarios.ultimoElemento([42])).toBe(42);
    });

    test("tamanhoArray deve retornar corretamente", () => {
      expect(utilitarios.tamanhoArray(TEST_DATA.arrays.numbers)).toBe(3);
      expect(utilitarios.tamanhoArray(TEST_DATA.arrays.empty)).toBe(0);
    });

    test("ordenarArray deve ordenar corretamente e não modificar o original", () => {
      const original = [...TEST_DATA.arrays.unsorted];
      expect(utilitarios.ordenarArray(TEST_DATA.arrays.unsorted)).toEqual([1, 2, 3]);
      expect(TEST_DATA.arrays.unsorted).toEqual(original);

      expect(utilitarios.ordenarArray(TEST_DATA.arrays.strings)).toEqual(["a", "b", "c"]);
      expect(utilitarios.ordenarArray([100, 20, 3])).toEqual([100, 20, 3]); // sort padrão
    });

    test("inverterArray deve inverter corretamente e não modificar o original", () => {
      const original = [...TEST_DATA.arrays.numbers];
      expect(utilitarios.inverterArray(TEST_DATA.arrays.numbers)).toEqual([3, 2, 1]);
      expect(TEST_DATA.arrays.numbers).toEqual(original);
      expect(utilitarios.inverterArray(TEST_DATA.arrays.empty)).toEqual([]);
    });

    test("mediaArray deve lidar com arrays normais, vazios, negativos e decimais", () => {
      expect(utilitarios.mediaArray(TEST_DATA.arrays.forAverage)).toBe(3);
      expect(utilitarios.mediaArray([])).toBe(0);
      expect(utilitarios.mediaArray([1.5, 2.5, 3.5])).toBeCloseTo(2.5, 2);
      expect(utilitarios.mediaArray([-10, 0, 10])).toBe(0);
    });

    test("removerDuplicados deve funcionar corretamente com vários tipos", () => {
      expect(utilitarios.removerDuplicados(TEST_DATA.arrays.withDuplicates)).toEqual([1, 2, 3]);
      expect(utilitarios.removerDuplicados([3, 1, 1, 2, 3])).toEqual([3, 1, 2]);
      expect(utilitarios.removerDuplicados(["a", "b", "a", "c", "b"])).toEqual(["a", "b", "c"]);
      expect(utilitarios.removerDuplicados(TEST_DATA.arrays.mixedTypes)).toEqual([1, "1"]);
    });

    test("juntarArray deve funcionar com separador padrão, customizado, vazio e array vazio", () => {
      expect(utilitarios.juntarArray(TEST_DATA.arrays.numbers)).toBe("1,2,3");
      expect(utilitarios.juntarArray(["a", "b", "c"], "-")).toBe("a-b-c");
      expect(utilitarios.juntarArray(["a", "b", "c"], "")).toBe("abc");
      expect(utilitarios.juntarArray([])).toBe("");
    });
  });

  // -------------------
  // Outros utilitários
  // -------------------
  describe("gerarNumeroAleatorio", () => {
    const MAX_VALUE = 10;
    const SAMPLE_SIZE = 100;

    test("deve gerar números dentro do limite e inteiros", () => {
      const numeros = Array.from({ length: SAMPLE_SIZE }, () => utilitarios.gerarNumeroAleatorio(MAX_VALUE));
      numeros.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(MAX_VALUE);
        expect(Number.isInteger(num)).toBe(true);
      });
    });

    test("deve gerar números diferentes (aleatoriedade mínima)", () => {
      const numeros = Array.from({ length: SAMPLE_SIZE }, () => utilitarios.gerarNumeroAleatorio(MAX_VALUE));
      expect(new Set(numeros).size).toBeGreaterThan(1);
    });

    test("deve usar valor padrão se max não for especificado", () => {
      const numero = utilitarios.gerarNumeroAleatorio();
      expect(numero).toBeGreaterThanOrEqual(0);
      expect(numero).toBeLessThan(100);
    });
  });

  describe("ehNumero", () => {
    test("valores válidos", () => {
      expect(utilitarios.ehNumero(123)).toBe(true);
      expect(utilitarios.ehNumero(123.456)).toBe(true);
      expect(utilitarios.ehNumero(-123)).toBe(true);
      expect(utilitarios.ehNumero(0)).toBe(true);
    });

    test("valores inválidos", () => {
      expect(utilitarios.ehNumero("123")).toBe(false);
      expect(utilitarios.ehNumero(NaN)).toBe(false);
      expect(utilitarios.ehNumero(null)).toBe(false);
      expect(utilitarios.ehNumero(undefined)).toBe(false);
      expect(utilitarios.ehNumero({})).toBe(false);
      expect(utilitarios.ehNumero([])).toBe(false);
    });
  });

  describe("mesclarObjetos", () => {
    test("deve mesclar objetos corretamente", () => {
      expect(utilitarios.mesclarObjetos(TEST_DATA.objects.first, TEST_DATA.objects.second)).toEqual(TEST_DATA.objects.merged);
      expect(utilitarios.mesclarObjetos({}, { a: 1 })).toEqual({ a: 1 });
      expect(utilitarios.mesclarObjetos({ a: 1 }, {})).toEqual({ a: 1 });
    });

    test("não deve modificar os objetos originais", () => {
      const obj1 = { a: 1 }, obj2 = { b: 2 };
      const result = utilitarios.mesclarObjetos(obj1, obj2);
      expect(obj1).toEqual({ a: 1 });
      expect(obj2).toEqual({ b: 2 });
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test("deve lidar com objetos aninhados (shallow merge)", () => {
      expect(utilitarios.mesclarObjetos(TEST_DATA.objects.nested1, TEST_DATA.objects.nested2))
        .toEqual({ a: { x: 1 }, b: { y: 2 } });
    });
  });
});
