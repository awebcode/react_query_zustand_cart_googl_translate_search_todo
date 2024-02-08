"use client";
import Script from "next/script";
import { useEffect } from "react";

const TranslateComponent: React.FC = () => {
  useEffect(() => {
    const loadGoogleTranslate = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",

          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_element"
      );
    };

    if (typeof window !== "undefined" && !(window as any).google?.translate) {
      //   const script = document.createElement("script");
      // //   script.src =
      // //     "https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
      //   script.async = true;
      //   script.defer = true;
      //   document.body.appendChild(script);

      (window as any).loadGoogleTranslate = loadGoogleTranslate;
    } else {
    //   loadGoogleTranslate();
    }
  }, []);

  return (
    <>
      <Script src="https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"></Script>

      <div id="google_element" className="mt-4 p-4  rounded-md"></div>
    </>
  );
};

export default TranslateComponent;
