let aluno = {
    nome: "Pedro filho",
    idade: 18,
    curso: "Engenharia de Software",
    notas: [6.5, 9.0, 4.0]
  };
  
  console.log(`Nome do aluno: ${aluno.nome}`);
  console.log(`Primeira nota: ${aluno.notas[0]}`);
  
  aluno.idade = 19;
  aluno.notas.push(9.5);
  
  console.log(aluno);
  
  let alunoJSON = JSON.stringify(aluno);
  console.log("Objeto convertido em string JSON:", alunoJSON);
  
  let alunoObj = JSON.parse(alunoJSON);
  console.log("Objeto convertido de volta:", alunoObj);
  
  for (let propriedade in aluno) {
    console.log(`${propriedade}: ${aluno[propriedade]}`);
  }
  
  let soma = aluno.notas.reduce((acc, nota) => acc + nota, 0);
  let media = soma / aluno.notas.length;
  console.log(`Média das notas: ${media.toFixed(2)}`);
  
  aluno.endereco = {
    rua: "Rua das margaridas",
    cidade: "João Pessoa",
    estado: "PB"
  };
  console.log(aluno);
  
  console.log(`Cidade: ${aluno.endereco.cidade}`);
  console.log(`Estado: ${aluno.endereco.estado}`);
  
  let alunos = [
    {
      nome: "Flavio junior",
      idade: 22,
      curso: "Engenharia de Software",
      notas: [8.5, 5.0, 6.5],
      endereco: { rua: "Rua das rosas", cidade: "Rio de Janeiro", estado: "RJ" }
    },
    {
      nome: "Maria Souza",
      idade: 20,
      curso: "Ciência da Computação",
      notas: [5.0, 4.5, 10.0],
      endereco: { rua: "Pão de queijo", cidade: "Belo Horizonte", estado: "MG" }
    },
    {
      nome: "Pedro Almeida",
      idade: 23,
      curso: "Engenharia de Software",
      notas: [6.0, 7.5, 8.0],
      endereco: { rua: "Rua das Palmeiras", cidade: "Belo Horizonte", estado: "MG" }
    }
  ];
  
  console.log(alunos);
  
  let alunosComMediaAlta = alunos.filter(aluno => {
    let media = aluno.notas.reduce((acc, nota) => acc + nota, 0) / aluno.notas.length;
    return media > 8;
  });
  
  console.log("Alunos com média maior que 8:", alunosComMediaAlta);