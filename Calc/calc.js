// const http = require('node:http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


class Calculator {
   constructor(previousOperandTextElementBtn, currentOperandTextElementBtn) {
      this.previousOperandTextElementBtn = previousOperandTextElementBtn
      this.currentOperandTextElementBtn = currentOperandTextElementBtn
      this.clear()
   }



   clear() {
      this.currentOperand = ' '
      this.previousOperand = ' '
      this.operation = undefined
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
   }

   appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString();
   }

   chooseOperation(operation) {
      if (this.currentOperand === ' ') return
      if (this.previousOperand !== ' ') {
         this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ' '
   }

   compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const curr = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(curr)) return
      switch (this.operation) {
         case '+':
            computation = prev + curr;
            break

         case '−':
            computation = prev - curr;
            break
         case '×':
            computation = prev * curr;
            break
         case '÷':
            computation = prev / curr;
            break
         default:
            return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ' '
   }

   getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
         integerDisplay = ' '
      } else {
         integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
         }  
         if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
         } else {
            return integerDisplay
         }
   }

   updateDisplay(operation ) {
      this.currentOperandTextElementBtn.innerText = this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
         this.previousOperandTextElementBtn.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.getDisplayNumber(this.operation)}`
      }
      else {
         this.previousOperandTextElementBtn.innerText = ''
      }
   }
}

const numberBtns = document.querySelectorAll('[data-number]')
const previousOperandTextElementBtn = document.querySelector('[data-prev]')
const currentOperandTextElementBtn = document.querySelector('[data-curr]')
const operationBtn = document.querySelectorAll('[data-operation]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-allclr]')
const equalBtn = document.querySelector('[data-equals]')


const calculator = new Calculator(previousOperandTextElementBtn, currentOperandTextElementBtn);

numberBtns.forEach(button => {
   button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
   })
})


operationBtn.forEach(button => {
   button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay();
   })
})

equalBtn.addEventListener('click', () => {
   calculator.compute()
   calculator.updateDisplay()
})

allClearBtn.addEventListener('click', () => {
   calculator.clear()
   calculator.updateDisplay()
})
deleteBtn.addEventListener('click', () => {
   calculator.delete()
   calculator.updateDisplay()
})




