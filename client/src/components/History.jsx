import { useContext } from "react"
import { DataContext } from "../context/DataContext"

const History = () => {

  const {history} = useContext(DataContext);
  const {deleteHistory} = useContext(DataContext);
  const {editData} = useContext(DataContext);

  return (
    <div className="md:mb-0 mb-10">
      <p className='text-4xl font-bold mb-5 md:px-0 px-10'>Your Calculations</p>
      <table className="md:min-w-[400px] mx-auto">
        <thead className="text-left">
          <tr className="border border-x-0 md:text-medium text-xs">
            <th className="md:px-2 px-1">✅</th>
            <th className="md:px-2 px-1">Name</th>
            <th className="md:px-2 px-1">Calculation</th>
            <th className="md:px-2 px-1">Result</th>
            <th className="md:px-2 px-1"></th>
          </tr>
        </thead>

        <tbody>
          {history.map((calc, idx) => (
            <tr key={idx} className="border border-x-0">
              <td className="md:px-2 px-1">✅</td>
              <td className="md:px-2 px-1">{calc.name}</td>
              <td className="md:px-2 px-1">{calc.value}</td>
              <td className="md:px-2 px-1">{calc.result}</td>
              <td className="md:px-2 px-1"><span className="cursor-pointer" onClick={() => editData(calc)}>♻️</span><span className="ml-2 cursor-pointer" onClick={() => deleteHistory(calc._id)}>🗑️</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default History