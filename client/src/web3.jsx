import { useEffect, useState, createContext } from "react";
import {ethers} from 'ethers';
import {contractABI, contractAddress} from './constants';

export const Context = createContext();

const ethereum = window.ethereum;

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
}

export const ContextProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    const isWalletConnected = async() => {
        try {
            if(!ethereum) alert('No wallet found');
            const accounts = await ethereum.request({method: 'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                setIsConnected(true);
            }
            else{
                console.log('No accounts found');
            }
        } catch (err) {
            console.error(err);
            throw new Error('No ethereum Object');
        }
    }

    const connectWallet = async() => {
        try {
            if(!ethereum){
                return alert('No wallet found');
            }
            else{
                const accounts = await ethereum.request({method: 'eth_requestAccounts'});
                setCurrentAccount(accounts[0]);
                setIsConnected(true);
            }
        } catch (err) {
            console.error(err);
            throw new Error('No ethereum object');
        }
    }

    const sendTransaction = async(amount) => {
        try {
            if(!ethereum) console.log('No ethereum Object');
            setLoading(true);
            const transactionContract = getEthereumContract();
            const parsedEtherAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: '0x89845AFbB725E97b490c4b0948A61535F6a56ceA',
                    gas: '0x5208',
                    value: parsedEtherAmount._hex
                }]
            });
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            throw new Error('No ethereum Object');
        }
    }


    return(
        <Context.Provider value={{
            sendTransaction, 
            connectWallet,
            isWalletConnected,
            isConnected,
            currentAccount,
            success, setSuccess,
            loading, setLoading
        }}>
            {children}
        </Context.Provider>
    )
}