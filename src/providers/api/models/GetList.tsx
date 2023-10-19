export interface GetList{
                id: number,
            partnership_id: string,
            partner_data: {
                id: string,
                name: string,
                phone: string,
            },
            date: string,
            date_notime: string,
            time: number,
            from_number: string,
            from_extension: string,
            to_number: string,
            to_extension: string,
            is_skilla: number,
            status: string,
            record: string,
            line_number: string
            line_name: string,
            in_out: number,
            from_site: number,
            source: string,
            errors: [
                string
            ],
            disconnect_reason: string,
            results: [
                {
                    "type": string,
                    "title": string,
                    "tooltip": string,
                }
            ],
            stages: [],
            abuse: [],
            contact_name: string,
            contact_company: string,
            person_id: number,
            person_name: string,
            person_surname: string,
            person_avatar: string,
            candidate_id: number,
            candidate_name: string,
            candidate_link: string,
            candidate_vacancy_name: string


}