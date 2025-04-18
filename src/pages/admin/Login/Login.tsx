import { useState } from "react";
import s from "./Login.module.scss";
import { MailAdmin } from "../../../components/svgs/adminSvgs";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={s.login}>
      <div className={s.content}>
        <h2>Авторизация</h2>
        <div className={s.inputs}>
          <div className={s.inputDiv}>
            <label>Логин</label>
            <input />
          </div>
          <div className={s.inputDiv}>
            <label>Пароль</label>
            <input />
          </div>
        </div>
        <div className={s.buttons}>
            <button>Войти</button>
            <div className={s.icon}><MailAdmin /></div>
        </div>
      </div>
    </div>
  );
};
