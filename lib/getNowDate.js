const getNowDate = () => {
    const date = new Date()
    const yy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const nowDate = `${mm}_${dd}_${yy}`;
    return nowDate;
}

export default getNowDate; 