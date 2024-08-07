import { store } from "../../store/store"; // Update this path to your actual store path

const ResetWarscroll = () => {
  const useResetWarscroll = () => {
    const state = store.getState();
    const name = state.characteristics.warscrollName;
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = name + ".json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return useResetWarscroll;
};

export default ResetWarscroll;
