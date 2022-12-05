const getRoot = document.getElementById('root')

let sectionElement = document.createElement('section');
getRoot.appendChild(sectionElement);

let containerElement = document.createElement('div');
containerElement.classList.add('container1',);
sectionElement.appendChild(containerElement);

let buttonInContainer = document.createElement('Button');
buttonInContainer.classList.add('btn1');
buttonInContainer.classList.add('openPop');
buttonInContainer.innerText = "Open Calculator";
containerElement.appendChild(buttonInContainer)

let popup = document.createElement('div');
popup.classList.add('popup');
popup.setAttribute('id', 'popup');
containerElement.appendChild(popup)

let popup2 = document.getElementById('popup')
document.querySelector(".openPop").onclick = function jsFunc() {
  popup2.classList.add('openPopUp')
  console.log('Hello')
}
let displayElement = document.createElement('div');
displayElement.classList.add('display');
popup.appendChild(displayElement)

let displayElement1 = document.createElement('div');
displayElement1.classList.add('display-1');
displayElement1.innerText = "0";
displayElement.appendChild(displayElement1)

let displayElement2 = document.createElement('div');
displayElement2.classList.add('display-2');
displayElement2.innerText = "0";
displayElement.appendChild(displayElement2);

let tempresultEl = document.createElement('div');
tempresultEl.classList.add('temp-result');
displayElement.appendChild(tempresultEl)

let allButton = document.createElement('div');
allButton.classList.add('all_button')
popup.appendChild(allButton);


let popupClose = document.createElement('Button');
popupClose.classList.add('closepop')
popupClose.innerText = "Close";
popup.appendChild(popupClose)


document.querySelector(".closepop").onclick = function jsFunc() {
  popup2.classList.remove('openPopUp')
  console.log('Hello')
}

const array = [
  {
    text: "CE", className: ['last-entity-clear', 'button'],
  },
  {
    text: 'C', className: ['all-clear', 'button'],
  },
  {
    text: '%', className: ['button', 'operation']
  },
  {
    text: '/', className: ['button', 'operation'],
  },
  {
    text: 1, className: ['button', 'number']
  },
  {
    text: 2, className: ['button', 'number']
  },
  {
    text: 3, className: ['button', 'number']
  },
  {
    text: 'x', className: ['button', 'operation'],
  },
  {
    text: 4, className: ['button', 'number']
  },
  {
    text: 5, className: ['button', 'number'],
  },
  {
    text: 6, className: ['button', 'number'],
  },
  {
    text: '+', className: ['button', 'operation'],
  },
  {
    text: 7, className: ['button', 'number'],
  },
  {
    text: 8, className: ['button', 'number']
  },
  {
    text: 9, className: ['button', 'number']
  },
  {
    text: '-', className: ['button', 'operation'],
  },
  {
    text: 0, className: ['button', 'btn-0', 'number'],
  },
  {
    text: '.', className: ['button', 'number', 'dot'],
  },
  {
    text: "=", className: ['button', 'equal'],
  },
]

array.map((element) => {

  let calculaterEle = document.createElement('div');
  if (element.className instanceof Array) {
    element.className.forEach(item => {
      calculaterEle.classList.add(item);
    })
  } else
    calculaterEle.classList.add(element.className)
  calculaterEle.innerText = element.text;
  allButton.appendChild(calculaterEle)
})

const numberEl = document.querySelectorAll('.number')
const operationEl = document.querySelectorAll('.operation')
const equalEl = document.querySelector('.equal')
const allclearEl = document.querySelector('.last-entity-clear')
const clearlastEl = document.querySelector('.all-clear')

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;


numberEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) { //if we are clicking the dot and previosly we dont have dot then havdot = true
      haveDot = true;
    }
    else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    displayElement2.innerText = dis2Num;
  });

  operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
      if (!dis2Num) {
        return;
      }
      haveDot = false;
      const operationName = e.target.innerText;
      if (dis1Num && dis2Num && lastOperation) {
        mathOperation();
      } else {
        result = parseFloat(dis2Num);
      }
      clearVar(operationName);
      lastOperation = operationName;
    });
  });

  function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    displayElement1.innerText = dis1Num;
    displayElement2.innerText = "";
    dis2Num = "";
    tempresultEl.innerText = result;
  }


  function mathOperation() {
    if (lastOperation === "x") {
      result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
      result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
      result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
      result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
      result = parseFloat(result) % parseFloat(dis2Num);
    }
  }

  equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = true;
    mathOperation();
    clearVar();
    displayElement2.innerText = result;
    tempresultEl.innerText = "";
    dis2Num = result;
    dis1Num = "";
  });

  allclearEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    displayElement1.innerText = "";
    displayElement2.innerText = "";
    result = "";
    tempresultEl.innerText = "";
    haveDot = false;
  });

  clearlastEl.addEventListener("click", () => {
    displayElement2.innerText = "";
    haveDot = false;
    dis2Num = "";
  });


});
