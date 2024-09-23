const notas = []

notas[0] = 10
notas[1] = 8
notas[2] = 6.5
notas[3] = 9
notas[4] = 7

console.log(notas)

console.log("primeira e ultima:", + notas[0],"e",+ notas[4])
console.log(notas.push(5))
console.log(notas.shift())
console.log(notas)

let result = ''
for (const index in notas) { 
    result += notas[index] + ' ';
} 
console.log(result);

const media = notas.reduce((soma,nota)=>soma+nota,0)/notas.length;
console.log("media das notas: ", media)

const acima = notas.filter(nota =>nota > 7);
console.log("notas acima de 7: ", acima)

notas.sort((a,b)=> a-b);
console.log("notas em ordem crescente", notas)

const notaseis = notas.includes(6.5);
console.log(notaseis)

const indexoito = notas.indexOf(8);
console.log("indece da nota 8: ", indexoito)