import { supabase } from "../../config/superbase_pm_config";

class PmAuth {
    static register = async({email, password})=> {
        try {
            const {user,error} = await supabase.auth.signUp({
                email,password
            })
            if(error) throw Error(error)
            //return user

        } catch (er){
            throw Error(er)
        }
    }

    static login = async ({email,  password}) =>{
        try {
            const {user, error} = await supabase.auth.login({email, password})
            if(error){
                throw error
            }
            return user
        } catch (er){
            throw er
        }
    }
}


module.exports = PmAuth