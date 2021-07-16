import React, {useEffect} from "react";
import InputForm from "./components/InputForm";

const Index = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-6xl font-bold font-display pb-8">
        Url Shortener
      </div>
      <InputForm/>
    </div>
  )
}

export default Index