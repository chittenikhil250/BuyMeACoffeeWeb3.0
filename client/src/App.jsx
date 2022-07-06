import React from 'react'
import { useState, useEffect } from 'react'
import {db} from './firebase'
import {set, ref, push} from 'firebase/database'
import axios from 'axios'
import { Context } from './web3'
import { useContext } from 'react'


const App = () => {


  const {sendTransaction, success, loading, setLoading, setSuccess, isConnected, connectWallet, currentAccount} = useContext(Context);

  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [tippers, setTippers] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(()=> {
    setAmount(''+quantity*0.005);
  } ,[quantity]);


  useEffect(
      () => {
        let timer1 = setTimeout(() => setSuccess(false), 4000);
        return () => {
          clearTimeout(timer1);
        };
      }, [success]
  )
  

  useEffect(() => {
    const fetchData = async() =>{
      const blankArray = [];
      const res = await axios.get(import.meta.env.VITE_apiUrl);
      Object.keys(res.data).map(key => {
        blankArray.push(res.data[key])
      })
      setTippers(blankArray.reverse());
    }
    fetchData();
  }, [success]);
  

  const changeQuantity = (e) =>{
    setQuantity(e.target.value);
  }

  const setCustomQuantity = (e) => {
    setQuantity(e.target.value);
  }

  const handleChange = (e) =>{
    if(e.target.name == 'name'){
      setName(e.target.value);
    }
    else if(e.target.name == 'message'){
      setMessage(e.target.value);
    }
  }

  const buyCoffe = async(e) =>{
    e.preventDefault();
    setLoading(true);
    await sendTransaction(amount);
    const tipData = {name, message, quantity};
    const reference = ref(db, 'tippers/');
    const pushReference = push(reference);
    setName('');
    setMessage('');
    set(pushReference, tipData);
    setLoading(false);
  }

  function keygen(){
    return Math.random()*1000;
  }

  return (
    <>
      <div className="container">
        <center>
          <img 
          src='https://pbs.twimg.com/profile_images/1541853796393193472/TyN3H1zQ_400x400.jpg' 
          // src='https://img.buymeacoffee.com/api/?name=Nikhil&size=900&bg-image=bmc&background=FF813F' 
          alt="Nikhil Chitte" width={220} className='mt-5 pt-3 rounded-circle' />
        <h2 className="cr-bold mt-2 mb-3">@chitte_nikhil</h2>
        <span className="supporter"> {tippers.length} supporters </span>
        </center>
      <div className="row mt-4">
        <div className="col-lg-7 order-2 order-lg-1">
          <div className="intro">
          Hey peeps 👋. You can now buy me a free coffee!! <br />
          Send Goerli ETH for Testing. 
          </div>
          <h4 className="text-secondary cr-bold">
            <center className='mt-5'>
            RECENT SUPPORTERS
            </center>
          </h4>
          <div className="supporters">
            {
                tippers.map(i => {
                  return(
                    <div key={keygen()}>
                    <div className="support-0 m-3">
                      <img src="https://img.buymeacoffee.com/api/?name=Nikhil&size=900&bg-image=bmc&background=FF813F" width={50} alt="" />
                      <span className="donater bolder cr-bold">
                      &nbsp; {i.name}
                      </span> brought {i.quantity} coffees.
                      <p className='mt-2'>{i.message}</p>
                    </div>
                    </div>
                  )
                })
            }
            <center>
            <button className="btn disabled btn-submit mt-3 rounded inline">
              AND MORE..... 
            </button>
            </center>
          </div>
        </div>
        <div className="col-lg-5 order-1 order-lg-2">
          <center>
            <form onSubmit={buyCoffe}>
            <div className="coffe-form">
              <h3 className="cr-bold mt-2">Buy <span className='text-secondary'>Nikhil</span> A Coffee </h3>
              <div className="coffe-div">
                <h1>☕ <span className='text-secondary x'>x</span></h1>
                <input  className="rounded-circle inp-btn btn btn-coffe" onClick={changeQuantity} value={1} readOnly></input>
                <input className="rounded-circle inp-btn btn btn-coffe" onClick={changeQuantity} value={3} readOnly></input>
                <input className="rounded-circle inp-btn btn btn-coffe" onClick={changeQuantity} value={5} readOnly></input>
                <input type="number" className='coffe-input' value={quantity} onChange={setCustomQuantity}/>
              </div>
              <textarea name="name" id="" cols="30" value={name} rows="1" placeholder='Name or @yourtwitter' required onChange={handleChange} className='name mt-3'></textarea>
              <textarea name="message" id="" value={message} cols="30" rows="5" placeholder='Say something Nice... (optional)' onChange={handleChange} className=' textarea mt-3'></textarea>
              
              <button className='btn mt-3 btn-submit' disabled={ isConnected ? quantity ? false : true : false }
               type={isConnected ? 'submit' : 'button'} onClick={connectWallet}>
              {
                isConnected ? 
                loading ? 'Initiating transaction...' : 'Support '+(0.005*quantity)+' ETH'
                : 'Connect Wallet'
              } 
              </button>
              <span className={success ? 'text-danger' : 'dnon'} >Transaction succesful</span>
            </div>
            </form>
          </center>
        </div>
      </div>

      <footer className='mt-5 pt-5'>
        <center>
         <span className='bolder cr-bold'> Developed by</span>
         <h3 className='mt-1 cursive'>Nikhil Chitte</h3>
        </center>
      </footer>

      </div>
    </>
  )
}

export default App