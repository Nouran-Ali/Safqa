import styles from "../../styles/Dashboard/Select.module.css";

const SelectThreeOptions = (props) => {
  return (
    <div className={styles.select}>
      <label className="form-label">{props.label}</label>
      <select defaultValue="" className="form-select border-0 shadow-none">
        <option value="">{props.option1}</option>
        <option value="1">{props.option2}</option>
        <option value="2">{props.option3}</option>
      </select>
    </div>
  )
}

export default SelectThreeOptions
