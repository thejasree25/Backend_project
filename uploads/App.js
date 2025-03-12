import React , {useState,useEffect} from 'react' ;

export default function App(){
  let [data1,setdata1] = useState ([{}]);
  useEffect(()=>{
fetch("/student").then( response =>response.json()).then(
  p => {setdata1(p)}
)


  },[]);
  return (
    <>
    {(typeof data1.friends === 'undefined')?(
      <h1>Payal</h1>
    ):(
      data1.friends.map((pa,a)=>{
        <h1 key = {a}>{pa}</h1>
      })
    )}
  
    </>
  )
}