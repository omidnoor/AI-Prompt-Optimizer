//
import { useCallback } from "react";
import useStore from "store/store";
import { extractURLs } from "util/upwork/extractURLs";

const useScreenshot = () => {
  const {
    setIsScreening,
    setIsUrl,
    setUrls,
    setLoadingText,
    setError,
    setLoading,
    setScreenshots,
  } = useStore();

  const fetchScreenshot = useCallback(async (urls) => {
    try {
      if (urls) {
        setIsUrl(true);
        setLoading(true);
        setIsScreening(true);
        setLoadingText("Fetching screenshot...");
        const urlsArray = extractURLs(urls);
        const response = await fetch("/api/screenshot/screenshotHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urlsArray }),
        });

        const data = await response.json();
        setScreenshots(data.screenshots);
        setIsScreening(false);
      }
    } catch (error) {
      setError(error.message);
      console.error(`error: ${error.message}`);
    } finally {
      setLoading(false);
      // setUrls("");
    }
  }, []);

  return { fetchScreenshot };
};
export default useScreenshot;
