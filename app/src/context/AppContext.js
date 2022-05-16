import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // USE STATE
  const [userInput, setUserInput] = useState("");
  const [engineSelect, setEngineSelect] = useState("text-curie-001");
  const [emptyInputWarning, setEmptyInputWarning] = useState(false);
  const [aiResponses, setAiResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // BLANK TEXTFIELD MESSAGE
  const warningMessage = `Please ask me something before hitting "Submit" !`;

  // ENGINES
  const engineOptions = [
    "text-davinci-002",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
  ];

  ///////////////////////  HANDLERS  //////////////////////
  // INPUT HANDLERS
  const handleSelectChange = (e) => {
    return setEngineSelect(e.target.value);
  };

  const handleTextFieldChange = (e) => {
    if (emptyInputWarning === true && e.target.value !== warningMessage)
      setEmptyInputWarning(false);
    return setUserInput(e.target.value);
  };

  //  SUBMIT INPUT TO BACK END
  const submitInputToBE = async () => {
    // CHECK IF INPUT IS EMPTY -- BREAK OUT OF SUBMIT IF TRUE
    if (userInput === "" && userInput !== warningMessage)
      return setEmptyInputWarning(true);

    // SET ISLOADING TO TRUE TO MAKE SPINNER APPEAR
    setIsLoading(true);

    // PREPARE POST REQUEST BODY
    const bodyData = {
      prompt: userInput,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    /////// /////// /////// /////// /////// /////// /////// /////// ///////
    /////// /////// /////// /////// TRY /////// /////// /////// ///////
    // USE BODY TO FETCH RESPONSE FROM THE API AND PUSH DISPLAY INFO TO STATE
    try {
      // FETCH RESPONSE FROM BACK END
      const res = await fetch(
        `https://api.openai.com/v1/engines/${engineSelect}/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sdfsdf ${process.env.REACT_APP_OPENAI_SECRET}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      // CONVERT DATA TO JS OJBECT
      const data = await res.json();

      // GET TIME STRING
      const responseTime = new Date(data.created * 1000).toLocaleString(
        "en-US",
        {
          weekday: "short",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }
      );

      // CLEAN UP AI RESPONSE (REMOVE TRAILING AND LEADING /Ns, REMOVE LEADING QUESTION MARKS)
      let cleanAiResponse = cleanUpAiResponse(data.choices[0].text);

      // SET RESPONSE OBJECT W/ INPUT AND TIME AT BEGINNING OF RESPONSE ARRAY, RESET CURRENT INPUT TO ""
      setAiResponses([
        {
          userInput,
          time: responseTime,
          aiResponse: cleanAiResponse,
        },
        ...aiResponses,
      ]);

      // SET LOADING TO FALSE TO STOP LOADER RENDER
      setIsLoading(false);

      // RETURN AND EMPTY INPUT BOX AND STATE
      return setUserInput("");
    } catch (e) {
      /////// /////// /////// /////// /////// /////// /////// /////// ///////
      /////// /////// /////// /////// CATCH /////// /////// /////// ///////
      // ADD A ERROR RESPONSE MESSAGE FOR DISPLAY
      setAiResponses([
        {
          userInput: "Error",
          time: "XXX, XXX XX, XXXX, X:XX:XX XX",
          aiResponse: "Something went wrong! Please try again later.",
        },
        ...aiResponses,
      ]);
      setIsLoading(false);
      return setUserInput("");
    }
  };

  // SOME RESPONSES HAVE LEADING "?", REMOVE, AND TRIM OFF EMPTY SPACE AT START AND END
  const cleanUpAiResponse = (responseString) => {
    if (responseString.charAt(0) === "?")
      return cleanUpAiResponse(responseString.subString(1));
    return responseString.trim();
  };

  return (
    <AppContext.Provider
      value={{
        userInput,
        setUserInput,
        engineSelect,
        setEngineSelect,
        emptyInputWarning,
        setEmptyInputWarning,
        aiResponses,
        setAiResponses,
        warningMessage,
        engineOptions,
        handleSelectChange,
        handleTextFieldChange,
        submitInputToBE,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
