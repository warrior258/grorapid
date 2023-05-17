import { useEffect, useState } from 'react'
import Calculator from './components/Calculator'
import History from './components/History'
import axios from 'axios'
import { DataContext } from './context/DataContext' 

const App = () => {

  const [loading, setLoading] = useState(false);

  const [enableEdit, setEnableEdit] = useState(false);
  const [editID, setEditID] = useState("");

  const [calcName, setCalcName] = useState("");

  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const [history, setHistory] = useState([]);

  const getHistory = async () => {

    setLoading(true);

    try {
      const res = await axios.get('https://grorapid.onrender.com/api/v1/calculations');
      setHistory(res.data);
      setLoading(false)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    getHistory();
  }, [])

  const deleteHistory = async (id) => {

    try {
      const res = await axios.delete(`https://grorapid.onrender.com/api/v1/calculations/${id}`);
      console.log(res.data);
      getHistory();
      alert("Deleted!")
    } catch (error) {
      console.log(error);
    }
    
  };

  const saveCalculation = async (data) => {

    try {
      const res = await axios.post('https://grorapid.onrender.com/api/v1/calculations', data);
      getHistory();
      setValue("");
      setResult("");
      setCalcName("");
      alert("Saved!")
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

  };

  const editCalculation = async (data) => {

    try {
      const res = await axios.patch(`https://grorapid.onrender.com/api/v1/calculations/${editID}`, data);
      getHistory();
      setEnableEdit(false)
      setValue("");
      setResult("");
      setCalcName("");
      alert("Edited")
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

  };

  const editData = (data) => {
    setEditID(data._id)
    setEnableEdit(true)
    setValue(data.value);
    setResult(data.result);
    setCalcName(data.name)
  }

  return (
    <div className='flex md:flex-row md:items-start items-center flex-col gap-[150px] mt-10'>
      <DataContext.Provider value={{
        saveCalculation,
        calcName,
        value,
        result,
        setCalcName,
        setValue,
        setResult,
        enableEdit,
        setEnableEdit,
        editCalculation,
        history,
        deleteHistory,
        editData,
        loading
      }}>
       <Calculator/>
       <History />
      </DataContext.Provider>
    </div>
  )
}

export default App
