import { db , onValue, ref, set} from '../components/clientApp/clientApp';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';

export default function Home() {
  const [motor, setmotor] = useState(false);
  const hourInput = useRef(0);
  const minInput = useRef(0);
  const AmPmInput = useRef(0);
  const hour = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const min = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"];

  const onBtnClick = () => {
    console.log(hourInput.current.value)
    console.log(minInput.current.value)
    console.log(AmPmInput.current.value)
    // set(ref(db, "agritech/"), {
    //   motor: (motor ? 0 : 1)
    // }).catch(alert);
    // setmotor(!motor);
  }

  useEffect(() => {
    onValue(ref(db, "agritech"), (snapshot) => {
      if (snapshot.val().motor == 1) {setmotor(true)};
    });
  }, [])
  return (
    <>
      <Layout title="SFIS | Smart Farm Irrigation System">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className={`text-white text-3xl mb-7 border-b`}>Automatic</span>
          <div className='flex flex-col items-center px-20 py-10 mt-3 border-green-300 border rounded-lg text-gray-50'>
            <div className='my-3'>
              <select ref={hourInput} className='bg-transparent px-3 py-1 border-green-800 border rounded' name="hour" id="">
                {hour.map((digi, i) => digi == "00" ? <option value={digi} key={i} selected>{digi}</option> : <option value={digi} key={i}>{digi}</option>)}
              </select>
              <span> : </span>
              <select ref={minInput} className='bg-transparent px-3 py-1 border-green-800 border rounded' name="min" id="">
                {min.map((digi, i) => digi == "00" ? <option value={digi} key={i} selected>{digi}</option> : <option value={digi} key={i}>{digi}</option>)}
              </select>
              <span>  </span>
              <select ref={AmPmInput} className='bg-transparent px-3 py-1 border-green-800 border rounded' name="amPm" id="">
                <option value="am" selected>AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
            <div>
              <span>Times: </span><input className='bg-gray-800 w-12 rounded' type="number" min={1}/>
            </div>
            <button className='bg-green-700 rounded-full text-lg px-4 py-1' onClick={onBtnClick}>Set Config</button>
          </div>
        </div>
      </Layout>
    </>
  )
}
