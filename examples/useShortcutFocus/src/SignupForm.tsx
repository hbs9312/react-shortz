import React, { useRef } from "react";
import { useShortcutFocus } from "../../../core/src/useShortcutFocus";
import { useShortcut } from "../../../core/src/useShortcut";
import "../style.css";
export default function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nameRef.current?.focus();
  };

  // ctrl+1 을 누르면 name input 에 포커스
  useShortcutFocus({
    keys: "ctrl+1",
    ref: nameRef,
  });

  // ctrl+2 를 누르면 email input 에 포커스
  useShortcutFocus({
    keys: "ctrl+2",
    ref: emailRef,
  });

  // ctrl+3 를 누르면 password input 에 포커스
  useShortcutFocus({
    keys: "ctrl+3",
    ref: passwordRef,
  });

  // ctrl+s 를 누르면 form 을 제출
  useShortcut({
    keys: "ctrl+s",
    callback: () => {
      formRef.current?.submit();
    },
  });

  return (
    <div id="container">
      <div>
        <p>
          press <b>ctrl+1</b> to focus on name input
        </p>
        <p>
          press <b>ctrl+2</b> to focus on email input
        </p>
        <p>
          press <b>ctrl+3</b> to focus on password input
        </p>
        <p>
          press <b>ctrl+s</b> to submit
        </p>
      </div>
      <form onSubmit={handleSubmit} ref={formRef} className="signup-form">
        <h2>Signup</h2>
        <div>
          <label htmlFor="name">Name :</label>
          <input type="text" name="name" ref={nameRef} />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref={passwordRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
