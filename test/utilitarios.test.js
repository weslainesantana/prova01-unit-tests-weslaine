const Utilitarios = require("../src/utilitarios");

let utils;

beforeEach(() => {
  utils = new Utilitarios();
});

describe("Utilitarios - Strings", () => {
  test("inverterString deve inverter corretamente", () => {
    expect(utils.inverterString("abc")).toBe("cba");
    expect(utils.inverterString("")).toBe("");
    expect(utils.inverterString("a b c")).toBe("c b a");
  });

  test("contarCaracteres deve contar corretamente", () => {
    expect(utils.contarCaracteres("teste")).toBe(5);
    expect(utils.contarCaracteres("")).toBe(0);
    expect(utils.contarCaracteres("a b c")).toBe(5);
  });

  test("paraMaiusculas deve converter corretamente", () => {
    expect(utils.paraMaiusculas("abc")).toBe("ABC");
    expect(utils.paraMaiusculas("ABC")).toBe("ABC");
    expect(utils.paraMaiusculas("TeStE123")).toBe("TESTE123");
  });

  test("paraMinusculas deve converter corretamente", () => {
    expect(utils.paraMinusculas("ABC")).toBe("abc");
    expect(utils.paraMinusculas("abc")).toBe("abc");
  });

  test("primeiraLetraMaiuscula deve capitalizar apenas a primeira letra", () => {
    expect(utils.primeiraLetraMaiuscula("teste")).toBe("Teste");
    expect(utils.primeiraLetraMaiuscula("Teste")).toBe("Teste");
    expect(utils.primeiraLetraMaiuscula("")).toBe("");
  });

  test("removerEspacos deve remover apenas bordas", () => {
    expect(utils.removerEspacos("  oi ")).toBe("oi");
    expect(utils.removerEspacos(" oi  oi ")).toBe("oi  oi");
  });

  test("repetirTexto deve repetir corretamente", () => {
    expect(utils.repetirTexto("ab", 3)).toBe("ababab");
    expect(utils.repetirTexto("x", 0)).toBe("");
  });

  test("contarPalavras deve contar palavras corretamente", () => {
    expect(utils.contarPalavras("um dois três")).toBe(3);
    expect(utils.contarPalavras("   unico   ")).toBe(1);
    expect(utils.contarPalavras("a    b")).toBe(2);
  });

  test("ehPalindromo deve validar corretamente", () => {
    expect(utils.ehPalindromo("Ana")).toBe(true);
    expect(utils.ehPalindromo("banana")).toBe(false);
    expect(utils.ehPalindromo("A man, a plan, a canal: Panama")).toBe(true);
  });
});

describe("Utilitarios - Números", () => {
  test("somar deve funcionar com positivos, negativos e zero", () => {
    expect(utils.somar(2, 3)).toBe(5);
    expect(utils.somar(-2, -3)).toBe(-5);
    expect(utils.somar(0, 7)).toBe(7);
  });

  test("subtrair deve retornar a diferença", () => {
    expect(utils.subtrair(10, 5)).toBe(5);
    expect(utils.subtrair(5, 10)).toBe(-5);
  });

  test("multiplicar deve funcionar em casos gerais", () => {
    expect(utils.multiplicar(3, 4)).toBe(12);
    expect(utils.multiplicar(10, 0)).toBe(0);
    expect(utils.multiplicar(-2, 3)).toBe(-6);
  });

  test("dividir deve retornar corretamente ou lançar erro", () => {
    expect(utils.dividir(10, 2)).toBe(5);
    expect(utils.dividir(9, 2)).toBeCloseTo(4.5);
    expect(utils.dividir(-10, 2)).toBe(-5);
    expect(() => utils.dividir(5, 0)).toThrow("Divisão por zero");
  });

  test("ehPar deve identificar pares, ímpares e negativos", () => {
    expect(utils.ehPar(4)).toBe(true);
    expect(utils.ehPar(7)).toBe(false);
    expect(utils.ehPar(0)).toBe(true);
    expect(utils.ehPar(-2)).toBe(true);
  });

  test("ehNumero deve validar corretamente diferentes tipos", () => {
    expect(utils.ehNumero(123)).toBe(true);
    expect(utils.ehNumero(-45.6)).toBe(true);
    expect(utils.ehNumero("123")).toBe(false);
    expect(utils.ehNumero(NaN)).toBe(false);
    expect(utils.ehNumero(null)).toBe(false);
    expect(utils.ehNumero(undefined)).toBe(false);
  });

  test("gerarNumeroAleatorio deve respeitar limites e ser inteiro", () => {
    const n = utils.gerarNumeroAleatorio(10);
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThan(10);
    expect(Number.isInteger(n)).toBe(true);

    const defaultNum = utils.gerarNumeroAleatorio();
    expect(defaultNum).toBeLessThan(100);
  });
});

describe("Utilitarios - Arrays", () => {
  test("primeiroElemento deve retornar o primeiro item ou undefined", () => {
    expect(utils.primeiroElemento([1, 2, 3])).toBe(1);
    expect(utils.primeiroElemento([])).toBeUndefined();
  });

  test("ultimoElemento deve retornar o último item ou undefined", () => {
    expect(utils.ultimoElemento([1, 2, 3])).toBe(3);
    expect(utils.ultimoElemento([42])).toBe(42);
    expect(utils.ultimoElemento([])).toBeUndefined();
  });

  test("tamanhoArray deve retornar o tamanho", () => {
    expect(utils.tamanhoArray([1, 2, 3])).toBe(3);
    expect(utils.tamanhoArray([])).toBe(0);
  });

  test("ordenarArray deve ordenar e não alterar o original", () => {
    const arr = [3, 1, 2];
    const copia = [...arr];
    expect(utils.ordenarArray(arr)).toEqual([1, 2, 3]);
    expect(arr).toEqual(copia);
  });

  test("inverterArray deve inverter e não alterar o original", () => {
    const arr = [1, 2, 3];
    const copia = [...arr];
    expect(utils.inverterArray(arr)).toEqual([3, 2, 1]);
    expect(arr).toEqual(copia);
    expect(utils.inverterArray([])).toEqual([]);
  });

  test("mediaArray deve calcular corretamente", () => {
    expect(utils.mediaArray([2, 4, 6])).toBe(4);
    expect(utils.mediaArray([])).toBe(0);
    expect(utils.mediaArray([1.5, 2.5, 3.5])).toBeCloseTo(2.5);
    expect(utils.mediaArray([-10, 0, 10])).toBe(0);
  });

  test("removerDuplicados deve remover mantendo ordem", () => {
    expect(utils.removerDuplicados([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(utils.removerDuplicados(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  test("juntarArray deve juntar corretamente", () => {
    expect(utils.juntarArray([1, 2, 3])).toBe("1,2,3");
    expect(utils.juntarArray(["a", "b", "c"], "-")).toBe("a-b-c");
    expect(utils.juntarArray([], "-")).toBe("");
  });
});

describe("Utilitarios - Objetos", () => {
  test("mesclarObjetos deve unir sem alterar originais", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3 };
    const copia1 = { ...obj1 };
    const copia2 = { ...obj2 };

    const result = utils.mesclarObjetos(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
    expect(obj1).toEqual(copia1);
    expect(obj2).toEqual(copia2);
  });

  test("mesclarObjetos deve sobrescrever propriedades repetidas", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 99, c: 5 };
    expect(utils.mesclarObjetos(obj1, obj2)).toEqual({ a: 1, b: 99, c: 5 });
  });

  test("mesclarObjetos deve lidar com objetos vazios", () => {
    expect(utils.mesclarObjetos({}, { x: 1 })).toEqual({ x: 1 });
    expect(utils.mesclarObjetos({ y: 2 }, {})).toEqual({ y: 2 });
  });
});