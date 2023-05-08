type TownType = {
    "id": number
    "title": string
    "declension": string
    "hasMetro": boolean
    "genitive": string
};

type WorkType = {
    ["id"]: number
    ["title"]: string
};

type WorkPlaceType = {
    ["id"]: number
    ["title"]: string
};

type EducationType = {
    ["id"]: number
    ["title"]: string
};

type ExperienceType = {
    ["id"]: number
    ["title"]: string
};

type MaritalstatusType = {
    ["id"]: number
    ["title"]: string
};

type ChildrenType = {
    ["id"]: number
    ["title"]: string
};

type ClientType = {
    ["id"]: number
    ["title"]: string
    ["link"]: string
    ["industry"]: Array<any>
    ["description"]: string
    ["vacancy_count"]: number
    ["staff_count"]: string
    ["client_logo"]: string
    ["address"]: null | any
    ["addresses"]: Array<any>
    ["url"]: string
    ["short_reg"]: boolean
    ["is_blocked"]: boolean
    ["registered_date"]: number
    ["town"]: TownType
};

type AgencyType = {
    ["id"]: number
    ["title"]: string
};

type LanguagesType = any;

type PositionType = {
    "id": number
    "title": string
    "key": number
};

type CataloguesType = {
    ["id"]: number
    ["title"]: string
    ["key"]: number
    ["positions"]: Array<PositionType>
};

type MetroType = {
    ["id"]: number
    ["title"]: string
    ["id_metro_line"]: number
};

type GenderType = {
    ["id"]: number
    ["title"]: string
};

type CovidType = {
    ["id"]: number
    ["title"]: string
};

type PhoneType = {
    ["number"]: number
    ["additionalNumber"]: null | any
};

type ResponseInfoType = any;

export type VacancyType = {
    ["id"]: number
    ["profession"]: string
    ["id_client"]: number | null
    // ["id_user"]: number | null
    // ["code"]: string | null
    ["external_url"]: string | null
    // ["refresh_vac"]: boolean | null
    // ["extend_vac"]: boolean | null
    // ["resumesubscription_status"]: boolean | null
    // ["resumesubscription_keywords"]: string | null
    // ["resumesubscription_kwc"]: string | null
    // ["resumesubscription_rws"]: number | null
    ["date_pub_to"]: number
    ["date_archived"]: number
    ["date_published"]: number
    ["work"]: string | null
    ["compensation"]: string | null
    ["address"]: string | null
    ["candidat"]: string | null
    ["town"]: TownType
    ["type_of_work"]: WorkType
    ["place_of_work"]: WorkPlaceType
    ["education"]: EducationType
    ["agency"]: AgencyType
    ["experience"]: ExperienceType | null
    ["maritalstatus"]: MaritalstatusType | null
    ["children"]: ChildrenType | null
    ["languages"]: Array<LanguagesType> | null
    ["catalogues"]: Array<CataloguesType>
    ["is_archive"]: boolean
    ["is_storage"]: boolean
    ["contact"]: string | null
    // ["email"]: string | null
    // ["url"]: string | null
    ["phone"]: string | null
    ["fax"]: string | null
    ["already_sent_on_vacancy"]: boolean | null
    ["favorite"]: boolean | null
    ["driving_licence"]: Array<string> | null
    ["metro"]: Array<MetroType> | null
    ["agreement"]: boolean | null
    ["payment_from"]: number | null
    ["payment_to"]: number | null
    ["currency"]: string
    ["moveable"]: boolean | null
    ["gender"]: GenderType
    ["age_from"]: number | null
    ["age_to"]: number | null
    ["firm_name"]: string
    ["firm_activity"]: string
    ["client_logo"]: string | null
    ["link"]: string
    // ["views_count"]: number | null
    // ["resumes_all"]: number | null
    // ["resumes_new"]: number | null
    // ["moderation_order"]: string
    ["canEdit"]: boolean
    // ["extended_search_parameters"]: Array<>

    ["is_closed"]: boolean
    ["vacancyRichText"]: string
    ["covid_vaccination_requirement"]: CovidType
    ["anonymous"]: boolean
    ["client"]: ClientType
    ["rejected"]: boolean
    ["phones"]: Array<PhoneType>
    ["faxes"]: null
    ["isBlacklisted"]: boolean
    ["latitude"]: number
    ["longitude"]: number
    ["response_info"]: Array<ResponseInfoType> | null
    ["highlight"]: boolean
};

export type VacanciesResponseType = {
    ["total"]: number
    ["more"]: boolean
    ["subscription_id"]: number
    ["subscription_active"]: boolean
    ["objects"]: Array<VacancyType>
};

export type VacancyToListType = Pick<VacancyType, 'id' | 'profession' | 'firm_name' | 'payment_from' | 'payment_to' | 'currency'> & {
    townTitle: string
    cataloguesTitle: string
    workTypeTitle: string
};

export type VacancyDetailType = Pick<VacancyType, 'work' | 'candidat' | 'compensation'>;

export type VacancyWithDetailType = {
    vacancyToList: VacancyToListType
    detail: VacancyDetailType
};