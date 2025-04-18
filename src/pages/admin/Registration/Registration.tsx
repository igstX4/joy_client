import { useState } from "react";
import s from "./Registration.module.scss";
import { AdminUndo, MailAdmin } from "../../../components/svgs/adminSvgs";

export const Registration = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={s.login}>
      <div className={s.content}>
        <h2>Регистрация</h2>
        <div className={s.inputs}>
          <div className={s.inputDiv}>
            <label>Введите почту</label>
            <input />
          </div>
        </div>
        <div className={s.buttons}>
            <button>Войти</button>
            <div className={s.icon}><AdminUndo /></div>
        </div>
      </div>
    </div>
  );
};
