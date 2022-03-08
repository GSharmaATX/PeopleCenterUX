export interface PersonName {
  createdBy: string;
  createdDate: Date;
  lastModifiedBy?: any;
  lastModifiedDate?: any;
  version: number;
  id: number;
  beginDate: string;
  endDate?: any;
  firstName: string;
  lastName: string;
  middleName: string;
  statusCd: string;
}

export interface Person {
  createdBy: string;
  createdDate: Date;
  lastModifiedBy?: any;
  lastModifiedDate?: any;
  version: number;
  id: number;
  birthCity: string;
  birthCountryCd: string;
  birthStateCd: string;
  dob: string;
  ethnicity: string;
  eyeColorCd: string;
  fatherName: string;
  hairColorCd: string;
  motherName: string;
  statusCd: string;
  personConnections1: any[];
  personConnections2: any[];
  personNames: PersonName[];
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PersonNamesResponse {
  content: Person[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
