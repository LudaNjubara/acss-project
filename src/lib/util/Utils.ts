// utils/formatDate.ts
const formatDate = (date: Date, locale: string = 'hr-HR'): string => {
    return new Intl.DateTimeFormat(locale).format(date);
}

export { formatDate };

