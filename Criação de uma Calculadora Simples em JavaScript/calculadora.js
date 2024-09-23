let numero1 = 15
let numero2 = 15
let adicao
let subtracao
let multiplicacao
let divisao 
let invalido
let calculadora = "/"
switch (calculadora) { 

    case '+': 
  
      adicao = numero1 + numero2
      console.log("Adição: " + adicao)

      break
  
    case '-': 
  
      subtracao = numero1 - numero2
      console.log("Subtração: " + subtracao)

      break
    
    case '*': 
  
        multiplicacao = numero1 * numero2
        console.log("Multiplicação: " + multiplicacao)

      break

    case '/':
        if (numero2 === 0) {
            console.log("Não é possivel dividir o 0")
        } else{
            let divisao = numero1 / numero2
            console.log("Divisão: " + divisao)
        }

      break
  
    default: 
  
      console.log('Operador Inválido')
  }