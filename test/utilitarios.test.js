let utils;

beforeEach(() => {
  utils = new Utilitarios();
});

describe("Utilitarios - Strings", () => {
  test("primeiraLetraMaiuscula deve lidar com string vazia sem erro", () => {
    expect(utils.primeiraLetraMaiuscula("")).toBe("");
  });

  test("repetirTexto deve repetir corretamente com 1 repetição", () => {
    expect(utils.repetirTexto("z", 1)).toBe("z");
  });
});

describe("Utilitarios - Números", () => {
  test("ehNumero deve aceitar Infinity como número", () => {
    expect(utils.ehNumero(Infinity)).toBe(true);
  });

  test("gerarNumeroAleatorio deve gerar valores diferentes em chamadas múltiplas", () => {
    const n1 = utils.gerarNumeroAleatorio(1000);
    const n2 = utils.gerarNumeroAleatorio(1000);
    expect(n1).not.toBe(n2); // pode falhar raramente, mas ajuda na confiabilidade
  });
});

describe("Utilitarios - Arrays", () => {
  test("ordenarArray deve ordenar strings corretamente", () => {
    const arr = ["c", "a", "b"];
    expect(utils.ordenarArray(arr)).toEqual(["a", "b", "c"]);
  });

  test("removerDuplicados deve lidar com array vazio", () => {
    expect(utils.removerDuplicados([])).toEqual([]);
  });

  test("juntarArray deve usar separador padrão se não fornecido", () => {
    expect(utils.juntarArray([1, 2, 3])).toBe("1,2,3");
  });
});

describe("Utilitarios - Objetos", () => {
  test("mesclarObjetos deve lidar com dois objetos vazios", () => {
    expect(utils.mesclarObjetos({}, {})).toEqual({});
  });
});