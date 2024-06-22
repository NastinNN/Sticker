import { CloseIcon } from "assets/icons/closeIcon";

import s from "../button.module.css";

type ButtonCleanProps = {
  state: any;
  setState: any;
};

export const ButtonClean = ({ state, setState }: ButtonCleanProps) => {
  return (
    <button
      className={s.clean}
      onClick={() => {
        setState('');
      }}
      disabled={!state}
    >
      <CloseIcon />
    </button>
  );
};
