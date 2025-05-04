import { useState, useEffect } from "react";

export default function ArabicKeyboard() {
  const [text, setText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [showArabic, setShowArabic] = useState(true);

  // Define the mapping between English and Arabic characters
  const englishToArabic = {
    "1": "١", "2": "٢", "3": "٣", "4": "٤", "5": "٥",
    "6": "٦", "7": "٧", "8": "٨", "9": "٩", "0": "٠",
    "q": "ض", "w": "ص", "e": "ث", "r": "ق", "t": "ف",
    "y": "غ", "u": "ع", "i": "ه", "o": "خ", "p": "ح",
    "[": "ج", "]": "د", "\\": "\\",
    "a": "ش", "s": "س", "d": "ي", "f": "ب", "g": "ل",
    "h": "ا", "j": "ت", "k": "ن", "l": "م", ";": "ك",
    "'": "ط",
    "z": "ئ", "x": "ء", "c": "ؤ", "v": "ر", "b": "لا",
    "n": "ى", "m": "ة", ",": "و", ".": "ز", "/": "ظ",
    " ": " "
  };

  // Define diacritical marks (tashkeel)
  const diacriticalMarks = [
    { name: "Fatha", mark: "َ", key: "F" },      // Fat-ha (above)
    { name: "Damma", mark: "ُ", key: "D" },      // Dam-ma (above)
    { name: "Kasra", mark: "ِ", key: "K" },      // Kas-ra (below)
    { name: "Sukoon", mark: "ْ", key: "S" },     // Su-koon (above)
    { name: "Shadda", mark: "ّ", key: "H" },     // Shad-da (above)
    { name: "Tanween Fath", mark: "ً", key: "T" }, // Double fat-ha (above)
    { name: "Tanween Damm", mark: "ٌ", key: "G" }, // Double dam-ma (above)
    { name: "Tanween Kasr", mark: "ٍ", key: "J" }, // Double kas-ra (below)
    { name: "Maddah", mark: "آ", key: "M" }      // Mad-dah (above alif)
  ];

  // Define the keyboard layout rows
  const topRow = [
    { en: "1", ar: "١" },
    { en: "2", ar: "٢" },
    { en: "3", ar: "٣" },
    { en: "4", ar: "٤" },
    { en: "5", ar: "٥" },
    { en: "6", ar: "٦" },
    { en: "7", ar: "٧" },
    { en: "8", ar: "٨" },
    { en: "9", ar: "٩" },
    { en: "0", ar: "٠" },
    { en: "-", ar: "-" },
    { en: "=", ar: "=" },
    { en: "Back", ar: "Back" }
  ];

  const secondRow = [
    { en: "q", ar: "ض" },
    { en: "w", ar: "ص" },
    { en: "e", ar: "ث" },
    { en: "r", ar: "ق" },
    { en: "t", ar: "ف" },
    { en: "y", ar: "غ" },
    { en: "u", ar: "ع" },
    { en: "i", ar: "ه" },
    { en: "o", ar: "خ" },
    { en: "p", ar: "ح" },
    { en: "[", ar: "ج" },
    { en: "]", ar: "د" },
    { en: "\\", ar: "\\" }
  ];

  const thirdRow = [
    { en: "a", ar: "ش" },
    { en: "s", ar: "س" },
    { en: "d", ar: "ي" },
    { en: "f", ar: "ب" },
    { en: "g", ar: "ل" },
    { en: "h", ar: "ا" },
    { en: "j", ar: "ت" },
    { en: "k", ar: "ن" },
    { en: "l", ar: "م" },
    { en: ";", ar: "ك" },
    { en: "'", ar: "ط" }
  ];

  const fourthRow = [
    { en: "z", ar: "ئ" },
    { en: "x", ar: "ء" },
    { en: "c", ar: "ؤ" },
    { en: "v", ar: "ر" },
    { en: "b", ar: "لا" },
    { en: "n", ar: "ى" },
    { en: "m", ar: "ة" },
    { en: ",", ar: "و" },
    { en: ".", ar: "ز" },
    { en: "/", ar: "ظ" }
  ];

  // Handle keyboard clicks - add the English character but display Arabic
  const handleKeyClick = (enKey, arKey) => {
    if (enKey === "Back") {
      setText(text.slice(0, -1));
      setEnglishText(englishText.slice(0, -1));
    } else {
      setEnglishText(englishText + enKey);
      setText(text + arKey);
    }
  };

  // Handle diacritical mark click
  const handleMarkClick = (mark) => {
    setText(text + mark);
    setEnglishText(englishText + " ");  // Just add a space in English mode
  };

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore modifier keys and others we don't want to process
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      
      const key = e.key.toLowerCase();
      
      if (key === "backspace") {
        setText(text.slice(0, -1));
        setEnglishText(englishText.slice(0, -1));
        e.preventDefault();
      } else if (key === "enter") {
        setText(text + "\n");
        setEnglishText(englishText + "\n");
        e.preventDefault();
      } else if (englishToArabic[key] !== undefined) {
        setText(text + englishToArabic[key]);
        setEnglishText(englishText + key);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, englishText]);

  const handleClear = () => {
    setText("");
    setEnglishText("");
  };

  const handleSpace = () => {
    setText(text + " ");
    setEnglishText(englishText + " ");
  };

  const toggleDisplay = () => {
    setShowArabic(!showArabic);
  };

  // Print function
  const handlePrint = () => {
    const contentToPrint = showArabic ? text : englishText;
    const isArabic = showArabic;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Arabic Keyboard Text</title>
          <meta charset="UTF-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap');
            body {
              font-family: ${isArabic ? "'Noto Sans Arabic', sans-serif" : "Arial, sans-serif"};
              direction: ${isArabic ? "rtl" : "ltr"};
              padding: 40px;
              font-size: 18px;
              line-height: 1.8;
            }
          </style>
        </head>
        <body>
          <div>${contentToPrint.replace(/\n/g, '<br>')}</div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 p-6 rounded-lg w-full max-w-4xl mx-auto shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-800 mb-4">لوحة المفاتيح العربية | Arabic Keyboard</h1>
      
      {/* Output Display */}
      <div className="w-full mb-6 flex flex-col">
        <div 
          className="h-32 bg-white border-2 border-slate-300 rounded-lg p-4 text-right text-2xl overflow-auto shadow-inner"
          dir={showArabic ? "rtl" : "ltr"} 
          lang={showArabic ? "ar" : "en"}
          style={{ fontFamily: showArabic ? "'Noto Sans Arabic', sans-serif" : "inherit", lineHeight: "1.8" }}
        >
          {showArabic ? text : englishText}
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-2">
            <button 
              className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors text-sm font-medium shadow"
              onClick={handleClear}
            >
              Clear All
            </button>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-medium shadow"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
          <button 
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors text-sm font-medium shadow"
            onClick={toggleDisplay}
          >
            {showArabic ? "Show English" : "Show Arabic"}
          </button>
        </div>
      </div>
      
      {/* Keyboard Container */}
      <div className="bg-slate-200 p-5 rounded-lg w-full shadow-md border border-slate-300">
        {/* Display mode indicator */}
        <div className="text-center mb-3 text-slate-700 bg-slate-300 p-2 rounded-md">
          <p className="font-medium">Type in English, see in Arabic. Click keys or use your keyboard.</p>
        </div>

        {/* Diacritical Marks Row */}
        <div className="mb-4">
          <h3 className="text-slate-700 font-semibold mb-2 text-center">Diacritical Marks (تشكيل)</h3>
          <div className="flex flex-wrap justify-center mb-2 bg-slate-300 p-2 rounded-md">
            {diacriticalMarks.map((item, index) => (
              <button
                key={index}
                className="bg-amber-100 w-12 h-12 m-1 rounded-md border border-amber-400 flex flex-col items-center justify-center shadow hover:bg-amber-200 transition-colors"
                onClick={() => handleMarkClick(item.mark)}
                title={item.name}
              >
                <span className="text-amber-800 text-xl font-bold" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                  {item.mark}
                </span>
                <span className="text-amber-600 text-xs font-medium">
                  {item.key}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Top Row */}
        <div className="flex mb-2 justify-center">
          {topRow.map((key, index) => (
            <button
              key={index}
              className={`${
                key.en === "Back" ? "bg-red-400 hover:bg-red-500 w-16" : "bg-white hover:bg-slate-50 w-12"
              } h-12 m-0.5 rounded-md border border-slate-400 flex items-center justify-center shadow transition-colors relative`}
              onClick={() => handleKeyClick(key.en, key.en === "Back" ? "Back" : key.ar)}
            >
              <span className="text-red-600 text-lg font-bold" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                {key.ar !== "Back" ? key.ar : ""}
              </span>
              <span className="text-slate-700 text-xs absolute top-1 left-1 font-medium">
                {key.en !== "Back" ? key.en : "Back"}
              </span>
            </button>
          ))}
        </div>

        {/* Second Row */}
        <div className="flex mb-2 justify-center">
          {secondRow.map((key, index) => (
            <button
              key={index}
              className="bg-white w-12 h-12 m-0.5 rounded-md border border-slate-400 flex items-center justify-center shadow hover:bg-slate-50 transition-colors relative"
              onClick={() => handleKeyClick(key.en, key.ar)}
            >
              <span className="text-red-600 text-lg font-bold" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                {key.ar}
              </span>
              <span className="text-slate-700 text-xs absolute top-1 left-1 font-medium">
                {key.en}
              </span>
            </button>
          ))}
        </div>

        {/* Third Row */}
        <div className="flex mb-2 justify-center">
          {thirdRow.map((key, index) => (
            <button
              key={index}
              className="bg-white w-12 h-12 m-0.5 rounded-md border border-slate-400 flex items-center justify-center shadow hover:bg-slate-50 transition-colors relative"
              onClick={() => handleKeyClick(key.en, key.ar)}
            >
              <span className="text-red-600 text-lg font-bold" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                {key.ar}
              </span>
              <span className="text-slate-700 text-xs absolute top-1 left-1 font-medium">
                {key.en}
              </span>
            </button>
          ))}
          <button
            className="bg-blue-400 w-16 h-12 m-0.5 rounded-md border border-slate-400 flex items-center justify-center shadow hover:bg-blue-500 transition-colors"
            onClick={() => handleKeyClick("Enter", "\n")}
          >
            <span className="text-slate-800 font-medium">Enter</span>
          </button>
        </div>

        {/* Fourth Row */}
        <div className="flex mb-2 justify-center">
          {fourthRow.map((key, index) => (
            <button
              key={index}
              className="bg-white w-12 h-12 m-0.5 rounded-md border border-slate-400 flex items-center justify-center shadow hover:bg-slate-50 transition-colors relative"
              onClick={() => handleKeyClick(key.en, key.ar)}
            >
              <span className="text-red-600 text-lg font-bold" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                {key.ar}
              </span>
              <span className="text-slate-700 text-xs absolute top-1 left-1 font-medium">
                {key.en}
              </span>
            </button>
          ))}
        </div>

        {/* Space Bar Row */}
        <div className="flex justify-center">
          <button
            className="bg-white w-64 h-12 m-0.5 rounded-md border border-slate-400 flex items-center justify-center shadow hover:bg-slate-50 transition-colors"
            onClick={handleSpace}
          >
            <span className="text-slate-800 font-medium">Space</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-sm text-slate-600 p-2 bg-slate-100 rounded">
          <h3 className="font-semibold mb-1">How to use diacritical marks:</h3>
          <p>1. Type an Arabic letter first</p>
          <p>2. Click on a diacritical mark to add it to the letter</p>
          <p>3. The marks will appear above or below the preceding letter</p>
        </div>
      </div>
    </div>
  );
}