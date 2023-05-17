import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const Calculator = () => {

  const {saveCalculation} = useContext(DataContext);
  const {calcName} = useContext(DataContext);
  const {value} = useContext(DataContext);
  const {result} = useContext(DataContext);
  const {setCalcName} = useContext(DataContext);
  const {setValue} = useContext(DataContext);
  const {setResult} = useContext(DataContext);
  const {enableEdit} = useContext(DataContext);
  const {editCalculation} = useContext(DataContext);

  const handleClick = (e) => {
    // setValue(value.concat(e.target.innerHTML))
    setValue(value + e.target.innerHTML)
    // console.log(e.target.innerHTML);
  }

  const calculate = () => {
    const operators = ['+','-','×','÷','%', '±'];
    let num = 0;
    let str = "";

    for(let i=0; i<value.length; i++){
      if(operators.includes(value[i])){
        str = value[i];
      }
    }

    const arr = value.split(str);

    

    switch(str){
      case '+':
        setResult(parseFloat(arr[0]) + parseFloat(arr[1]));
        break;
      case '-':
        // let ans = 0;
        num = parseFloat(arr[0]) - parseFloat(arr[1]);
        setResult(num.toFixed(6));
        break;
      case '×':
        setResult(parseFloat(arr[0]) * parseFloat(arr[1]));
        break;
      case '÷':
        setResult(parseFloat(arr[0]) / parseFloat(arr[1]));
        break;
      case '%':
        arr[1] === "" ? setResult(parseFloat(arr[0]) * 0.01) : setResult((parseFloat(arr[0]) / 100) * parseFloat(arr[1]));
        
        break;
      case '±':
        setResult(parseFloat(arr[0]) * -1);
        break;
      default:
        alert("Invalid Input!");
    }
  }

  const handleSubmit = () => {
    // e.preventDefault();

    const data = {
      name: calcName,
      value: value,
      result: result
    }

    if(calcName === "" || value === "" || result === ""){
      setCalcName("");
      alert("Cannot submit empty field");
      return
    }

    saveCalculation(data);
    setCalcName("")

  }

  return (
    <div>
      <p className='text-4xl font-bold mb-5'>Calculator</p>
      <div className='text-white text-xl font-bold h-[400px] w-[300px]'>
        <div className='relative bg-[#575051] bg h-[100px]'>
          <div className='absolute right-2 bottom-2 text-4xl font-light'>{result !== "" ? <p className='text-[15px] font-bold'>{result}</p> : value}</div>
        </div>
        <section className='h-[300px] bg-red-500 flex flex-col'>
          <div className='grid grid-cols-4 flex-1'>
            <button className='border border-[#575051] border-r-0 bg-[#777272]' onClick={() => {setResult(""); setValue("")}}>AC</button>
            <button className='border border-[#575051] border-r-0 bg-[#777272]' onClick={handleClick}>±</button>
            <button className='border border-[#575051] border-r-0 bg-[#777272]' onClick={handleClick}>%</button>
            <button className='border border-[#575051] bg-[#fc9f0f]' onClick={handleClick}>÷</button>
          </div>
          <div className='grid grid-cols-4 flex-1'>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>7</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>8</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>9</button>
            <button className='border border-[#575051] border-t-0 bg-[#fc9f0f]' onClick={handleClick}>×</button>
          </div>
          <div className='grid grid-cols-4 flex-1'>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>4</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>5</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>6</button>
            <button className='border border-[#575051] border-t-0 bg-[#fc9f0f]' onClick={handleClick}>-</button>
          </div>
          <div className='grid grid-cols-4 flex-1'>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>1</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>2</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>3</button>
            <button className='border border-[#575051] border-t-0 bg-[#fc9f0f]' onClick={handleClick}>+</button>
          </div>
          <div className='grid grid-cols-4 flex-1'>
            <button className='col-span-2 border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>0</button>
            <button className='border border-[#575051] border-r-0 border-t-0 bg-[#989696]' onClick={handleClick}>.</button>
            <button className='border border-[#575051] border-t-0 bg-[#fc9f0f]' onClick={calculate}>=</button>
          </div>
          
        </section>

        <section className='text-black mt-5 text-sm'>
          <p className='mb-1'>Calculation Name</p>
          <div className='flex gap-4'>
            <input type="text" value={calcName} placeholder='Enter Name' className='font-normal border-2 px-4 py-1.5' onChange={(e) => setCalcName(e.target.value)} required/>
            {enableEdit ? <button type='submit' className='font-normal bg-violet-800 text-white px-7' onClick={() => editCalculation({name: calcName, value: value, result:result})}>Edit</button> : <button type='submit' className='font-normal bg-violet-800 text-white px-7' onClick={handleSubmit}>Save</button>}
            
          </div>
        </section>
      </div>
    </div>
  )
}

export default Calculator