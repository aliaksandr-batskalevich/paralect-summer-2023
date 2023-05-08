import {VacancyDetailType, VacancyToListType, VacancyType} from "../models/vacancies";

export const vacancyToListMaker = (fullVacancy: VacancyType): VacancyToListType => ({
    id: fullVacancy.id,
    profession: fullVacancy.profession,
    firm_name: fullVacancy.firm_name,
    townTitle: fullVacancy.town.title,
    cataloguesTitle: fullVacancy.catalogues[0].title,
    workTypeTitle: fullVacancy.type_of_work.title,
    payment_from: fullVacancy.payment_from,
    payment_to: fullVacancy.payment_to,
    currency: fullVacancy.currency,
});

export const detailVacancyMaker = (fullVacancy: VacancyType): VacancyDetailType => ({
    work: fullVacancy.work,
    candidat: fullVacancy.candidat,
    compensation: fullVacancy.compensation,
});