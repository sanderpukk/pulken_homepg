import { parseISO, getDay, getMonth } from "date-fns";



const dayOfWeekName = ["Pühapäev", "Esmaspäev.", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
const month = ["jaan.", "veebr.", "märts", "aprill", "mai", "jun.", "jul.", "aug.", "sept.", "okt.", "nov.", "dets."]
const monthFull = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"]

export const parseDateToDay = (dateInput:string, full:boolean) => {
    const date = parseISO(dateInput);
    const dayOfWeekNumber = getDay(date);
    const numberOfMonth = getMonth(date);
    const dateDayNr = parseFloat(dateInput.split('-')[2]);

    if(full){
        return dayOfWeekName[dayOfWeekNumber] + ", " + dateDayNr+'. '+monthFull[numberOfMonth];
    }else{
        return dateDayNr+'. '+month[numberOfMonth];
    }

}
