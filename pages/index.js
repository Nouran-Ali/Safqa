import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import OurServices from "../comps/OurServices"
import Main from "../comps/Main"
import HomeAbout from "../comps/HomeAbout"
import OurFeatures from "../comps/OurFeatures"
import OurAPP from "../comps/OurAPP"
import HomeContact from "../comps/HomeContact"
import GetStarted from "../comps/GetStarted"
import { i18n } from '../comps/i18n';
import { useState } from 'react'
import { useEffect } from "react";
// import WebSocket from 'ws';

export default function Home() {
  // const [test, setTest] = useState("");

  // useEffect(() => {
  //   const ws = new WebSocket('ws://api.safqapay.com/api/notfcation/realtime');

  //   ws.on('open', () => {
  //     console.log('Connected to WebSocket server');
  //   });

  //   ws.on('message', (message) => {
  //     console.log(`Received message: ${message}`);
  //   });

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   const socket = new WebSocket('ws://api.safqapay.com/api/notfcation/realtime');

  //   socket.addEventListener('open', (event) => {
  //     console.log('WebSocket connected');
  //   });

  //   socket.addEventListener('message', (event) => {
  //     console.log('WebSocket message received:', event.data);
  //   });

  //   socket.addEventListener('close', (event) => {
  //     console.log('WebSocket disconnected:', event.code, event.reason);
  //   });

  //   // return () => {
  //   //   socket.close();
  //   // };
  // }, []);


  return (
    <>
      {/* <input className="text-center mx-auto" type="text" placeholder="test" value={test} onChange={(e)=> setTest(e.target.value)}  /> */}
      {/* main */}
      <Main />

      {/* About safqa */}
      <HomeAbout />

      {/* our services */}
      <OurServices />

      {/* our features */}
      <OurFeatures />

      {/* our APP */}
      <OurAPP margin />

      {/* HomeContact */}
      {/* <HomeContact /> */}

      {/* GetStarted */}
      <GetStarted />

    </>
  );
}

