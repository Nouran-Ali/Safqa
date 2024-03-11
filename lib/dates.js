export const getTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
}

export const getDate = () => { // e.g. "2023-11-30"
    const date = new Date();
    return date.toISOString().slice(0, 10);
};

export const getTomorrowDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().slice(0, 10);
}

export const getDateAfterDays = (number) => {
    const today = new Date();
    const afterDays = new Date(today.getFullYear(), today.getMonth(), today.getDate() + number);
    const year = afterDays.getFullYear();
    const month = (afterDays.getMonth() + 1).toString().padStart(2, '0');
    const day = afterDays.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    return {
        date: dateStr,
        time: timeStr,
    };
};

export const getDateAfterMinutes = (number) => {
    const now = new Date();
    const afterHours = new Date(now.getTime() + (number * 60 * 1000));
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = afterHours.getHours().toString().padStart(2, '0');
    const minutes = afterHours.getMinutes().toString().padStart(2, '0');
    const seconds = afterHours.getSeconds().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = `${hours}:${minutes}`;
    return {
        date: dateStr,
        time: timeStr,
    };
};



export const getFullDateFromISO = (dateISOString) => {
    const date = new Date(dateISOString);
    return date.toLocaleString('default', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}


export const getFullDateInString = (IsoDate, lang) => {
    const date = new Date(IsoDate);
    return date.toLocaleString(lang == 'en' ? "en-US" : "ar-EG");
}