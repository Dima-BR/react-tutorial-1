// import React from "react";
import { Button } from "@heroui/button";
import { useContext } from "react";
import { counterContext } from './../../contexts/counterContext';
 

export default function HomePage() {
  const {counter, setCounter} = useContext(counterContext);
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center py-10">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>

      <div className=" text-center">
          <h2 className="bg-orange-300 ">{counter}</h2>
          <button onClick={()=>setCounter(counter+1)}> Change Counter</button>
      </div>
    </>
  );
}
