import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    const [data,setData]=useState([]);
    const [pageStart,setPageStart]=useState(0);
    const [pageEnd,setPageEnd]=useState(50);

    let style="";

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await axios.get('https://api.coincap.io/v2/assets');
            setData(response.data.data)
        }
        fetchData();
    },[data]);

    const handlePagination=(e)=>{
        e.preventDefault();
        setPageEnd(pageEnd+50);
    }
 
    return (
        <>
              <table className="table">
                  <thead className="text-muted" style={{fontWeight:"bolder"}}>
                  <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Market Capital</th>
                      <th>Supply</th>
                      <th>Volume</th>
                      <th>Change(24hrs)</th>
                  </tr>
                  </thead>
                  {data.length!==0?data?.slice(pageStart,pageEnd)?.map((value)=>{
                      return (
                          <tbody style={{fontWeight:"bold"}}>
                          <tr>
                              <td>{value.rank}</td>
                              <td><img height="30px" src={`https://assets.coincap.io/assets/icons/${value.symbol.toLowerCase()}@2x.png`}/>    {value.name}</td>
                              <td>{Number(value.priceUsd).toFixed(2)}</td>
                              <td>{Number(value.marketCapUsd).toFixed(2)}</td>
                              <td>{Number(value.maxSupply).toFixed(2)}</td>
                              <td>{Number(value.volumeUsd24Hr).toFixed(2)}</td>
                              {Number(value.changePercent24Hr).toFixed(2)>0?<td className="text-success">{Number(value.changePercent24Hr).toFixed(2)}%</td>
                              :<td className="text-danger">{Number(value.changePercent24Hr).toFixed(2)}%</td>}
                          </tr>
                          </tbody>
                      )
                  }):<h3 className="text-center">Loading...(If data is not coming in 10 secs you can refresh the page)</h3>}
                  <button className="btn-primary" onClick={(e)=>handlePagination(e)}>Load More</button>
              </table>
       </>
    );
}

export default LandingPage;