import { GetPatient_patient_visits, GetVisit_visit_vitals } from "../graphql/schema";

export type Age = {
  years: number;
  months: number;
  days: number;
};

export function calculate_age(dob: Date): Age {
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const months = today.getMonth() - dob.getMonth();
  const days = today.getDate() - dob.getDate();

  return {
    years: age,
    months: months < 0 ? 12 + months : months,
    days: days < 0 ? 31 + days : days,
  };
}

export function patient_age(birth_date: Date): string {
  const age = calculate_age(birth_date);

  if (age.years >= 3) {
    // Toddler to adult
    return age.years + " years";
  } else if (age.years > 1 && age.years < 3) {
    // Child to adult
    return age.years + " years" + (age.months > 0 ? " " + age.months + " months" : "");
  } else if (age.years < 1 && age.months >= 1) {
    return age.months + (age.months === 1 ? " month" : " months");
    // Infant
  } else if (age.years < 1 && age.months < 1) {
    // Neonate
    return age.days + (age.days === 1 ? " day" : " days");
  } else {
    // New born
    return "New born";
  }
}

export function short_date(date_string: string): string {
  const date = new Date(date_string);

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
  });
}

export function long_date(date_string: string): string {
  const date = new Date(date_string);

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    weekday: "long",
  });
}

export function long_datetime(datetime_string: string): string {
  const date = new Date(datetime_string);

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function short_datetime(datetime_string: string): string {
  const date = new Date(datetime_string);

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const getCalendar = () => {
  const days: number[] = [];
  const months: number[] = [];
  const years: number[] = [];

  for (let i = 1; i < 32; i++) {
    days.push(i);
  }

  for (let i = 1; i < 13; i++) {
    months.push(i);
  }

  for (let i = new Date().getFullYear(); i > new Date().getFullYear() - 200; i--) {
    years.push(i);
  }

  return { days, months, years };
};

export const getValidDates = (day: number, year: string, month: string) => {
  const isLeapYear = new Date(Number(year), 1, 29).getDate() === 29;
  const maxFebDate = isLeapYear ? 29 : 28;

  if (month == "02" && day > maxFebDate) return false;
  if (["04", "06", "09", "11"].includes(month) && day > 30) return false;

  return true;
};

interface DateParts {
  year: string;
  month: string;
  day: string;
}

export const dateFromParts = ({ year, month, day }: DateParts) => {
  return `${year}-${month}-${day}`;
};

export const partsFromDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    day: day < 10 ? "0" + day : day.toString(),
    month: month < 10 ? "0" + month : month.toString(),
    year: year.toString(),
  };
};

export function sort_visits(rows: GetPatient_patient_visits[], order: "ASC" | "DESC") {
  if (order === "DESC") {
    return rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    return rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export function sort_vitals(rows: GetVisit_visit_vitals[], order: "ASC" | "DESC") {
  if (order === "DESC") {
    return rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    return rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
