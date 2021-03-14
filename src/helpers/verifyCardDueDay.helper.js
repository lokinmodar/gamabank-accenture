function verifyCardDueDay(day){
    if(day % 5 == 0 && day > 0 && day < 30 ){
        return true
    }else{
        return false
    }
}

const dueDay = 28
console.log (verifyCardDueDay(dueDay))