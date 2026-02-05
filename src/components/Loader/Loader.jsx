
import { BeatLoader } from "react-spinners";
import styles from "./Loader.module.css";
import clsx from "clsx";

const Loader = ({ fullScreen = false, size = 15, color = "#4A56E2" }) => {
  return (
    <div
      className={clsx(styles.loaderContainer, {
        [styles.fullScreen]: fullScreen,
      })}
    >
      <BeatLoader color={color} size={size} />
    </div>
  );
};

export default Loader;