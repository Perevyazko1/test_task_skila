import axios from "axios";

export default class MainAPI {

        static async get_data(source:string, param=null) {
        let axios_headers = {}
        let axios_url = `https://api.skilla.ru/mango/${source}`
        if (param) {
            axios_url += `${param}`
        }
             axios_headers = {
                headers: {
                    'Authorization': "Bearer testtoken",
                    "Content-type" : "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
                    "Content-Transfer-Encoding":"binary",
                    "Content-Disposition": "filename='record.mp3'"

                }
            }
        try {
            const
                response = await axios.post(axios_url,{},
                    {
                        ...axios_headers
                    }
                )
            return response.data
        } catch
            (e) {
            console.log(e)
        }


    }
        static async post_data( source:string, data:object) {
        let axios_headers = {}
        let axios_url = `http://127.0.0.1:8000/${source}`
        if (localStorage.getItem('token') !== '') {
             axios_headers = {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }
        }
        try {
            const
                response = await axios.post(axios_url, data,
                    {
                        ...axios_headers
                    }
                )
            return response.data
        } catch
            (e) {
            console.log(e)
        }


    }


}