# react-shortz

## 개요

간단하게 사용할 수 있는 React에서 사용하는 단축키 훅.

## 설치방법

```
npm install react-shortz
```

## 사용법

```ts
export default function Counter() {
  const [count, setCount] = useState(0);

  useShortcut("shift+a", () => {
    setCounter(count + 1);
  });
}
```

테스트용 PR
