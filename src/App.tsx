import { useEffect, useState } from 'react'
// import localforage from 'localforage';
import './App.scss'

interface IHistoryItem {
  firstValue: string,
  actionValue: string,
  secondValue: string,
  result: string
}

function App() {

  // useEffect(() => {
  //   // const history = getData()

  //   if (getData() === null) {
  //     localStorage.setItem('history', JSON.stringify([]));
  //   }
  // }, [])


  const [firstValue, setFirstValue] = useState('')
  const [actionValue, setActionValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [resultValue, setResultValue] = useState('0')
  // const [history, setHistory] = useState<IHistoryItem[]>([])
  // const [history, setHistory] = useState<IHistoryItem[]>(getData() || []);
  const [history, setHistory] = useState<IHistoryItem[]>(JSON.parse(localStorage.getItem('history') as string) || [])
  const [onFirstValue, setOnFirstValue] = useState(true)
  console.log(history);
  


  function saveHistory(item: IHistoryItem) {
    // localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('history', JSON.stringify([...history, item]));
  }

  // function getData() {
  //   const history = JSON.parse(localStorage.getItem('history') as string)
  //   return history
  // }

  useEffect(() => {
    if (firstValue) {
      setResultValue(String(firstValue) + String(actionValue) + String(secondValue))
    }
  }, [firstValue, actionValue, secondValue])

  const calculating = (firstValue: string, actionValue: string, secondValue: string) => {
    if (firstValue.length === 0 ||
      actionValue.length === 0 ||
      secondValue.length === 0) {
      return
    }
    let result: number = 0
    switch (actionValue) {
      case '+':
        result = toFixed(Number(firstValue) + Number(secondValue))
        break;

      case '-':
        result = toFixed(Number(firstValue) - Number(secondValue))
        break;

      case '*':
        result = toFixed(Number(firstValue) * Number(secondValue))
        break;

      case '/':
        result = toFixed(Number(firstValue) / Number(secondValue))
        break;

      default:
        console.error('err');
        break
    }
    addItemINHistory(String(result))
    setResultValue(String(result))
  }

  const cleaningValues = () => {
    setFirstValue('')
    setActionValue('')
    setSecondValue('')
    setResultValue('0')
    setOnFirstValue(true)
  }

  const changeActionValue = (value: string) => {
    setActionValue(value)
    setOnFirstValue(false)
  }

  const changeValue = (value: number | string) => {
    if (onFirstValue) {
      if (firstValue.length < 5) {
        setFirstValue(String(firstValue) + String(value))
      }
    } else {
      if (secondValue.length < 5) {
        setSecondValue(String(secondValue) + String(value))
      }
    }
  }

  const reverseNumber = () => {
    switch (onFirstValue) {
      case true:
        setFirstValue(String(Number(firstValue) * -1))
        break;

      case false:
        setSecondValue(String(Number(secondValue) * -1))
        break;
    }
  }

  const interest = () => {
    switch (onFirstValue) {
      case true:
        // 
        break;

      case false:
        setSecondValue(String(Number(firstValue) / 100 * Number(secondValue)))
        break;
    }
  }

  const toFixed = (value: number | string) => {
    const power = Math.pow(10, 14);
    return Number(Math.round(Number(value) * power) / power);
  }

  const addDotInValue = () => {
    switch (onFirstValue) {
      case true:
        if (firstValue.indexOf('.') === -1) {
          setFirstValue(String(firstValue) + '.')
        }
        break;

      case false:
        if (secondValue.indexOf('.') === -1) {
          setSecondValue(String(secondValue) + '.')
        }
        break;
    }
  }

  const addItemINHistory = (result: string) => {
    const item: IHistoryItem = {
      firstValue,
      actionValue,
      secondValue,
      result
    }
    setHistory((prev: IHistoryItem[]) => prev ? [...prev, item] : [item])
    saveHistory(item)
  }

  // const randomNumber = Math.floor(Number(firstValue) * Math.random() * 100) + 1
  // console.log(randomNumber);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="view">
          <ul className="history">
            {history ? history.map((item: IHistoryItem, index: number) => {
              return <li
                key={index}
                className="history__item"
              >
                {item.firstValue} {item.actionValue} {item.secondValue} &#61; {item.result}
              </li>
            }) : ''}
          </ul>
          <h1 className="result">
            {resultValue}
          </h1>
        </div>
        <div className="buttons">
          <button className="btn btn-cleaning btn-supporting" onClick={_e => cleaningValues()}>C</button>
          <button className="btn btn-plus-minus btn-supporting" onClick={_e => reverseNumber()}>&plusmn;</button>
          <button className="btn btn-interest btn-supporting" onClick={_e => interest()}>%</button>
          <button className="btn btn-division btn-actions" onClick={_e => changeActionValue('/')}>&divide;</button>
          <button className="btn btn-seven" onClick={_e => changeValue('7')}>7</button>
          <button className="btn btn-eight" onClick={_e => changeValue('8')}>8</button>
          <button className="btn btn-nine" onClick={_e => changeValue('9')}>9</button>
          <button className="btn btn-multiplication btn-actions" onClick={_e => changeActionValue('*')}>&#10006;</button>
          <button className="btn btn-four" onClick={_e => changeValue('4')}>4</button>
          <button className="btn btn-five" onClick={_e => changeValue('5')}>5</button>
          <button className="btn btn-six" onClick={_e => changeValue('6')}>6</button>
          <button className="btn btn-minus btn-actions" onClick={_e => changeActionValue('-')}>&ndash;</button>
          <button className="btn btn-one" onClick={_e => changeValue('1')}>1</button>
          <button className="btn btn-two" onClick={_e => changeValue('2')}>2</button>
          <button className="btn btn-three" onClick={_e => changeValue('3')}>3</button>
          <button className="btn btn-plus btn-actions" onClick={_e => changeActionValue('+')}>+</button>
          <button
            className="btn btn-zero"
            onClick={_e => changeValue('0')}
          >
            0
          </button>
          <button className="btn btn-dot btn-supporting" onClick={_e => addDotInValue()}>.</button>
          <button className="btn btn-actions" onClick={_e => calculating(firstValue, actionValue, secondValue)}>&#61;</button>
        </div>
      </div>
    </div>
  )
}

export default App