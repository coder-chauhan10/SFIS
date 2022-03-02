import { db , onValue, ref, set} from '../components/clientApp/clientApp';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';

export default function Home() {
  const [motor, setmotor] = useState(false);

  const onBtnClick = () => {
    set(ref(db, "agritech/motor"), {
      status: (motor ? 0 : 1)
    }).catch(alert);
    setmotor(!motor);
  }

  useEffect(() => {
    onValue(ref(db, "agritech/motor"), (snapshot) => {
      if (snapshot.val().status == 1) {setmotor(true)};
    });
  }, [])
  return (
    <>
      <Layout title="SFIS | Smart Farm Irrigation System">
        <div className="w-full h-full flex flex-col items-center justify-center">
        <span className={`text-white text-3xl mb-7 border-b-2 ${!motor ? "border-green-200" : "border-red-200"}`}>Mannualy</span>
          <button onClick={onBtnClick} className={`py-10 px-14 uppercase ${!motor ? "bg-green-200" : "bg-red-200"} rounded`}>{motor ? "off" : "on"}</button>
        </div>
      </Layout>
    </>
  )
}
