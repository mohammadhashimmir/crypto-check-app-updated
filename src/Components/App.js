import React ,{useState ,useEffect} from "react";
import axios from "axios";
import "./App.css"; 

const App=()=>{
    const [list, setList]=useState([]);
    const [text, setText]=useState("");

useEffect(()=>{
    const first=async()=>{
       const res= await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
       setList(res.data); 
    };
first();
},[]);
const onInputChange=(e)=>{
    setText(e.target.value);
};
const searchedList=list.filter( search=>
    search.name.toLowerCase().includes(text.toLowerCase())
);

const renderedList=searchedList.map((coin)=>{
    return (
        <tr key={coin.id}>
        <td><img className="listPic" src={coin.image} alt=""/></td>
        <td>{coin.name}</td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>{coin.market_cap_rank}</td>
        <td><b>$</b>{coin.current_price.toLocaleString()}</td>
        <td><b>$</b>{coin.total_volume.toLocaleString()}</td>
        <td>{coin.price_change_percentage_24h}<b>%</b></td>
        <td><b>$</b>{coin.market_cap.toLocaleString()}</td>
      </tr>
    );
});

    return (
        <div>
        <div className="nav"><h1><img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt=""/> Crypto check</h1></div>
        <div className="ui form">
        <div className="ui input focus" style={{marginLeft:"40px"}}>
  <input type="text" value={text} placeholder="Search Coin" onChange={onInputChange}/>
</div>
</div>
<table className="ui celled striped unstackable table">
    <thead>
    <tr>
        <th></th>
        <th>Name</th>
        <th>Symbol</th>
        <th>Rank</th>
        <th>Current Price</th>
        <th>24h Volume</th>
        <th>Price Change(24hrs)</th>
        <th>Market Cap</th>
    </tr>
    </thead>
    <tbody>
   {renderedList}
    </tbody>
</table>
        </div>
       

    )
};

export default App;