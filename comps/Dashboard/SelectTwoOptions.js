import styles from "../../styles/Dashboard/Select.module.css";

const SelectTwoOptions = (props) => {
  return (
    <div className={styles.select}>
      <label className="form-label">{props.label}</label>
      <select className="form-select border-0 shadow-none">
        <option selected>{props.option1}</option>
        <option value="1">{props.option2}</option>
      </select>
    </div>
  )
}

export default SelectTwoOptions
