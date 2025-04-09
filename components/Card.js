"use client"



import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const getWeatherData = async (text) => {
    try{
        const res = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${text}`);
        const response = await res.json();
        return response;
    }catch(error){
        throw new Error(error);
    }
}

const Card = ({text}) => {

    const [data, setData] = useState();



    useEffect(()=>{
        const fetchdata = async ()=>{
            const weather = await getWeatherData(text);
            setData(weather);
        }
        fetchdata();
    },[text])



    const dateChange = (e)=>{
        const formattedDate = new Date(e).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return formattedDate;
      }


      const hourChange = (e)=>{
        const formattedDate = new Date(e).toLocaleTimeString('en-GB', {
          hour: "2-digit",
          minute: "2-digit"
        });
        return formattedDate;
      }
    
console.log(data);
  
  return (
    <StyledWrapper>
      {text ? (<div className="card">
        <section className="info-section">
          <div className="background-design">
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
          <div className="left-side">
            <div className="weather">
              <div>
                  <img src={data?.current?.weather_icons} className="w-12"/>
              </div>
              <div>{data?.current?.weather_descriptions}</div>
            </div>
            <div className="temperature">{data?.current?.temperature}°</div>
            <div className="range">Feels like: {data?.current?.feelslike}°</div>
          </div>
          <div className="right-side">
            <div>
              <div className="hour">{hourChange(data?.location?.localtime)}</div>
              <div className="date">{dateChange(data?.location?.localtime)}</div>
            </div>
            <div className="city">{data?.location?.region}</div>
          </div>
        </section>
        
      </div>) : (<div className='font-medium border-2 rounded-xl bg-red-500'>Please enter a Place</div>)}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 180px;
    width: 280px;
    border-radius: 25px;
    background: lightgrey;
    overflow: hidden;
    transition: 100ms ease;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 4px;
  }

  /* ---------- Info section ---------- */

  .info-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 75%;
    color: white;
  }

  .left-side {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    z-index: 1;
    padding-left: 18px;
  }

  button {
    display: block;
    border: none;
    background: transparent;
  }

  .weather {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }

  .weather div {
    display: flex;
    align-items: center;
  }

  .weather div:nth-child(1) {
    width: 40%;
    height: auto;
  }

  .temperature {
    font-size: 34pt;
    font-weight: 500;
    line-height: 8%;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    height: 100%;
    padding-right: 18px;
    z-index: 1;
  }

  .right-side > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .hour {
    font-size: 19pt;
    line-height: 1em;
  }

  .date {
    font-size: 15px;
  }

  /* ---------- Background ---------- */
  .background-design {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #ec7263;
    overflow: hidden;
  }

  .circle {
    background-color: #efc745;
  }

  .circle:nth-child(1) {
    position: absolute;
    top: -80%;
    right: -50%;
    width: 300px;
    height: 300px;
    opacity: 0.4;
    border-radius: 50%;
  }

  .circle:nth-child(2) {
    position: absolute;
    top: -70%;
    right: -30%;
    width: 210px;
    height: 210px;
    opacity: 0.4;
    border-radius: 50%;
  }

  .circle:nth-child(3) {
    position: absolute;
    top: -35%;
    right: -8%;
    width: 100px;
    height: 100px;
    opacity: 1;
    border-radius: 50%;
  }
`

export default Card;
