export function PhoneFormat(number:string) {
    number = number.replace(/\D/g, "");

    if (number.length === 10) {

        return number.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

    } else if (number.length === 11) {
        return number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2$3-$4");

    } else {
        return number;
    }
}