import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ ticTacToe,setTicTacToe ] = useState<Array<'X' | '0' | null>>(new Array(9).fill(null).map(_data=>null))
  const [ turn,setTurn ] = useState<'X' | '0'>('X')
  const [ gameStatus,setGameStatus ] = useState<string | null>(null)
  const checkCondition = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

  useEffect(()=>{
    let status : string | null = gameStatus
    checkCondition.forEach(data=>{
      if(data.every(value=> ticTacToe[value-1]===turn)){
        status=`${turn} Winner.`
        setGameStatus(status)
        return
      }
    })
    if(ticTacToe.filter(d=> d===null).length!==9){
      if(status===null){
        const checkLength = ticTacToe.filter(d=> d!==null)
        console.log(checkLength.length)
        if(checkLength.length===9){
          setGameStatus('Game Draw')
          return
        }
      }
      setTurn(state=> state==='X' ? '0' : 'X')
    }
  },[ticTacToe])

  const onFillBoxes = (index:number) => {
    if(gameStatus===null){
      const tempBoxes = [...ticTacToe]
      tempBoxes.splice(index,1,turn)
      setTicTacToe([...tempBoxes])
    }
  }

  const resetState = () => {
    setTicTacToe(new Array(9).fill(null).map(_data=>null))
    setGameStatus(null)
    setTurn('X')
  }

  return (
    <div className="App">
      <button className="text-sm" onClick={resetState}>Reset</button>
      <div className="text-5xl py-5">Tic Tac Toe</div>
      <div className='text-2xl pb-5'>Status: {
        gameStatus ? gameStatus : `${turn} Turn`
      }</div>
      <div className="grid grid-cols-3 grid-rows-3 h-[300px] w-[300px]">
        {
          ticTacToe.map((state,index)=>(<div onClick={()=>onFillBoxes(index)} key={index} className={ `relative text-5xl flex justify-center items-center ${[0,1,3,4].includes(index) ? 'border-r-2 border-b-2' : ''} ${[2,5].includes(index) ? 'border-b-2' : ''} ${[6,7].includes(index) ? 'border-r-2' : ''}` }>
            {state}
            {
              gameStatus && 
              <div  className="border-2 w-full absolute"></div>
            }
          </div>))
        }
      </div>
    </div>
  )
}

export default App
