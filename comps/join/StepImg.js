
import styles from "../../styles/join/Join.module.css";

export default function StepImg({ formStep}) {
    if(formStep === 0)
  return (
    <img
    className={styles.imageJoin}
    src="/join/fill-out-pana.png"
    alt="imageJoin"
    width="351px"
  />
  )
  if(formStep === 1)
  return (
    <img
    className={styles.imageJoin}
    src="/join/Wallet-pana.png"
    alt="imageJoin"
    width="351px"
  />
  )
  if(formStep === 2)
  return (
    <img
    className={styles.imageJoin}
    src="/join/LoginInformationImage.png"
    alt="imageJoin"
    width="351px"
  />
  )
  if(formStep === 3)
  return (
    <img
    className={styles.imageJoin}
    src="/join/sendOPT.png"
    alt="imageJoin"
    width="351px"
  />
  )
}
