export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy', 
    Windy = 'windy',
  }

  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor', 
  }

  export enum Gender {
    Male = "male",
    Female =  "female",
    Other = "other",
  }

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }

  export interface Diagnosis {
    code: string;
    name: string;
    latin: string;
  }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
  }

  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    healthCheckRating: HealthCheckRating;
  }

  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    healthCheckRating: HealthCheckRating;
  }



  export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
  export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
  export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
  export type NewPatientEntry = Omit<PatientEntry, 'id'>;