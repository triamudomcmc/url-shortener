import React, { useState } from "react";

const InputForm = () => {
  const [url, setUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [bgclass, setBg] = useState("bg-gray-400 cursor-not-allowed");

  const checkvalue = (value: string) => {
    if (
      value.includes("tucm.cc") ||
      !(value.includes("http://") || value.includes("https://"))
    ) {
      setDisabled(true);
      setBg("bg-gray-400 cursor-not-allowed");
    } else {
      setDisabled(false);
      setBg("bg-pink-400 hover:bg-pink-700");
    }
  };

  const handleSubmit = async () => {
    const body = {
      inputUrl: url,
    };

    // @ts-ignore
    window.gtag("event", "shorten_link", {
      event_category: "shorten_link",
      //   event_label: url,
      link: url,
    });

    try {
      const res = await fetch(`/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const jsonResult = await res.json();
      if (jsonResult.status === "success") {
        setUrl(jsonResult.shortURL);
        setDisabled(true);
        setBg("bg-gray-400 cursor-not-allowed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <label className="">
        <input
          className="block glass-input text-lg pl-4 pr-36 focus:outline-none rounded-md shadow-sm w-full h-16 focus:ring-pink-500 focus:border-pink-500"
          type="text"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
            checkvalue(event.target.value);
          }}
          placeholder="https://example.com"
        />
      </label>
      <div className="absolute inset-y-0 right-5 flex items-center">
        <button
          className={`${bgclass} inline-flex items-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
          type="submit"
          onClick={handleSubmit}
          disabled={disabled}
          title={disabled ? "Enter a link first" : "Shrink!"}
        >
          Shrink
        </button>
      </div>
    </div>
  );
};

export default InputForm;
