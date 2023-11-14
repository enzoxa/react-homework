import { useState, useEffect } from 'react'
import './App.css'
import { DropDown } from './components/DropDown/index';

function App() {
  //const [count, setCount] = useState(0)

  const [data, setData] = useState(null);

  async function fGetDataFromApi() {
    let response = await Promise.resolve(fetch('https://reqres.in/api/unknown'));
    let respJson = await response.json();
    setData(respJson)
  }

  const [asyncData, setAsyncData] = useState(null);
  const [resp, setData2] = useState(null);
  useEffect(() => {

    const fetchData = () => {
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(async response => {
          const respJson = await response.json()
          //Имитируем долгий ответ от API
          setTimeout(() => {
            setAsyncData("something");
          }, 5000);
          !asyncData ? null : setData2(respJson)
        }
        )
    }
    //декларированная внутри
    fetchData()
    //Внешняя функция
    fGetDataFromApi()
      .catch(console.error);
    return () => { };
  }, [resp, data, asyncData]);


  return (

    <>
      <div>{!resp ? <div>Загрузка...</div> : resp.time.updated}</div>
      {!data ? <div>Загрузка...</div> : <DropDown label='Цвета'>{data.data.map((item) => item)}</DropDown>}
    </>
  )
}

export default App
