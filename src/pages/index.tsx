import React, {useEffect} from "react";
import { InputForm } from "@components";

const Index = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mid-complex-gradient">
      <h1 className="text-6xl font-700 font-display pb-8 mb-6">Url Shortener</h1>
      <InputForm/>
    </div>
  )
}

export default Index