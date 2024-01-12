import { create } from "zustand";

const useStore = create((set) => ({
  // Your state and actions
  text: "",
  setText: (newText) => set((state) => ({ ...state, text: newText })),
  screenshots: null,
  setScreenshots: (newScreenshot) =>
    set((state) => ({ ...state, screenshots: newScreenshot })),

  thread: null,
  setThread: (newThread) => set((state) => ({ ...state, thread: newThread })),

  messages: [],
  setMessages: (newMessages) =>
    set((state) => ({ ...state, messages: newMessages })),

  isUrl: false,
  setIsUrl: (isUrl) => set((state) => ({ ...state, isUrl })),

  urls: [],
  setUrls: (urls) => set((state) => ({ ...state, urls })),

  screenshotDone: false,
  setScreenshotDone: (screenshotDone) =>
    set((state) => ({ ...state, screenshotDone })),

  extractingDone: true,
  setExtractingDone: (extractingDone) =>
    set((state) => ({ ...state, extractingDone })),

  isScreening: false,
  setIsScreening: (isScreening) => set((state) => ({ ...state, isScreening })),

  isExtracting: false,
  setIsExtracting: (isExtracting) =>
    set((state) => ({ ...state, isExtracting })),

  loadingText: "",
  setLoadingText: (loadingText) => {
    set((state) => {
      return { ...state, loadingText: loadingText };
    });
  },

  loading: false,
  setLoading: (loading) => set((state) => ({ ...state, loading })),

  error: "",
  setError: (error) => set((state) => ({ ...state, error })),

  ocrProgress: 0,
  setOcrProgress: (ocrProgress) => set((state) => ({ ...state, ocrProgress })),

  messagesList: [],
  setMessagesList: (newMessagesList) =>
    set((state) => {
      const updatedMessagesList =
        typeof newMessagesList === "function"
          ? newMessagesList(state.messagesList)
          : newMessagesList;
      return {
        ...state,
        messagesList: updatedMessagesList,
      };
    }),

  promptsGlobal: [],
  setPromptsGlobal: (newPrompts) =>
    set((state) => ({ ...state, promptsGlobal: newPrompts })),
}));

export default useStore;
