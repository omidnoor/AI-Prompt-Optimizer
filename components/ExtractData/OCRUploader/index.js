import { memo, useEffect } from "react";
import { processImage } from "./processImage ";
import useStore from "store/store";

const OCRUploader = () => {
  const {
    setText,
    text,
    setLoadingText,
    setError,
    setLoading,
    screenshots,
    setIsExtracting,
    isScreening,
    setOcrProgress,
  } = useStore();
  useEffect(() => {
    if (!isScreening) {
      const handleExtractText = async () => {
        try {
          setLoading(true);
          setIsExtracting(true);
          setLoadingText("Extracting text...");
          if (screenshots) {
            // setOcrProgress(0);
            const extractedText = await processImage(
              screenshots,
              (progress) => {
                setOcrProgress(progress);
              }
            );
            setText(extractedText);
          }
          setIsExtracting(false);
          setError("");
        } catch (error) {
          setError(error.message);
          console.log(`error: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      handleExtractText();
      // setOcrProgress(0);
    }
  }, [isScreening]);

  return null;
};

export default memo(OCRUploader);
