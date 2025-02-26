import { IOption } from "../../../interface/general.interface";
import { ICardItem } from "../interfaces/card";

export const borrowerStatus: IOption[] = [
    { value: 'ACT', label: 'Active' },
    { value: 'BRT', label: 'Bankrupt' },
  ]

 export const listCardItem: ICardItem[] = [
   {
     title: 'Total Outstanding',
     value: '50,000',
     color: '#9B87F5'
   },
   {
     title: 'Total Overdue',
     value: '50,000',
     color: '#F03C50'
   },
   {
     title: 'Days Past Due',
     value: '15 days',
     color : '#F97C28'
   }
 ] 

 export const ethnicGroups: IOption[] = [
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Kannada', label: 'Kannada' },
]

export const listGroups: IOption[] = [
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Kannada', label: 'Kannada' },
]

export enum idTypes {
  NRIC = 'NRIC',
}

export enum countries {
  SINGAPORE = 'SGP',
}

export const propertyOwnerships: IOption[] = [
  { value: 'NOTOWNPP', label: 'Does not own any property' },
  { value: 'OWNHDB1R', label: 'HDB 1-room' },
]

export const specialisations: IOption[] = [
  { value: 'AAF', label: 'Agriculture and Fishing' },
  { value: 'MAQ', label: 'Mining and Quarrying' },
]

export const typeOfResidentials: IOption[] = [
  { value: 'L', label: 'Landed' },
  { value: 'NL', label: 'Non-Landed' },
]

export const MESSAGE_BORROWER = {
  CREATED_SUCCESS: "The borrower created successfully",
	CREATED_ERROR: "Unable to create new borrower’s details at this time. Please try again later.",
  CREATED_EXISTS: "A field with the ID No already exists. Please specify a unique ID No."
}