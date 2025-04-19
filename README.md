# react-shortcutz

## 개요

간단하게 사용할 수 있는 React에서 사용하는 단축키 훅.

## 설치방법

```
npm install react-shortcutz
```

## 사용법

#### `useShortcut`: 단축키와 함께 실행할 콜백함수 지정

```ts
export default function Counter() {
  const [count, setCount] = useState(0);

  useShortcut("shift+a", () => {
    setCounter(count + 1);
  });
}
```

#### `useShortcutFocus` : 단축키와 함께 ref를 전달하여 쉬운 focus 이동

```jsx
export SignupForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <form>
        <div>
          <label htmlFor="name">Name :</label>
          <input type="text" name="name" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Email :</label>
          <input type="password" name="password" ref={passwordRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
}
```
